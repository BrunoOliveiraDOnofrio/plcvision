const { response } = require("express");
const alertaModel = require("../models/alertaModel");

const dadosModel = require("../models/dadosModel");

const moment = require('moment');
moment.locale('pt-br');




const getUltimoAlerta = (req, res) => {
    const dataHora = req.body.data_hora
    const plcId = req.body.plc_id
    alertaModel.getUltimoAlerta(dataHora, plcId).then(response => {
        if(response.length == 0){
            res.status(200).json({
                message: "Não há alerta"
            })
        }else{
            res.status(200).json({
                message: "OK",
                alerta: response[0]
            })
        }
    }).catch(e => {
        res.status(500).json({
            error: "Erro ao buscar alerta",
            e: e
        })
    })
}

const store = (req,res) => {
    console.log(req.body)
    
    // verificar se existe um alerta nos ultimos 10 minutos com a mesma configuracao_id
    alertaModel.insertedInTheLastTenMinutes(req.body.config_plc_id).then(async response => {
        
        if(response[0].alertas > 0){
            res.status(200).json({
                error: "Alerta já criado"
            })
        }else{
            // dados_alerta

            const alertaInfo = {
                hardware: req.body.hardware || "Não especificado",
                tipoDado: req.body.tipo_dado || "Não especificado",
                unidadeDado: req.body.unidade_dado || "",
                valor: req.body.valor || 0,
                nivel: req.body.nivel || 1,
                fabrica_id: req.body.fabrica_id,
                plc_id: req.body.plc_id,
                config_plc_id: req.body.config_plc_id,
                dataHora: req.body.dataHora
            };

            if(req.body.dataCriacao){
                alertaInfo.dataCriacao = req.body.dataCriacao;
            }
            console.log(alertaInfo)
            
            // aqui voces vao chamar o jira, e o slack
            let {url, descricao} = await openJiraTaskSendSlackNotification(alertaInfo);
            req.body.link_chamado = url
            alertaInfo.link_chamado = url
            alertaInfo.descricao = descricao;
            
            alertaModel.create(alertaInfo).then(response => {
                console.log(response)
                res.status(200).json({
                    message: "Alerta Inserido",
                    out: response
                })
            }).catch(e => {
                res.status(500).json({
                    error: "Erro ao inserir alerta",
                    e: e
                })
            })
        }
    })
}

const openJiraTaskSendSlackNotification = async (alertaInfo) => {
    require("dotenv").config({path: '../../.env'});
            
    const email = "carvalhohugo425@gmail.com";
    const key = process.env.JIRA_KEY;
    const urlApiJira = 'https://carvalhohugo425.atlassian.net/rest/api/3/issue'
    
    // Título dinâmico com base nas informações do alerta
    const nivelAlerta = alertaInfo.nivel === 1 ? "Crítico" : "Atenção";
    const priority = alertaInfo.nivel === 1? "High" : "Medium"
    if(alertaInfo.hardware == undefined || alertaInfo.hardware == null || alertaInfo.hardware == '' || alertaInfo.valor == 0 || alertaInfo.valor == undefined || alertaInfo.valor == null){
      console.log("SAIA");
      
      return;
    }

    const resultado = await alertaModel.nomeFabrica(alertaInfo.fabrica_id);
    const nomeFabrica = resultado[0].nome
    const nomeEmpresa = resultado[0].razao_social

    const resultado2 = await alertaModel.nomeSetor(alertaInfo.plc_id);
    const nomeSetor = resultado2[0].nome

    const titulo = `Alerta ${nivelAlerta}: ${alertaInfo.hardware} ${alertaInfo.tipoDado} (${alertaInfo.valor}${alertaInfo.unidadeDado}) Nome da Fábrica: ${nomeFabrica}`;

    // Descrição com detalhes do alerta
    const descricao = `
    Foi detectado um alerta de ${nivelAlerta} para ${alertaInfo.hardware} ${alertaInfo.tipoDado}.
    
    Valor atual: ${alertaInfo.valor} ${alertaInfo.unidadeDado}

    Empresa: ${nomeEmpresa}
    
    Localização : Fábrica "${nomeFabrica}" | Setor "${nomeSetor}"

    PLC: ${alertaInfo.plc_id}

    Este alerta foi gerado automaticamente pelo sistema de monitoramento.
    `;
    
        const dataJira = {
      fields: {
        project: {
          key: "SPOP3"
        },
        customfield_10092: alertaInfo.dataCriacao, // Data de vencimento do alerta
        
        summary: titulo,
        description: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: descricao
                }
              ]
            }
          ]
        },
        issuetype: {
          name: "Task"
        },
        priority: {
        name: priority
      }
      }
    };
    
    let url;
    await fetch(`${urlApiJira}`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(`${email}:${key}`).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataJira)
    }).then(response => response.json().then(response => {
        console.log(response, "AQUI ESTA A RESPOSTA EM JSON");
        url = response.self;
    })
    .catch(e => {
        console.log(e);
    })).catch(e => {
        console.log(e);
    });
    // essa é a URL para abrir o card no jira, utilizeio o json que é a url para pegar a chave key
    url_alerta_jira = `https://carvalhohugo425.atlassian.net/jira/servicedesk/projects/SPOP3/boards/3?selectedIssue=${url}`

    const color = alertaInfo.nivel === 1 ? "#D00000" : "#FFA500"; // Vermelho para crítico, laranja para atenção
    
    const dataSlack = {
        attachments:[
            {
                fallback:"Novo chamado aberto" + [nivelAlerta] +": <" + url_alerta_jira + "|Ir para o JIRA>",
                pretext:"Novo chamado aberto" + [nivelAlerta] +": <" + url_alerta_jira + "|Ir para o JIRA>",
                color: color,
                fields:[
                    {
                        title:titulo,
                        value:"Valor: "+ alertaInfo.valor +" "+ alertaInfo.unidadeDado,
                        short:false
                    }
                ]
            }
        ]
    };

    const urlSlack = `https://hooks.slack.com/services/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`;

    fetch(`${urlSlack}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSlack)
    }).then(response => {
        console.log(response);
        console.log("A RESPOSTA DO SLACK TA BEM AQUI JOVEM");
    }).catch(e => {
        console.log(e);
    });
    return {url, descricao}
};


const openJiraTaskSendSlackNotificationFake = async (alertaInfo) => {
    require("dotenv").config({path: '../../.env'});
            
    const email = "carvalhohugo425@gmail.com";
    const key = process.env.JIRA_KEY;
    const urlApiJira = 'https://carvalhohugo425.atlassian.net/rest/api/3/issue'
    
    // Título dinâmico com base nas informações do alerta
    const nivelAlerta = alertaInfo.nivel === 1 ? "Crítico" : "Atenção";
    if(alertaInfo.hardware == undefined || alertaInfo.hardware == null || alertaInfo.hardware == '' || alertaInfo.valor == 0 || alertaInfo.valor == undefined || alertaInfo.valor == null){
      console.log("SAIA");
      
      return;
    }

    const resultado = await alertaModel.nomeFabrica(alertaInfo.fabrica_id);
    const nomeFabrica = resultado[0].nome
    const nomeEmpresa = resultado[0].razao_social

    const resultado2 = await alertaModel.nomeSetor(alertaInfo.plc_id);
    const nomeSetor = resultado2[0].nome

    const titulo = `Alerta ${nivelAlerta}: ${alertaInfo.hardware} ${alertaInfo.tipoDado} (${alertaInfo.valor}${alertaInfo.unidadeDado}) Nome da Fábrica: ${nomeFabrica}`;

    // Descrição com detalhes do alerta
    const descricao = `
    Foi detectado um alerta de ${nivelAlerta} para ${alertaInfo.hardware} ${alertaInfo.tipoDado}.
    
    Valor atual: ${alertaInfo.valor} ${alertaInfo.unidadeDado}

    Empresa: ${nomeEmpresa}
    
    Localização : Fábrica "${nomeFabrica}" | Setor "${nomeSetor}"

    PLC: ${alertaInfo.plc_id}

    Este alerta foi gerado automaticamente pelo sistema de monitoramento.
    `;
    
    //     const dataJira = {
    //   fields: {
    //     project: {
    //       key: "SPOP3"
    //     },
    //     customfield_10092: alertaInfo.dataCriacao, // Data de vencimento do alerta
        
    //     summary: titulo,
    //     description: {
    //       type: "doc",
    //       version: 1,
    //       content: [
    //         {
    //           type: "paragraph",
    //           content: [
    //             {
    //               type: "text",
    //               text: descricao
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     issuetype: {
    //       name: "Task"
    //     }
    //   }
    // };
    
    let url = 'https://carvalhohugo425.atlassian.net/rest/api/3/issue/11313';
    // await fetch(`${urlApiJira}`, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Basic ${Buffer.from(`${email}:${key}`).toString('base64')}`,
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(dataJira)
    // }).then(response => response.json().then(response => {
    //     console.log(response, "AQUI ESTA A RESPOSTA EM JSON");
    //     url = response.self;
    // })
    // .catch(e => {
    //     console.log(e);
    // })).catch(e => {
    //     console.log(e);
    // });
    // essa é a URL para abrir o card no jira, utilizeio o json que é a url para pegar a chave key
    url_alerta_jira = `https://carvalhohugo425.atlassian.net/jira/servicedesk/projects/SUP/boards/3?selectedIssue=${url}`

    const color = alertaInfo.nivel === 1 ? "#D00000" : "#FFA500"; // Vermelho para crítico, laranja para atenção
    
    // const dataSlack = {
    //     attachments:[
    //         {
    //             fallback:"Novo chamado aberto" + [nivelAlerta] +": <" + url_alerta_jira + "|Ir para o JIRA>",
    //             pretext:"Novo chamado aberto" + [nivelAlerta] +": <" + url_alerta_jira + "|Ir para o JIRA>",
    //             color: color,
    //             fields:[
    //                 {
    //                     title:titulo,
    //                     value:"Valor: "+ alertaInfo.valor +" "+ alertaInfo.unidadeDado,
    //                     short:false
    //                 }
    //             ]
    //         }
    //     ]
    // };

    const urlSlack = `https://hooks.slack.com/services/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`;

    // fetch(`${urlSlack}`, {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(dataSlack)
    // }).then(response => {
    //     console.log(response);
    //     console.log("A RESPOSTA DO SLACK TA BEM AQUI JOVEM");
    // }).catch(e => {
    //     console.log(e);
    // });
    return {url, descricao}
};

const qtdAlertaHardware = (req,res) => {
    alertaModel.qtdAlertaHardware()
        .then((dados) => {
            res.status(200).json(dados);
        })
        .catch((error) => {
            console.error("Erro: ", error)
            res.status(500).json({erro: erro.sqlMessage});
        });
}

const jiraAberto = async (req, res) => {
    const email = "carvalhohugo425@gmail.com";
    const key = process.env.JIRA_KEY;

    const auth = Buffer.from(`${email}:${key}`).toString("base64");
    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project=SPOP3 AND statusCategory!=Done AND status !="Work in progress"`;

    try {
        const response = await fetch(urlApiJira, {
            method: "GET",
            headers: {
                'Authorization': `Basic ${auth}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro do Jira: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.json({ total: data.total });

    } catch (error) {
        console.error("Erro ao buscar dados no Jira:", error.message);
        res.status(500).json({ erro: "Erro ao buscar chamados do Jira" });
    }
};

const jiraFazendo = async (req, res) => {
    const email = "carvalhohugo425@gmail.com";
    const key = process.env.JIRA_KEY;

    const auth = Buffer.from(`${email}:${key}`).toString("base64");
    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project=SPOP3 AND status="Work in progress"`;

    try {
        const response = await fetch(urlApiJira, {
            method: "GET",
            headers: {
                'Authorization': `Basic ${auth}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro do Jira: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.json({ total: data.total });

    } catch (error) {
        console.error("Erro ao buscar dados no Jira:", error.message);
        res.status(500).json({ erro: "Erro ao buscar chamados do Jira" });
    }
};

const jiraAbertoValidade = async (req, res) => {
    const email = "carvalhohugo425@gmail.com";
    const key = process.env.JIRA_KEY;

    const auth = Buffer.from(`${email}:${key}`).toString("base64");
    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project= "Time de Suporte Siemens" AND cf[10092] <= -24h AND statusCategory = new&fields=customfield_10092`;

    try {
        const response = await fetch(urlApiJira, {
            method: "GET",
            headers: {
                'Authorization': `Basic ${auth}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro do Jira: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.json({ total: data.total });

    } catch (error) {
        console.error("Erro ao buscar dados no Jira:", error.message);
        res.status(500).json({ erro: "Erro ao buscar chamados do Jira" });
    }
};

const jiraFechadoNow = async (req,res) => {
    const email = "carvalhohugo425@gmail.com";
    const key = process.env.JIRA_KEY;

    const auth = Buffer.from(`${email}:${key}`).toString("base64");
    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project = "Time de Suporte Siemens" AND statusCategory = Done AND cf[10124] >= startOfDay() AND cf[10124]<= endOfDay()`;

    try {
        const response = await fetch(urlApiJira, {
            method: "GET",
            headers: {
                'Authorization': `Basic ${auth}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro do Jira: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.json({ total: data.total });

    } catch (error) {
        console.error("Erro ao buscar dados no Jira:", error.message);
        res.status(500).json({ erro: "Erro ao buscar chamados do Jira" });
    }
};

const tempoFechamento = async (req, res) => {
    const email = "carvalhohugo425@gmail.com";
    const key = process.env.JIRA_KEY;
    const auth = Buffer.from(`${email}:${key}`).toString("base64");

    // ATUALIZAÇÃO AQUI: Adicionado customfield_10124 aos fields
    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project="Time de Suporte Siemens" AND statusCategory=Done&fields=customfield_10092,customfield_10124,created,customfield_10124&expand=changelog&maxResults=1000`;

    const response = await fetch(urlApiJira, {
        method: "GET",
        headers: {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json'
        }
    });

    const data = await response.json();

    // Filtra os issues que possuem a data de criação (customfield_10092)
    // E agora, também é bom verificar se tem o campo de resolução customizado se ele for obrigatório para o cálculo
    const issuesComDatas = data.issues.filter(issue => issue.fields.customfield_10092);

    if (issuesComDatas.length === 0) {
        return res.json({ mediaHoras: 0, totalChamados: 0 });
    }

    const temposEmMs = [];

    for (const issue of issuesComDatas) {
        const criado = new Date(issue.fields.customfield_10092);

        let dataDone = null;

        // PRIORIZANDO O customfield_10124 PARA A DATA DE RESOLUÇÃO/DONE
        if (issue.fields.customfield_10124) {
            dataDone = new Date(issue.fields.customfield_10124);
        } else {
            // Se customfield_10124 não estiver preenchido, então usa a lógica existente do changelog como fallback
            if (issue.changelog && issue.changelog.histories) {
                for (const history of issue.changelog.histories) {
                    for (const item of history.items) {
                        if (item.field === "status" && item.toString === "Done") {
                            dataDone = new Date(history.created);
                            break;
                        }
                    }
                    if (dataDone) break;
                }
            }
        }

        if (dataDone && dataDone > criado) {
            temposEmMs.push(dataDone - criado);
        }
    }

    if (temposEmMs.length === 0) {
        return res.json({ mediaHoras: 0, totalChamados: 0 });
    }

    const totalMs = temposEmMs.reduce((acc, cur) => acc + cur, 0);
    const mediaHoras = (totalMs / temposEmMs.length / 1000 / 60 / 60).toFixed(2);

    res.json({
        mediaHoras,
        totalChamados: temposEmMs.length
    });
};

const alertaTraceroute = async (req, res) => {

    const email = "carvalhohugo425@gmail.com";
    const key = process.env.JIRA_KEY;
    const auth = Buffer.from(`${email}:${key}`).toString("base64");

    // O 'expand=changelog' é crucial para podermos verificar a data da transição de status.
    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project="Time de Suporte Siemens" AND (cf[10092] >= "-7d" OR cf[10124] >= "-7d")&fields=created,status,customfield_10092,customfield_10124&expand=changelog&maxResults=1000`;

    try {
        const response = await fetch(urlApiJira, {
            method: "GET",
            headers: {
                'Authorization': `Basic ${auth}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Erro na requisição ao Jira: ${response.status} - ${errorText}`);
            return res.status(response.status).json({ error: "Erro ao buscar dados do Jira", details: errorText });
        }

        const data = await response.json();
        // console.log("Dados recebidos do Jira para alertaTraceroute:", JSON.stringify(data, null, 2)); // Para depuração, agora com dados mais completos

        const criadoPorDia = {};
        const resolvidoPorDia = {};

        const diasDatas = Array.from({ length: 7 }, (_, i) =>
            moment().subtract(i, 'days').format('YYYY-MM-DD')
        ).reverse();

        const dias = Array.from({ length: 7 }, (_, i) =>
            moment().subtract(i, 'days').format('dddd')
        ).reverse();

        const alertaDateField = 'customfield_10092'; // cf[10092] é a Data de Criação do Alerta

        for (let alerta of data.issues) {
            // --- Contabiliza Alertas Criados (ainda baseado APENAS na data simulada de criação) ---
            const dataAlertaCriado = alerta.fields[alertaDateField];
            if (dataAlertaCriado) {
                const diaAlertaCriado = moment(dataAlertaCriado).utcOffset('-03:00').startOf('day').format('YYYY-MM-DD');
                if (moment(diaAlertaCriado).isSameOrAfter(moment().subtract(7, 'days').startOf('day'))) {
                    criadoPorDia[diaAlertaCriado] = (criadoPorDia[diaAlertaCriado] || 0) + 1;
                }
            }

            // --- Contabiliza Alertas Resolvidos ---
            // Um alerta é considerado "resolvido" se seu status atual for "Concluído"
            if (alerta.fields.status && alerta.fields.status.name === "Concluído") {
                let dataResolucaoParaContagem = null;

                // 1. pegar os alertas que foram resolvidos manualmente
                if (alerta.fields.customfield_10124) {
                    const jiraResolutionMoment = moment(alerta.fields.customfield_10124).utcOffset('-03:00').startOf('day');
                    if (jiraResolutionMoment.isSameOrAfter(moment().subtract(7, 'days').startOf('day'))) {
                        dataResolucaoParaContagem = jiraResolutionMoment;
                    }
                }

                // 2. pegar os alertas resolvidos simulados, pegando o changeLog
                // if (!dataResolucaoParaContagem && alerta.changelog && alerta.changelog.histories) {
                //     for (const history of alerta.changelog.histories) {
                //         for (const item of history.items) {
                //             if (item.field === "status" && item.toString === "Concluído") {
                //                 const changelogResolutionMoment = moment(history.created).utcOffset('-03:00').startOf('day');
                //                 if (changelogResolutionMoment.isSameOrAfter(moment().subtract(7, 'days').startOf('day'))) {
                //                     dataResolucaoParaContagem = changelogResolutionMoment;
                //                     break;
                //                 }
                //             }
                //         }
                //         if (dataResolucaoParaContagem) break;
                //     }
                // }

                // 3.customField como proxy para a data de resolução (alerta que ja vem concluido) para simulação
                if (!dataResolucaoParaContagem && alerta.fields[alertaDateField]) { // alertaDateField é customfield_10092
                    const proxyResolutionMoment = moment(alerta.fields[alertaDateField]).utcOffset('-03:00').startOf('day');
                    if (proxyResolutionMoment.isSameOrAfter(moment().subtract(7, 'days').startOf('day'))) {
                         dataResolucaoParaContagem = proxyResolutionMoment;
                    }
                }

                // Se uma data de resolução válida (real ou proxy) foi determinada, contabiliza
                if (dataResolucaoParaContagem) {
                    const diaAlertaResolvido = dataResolucaoParaContagem.format('YYYY-MM-DD');
                    resolvidoPorDia[diaAlertaResolvido] = (resolvidoPorDia[diaAlertaResolvido] || 0) + 1;
                }
            }
        }

        const resultado = {
            dias,
            criados: diasDatas.map(dia => criadoPorDia[dia] || 0),
            resolvidos: diasDatas.map(dia => resolvidoPorDia[dia] || 0)
        };

        res.json(resultado);

    } catch (error) {
        console.error("Erro ao processar a requisição alertaTraceroute:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}

const pegarModelos = (req, res) => {
    alertaModel.pegarModelos().then(response => {
        console.log("banco:", response);
        res.json(response);
    })
}

const modeloComponente = (req, res) => {
    const modelo = req.params.modelo;
    alertaModel.modeloComponente(modelo).then(response => {
        console.log("banco:", response);
        res.json(response);
    })
}
module.exports = {
    store,
    getUltimoAlerta,
    qtdAlertaHardware,
    jiraAberto,
    jiraFazendo,
    jiraAbertoValidade,
    jiraFechadoNow,
    tempoFechamento,
    alertaTraceroute,
    pegarModelos,
    modeloComponente
};