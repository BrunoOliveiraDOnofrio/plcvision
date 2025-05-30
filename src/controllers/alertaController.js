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
            let {url, descricao} = await openJiraTaskSendSlackNotificationFake(alertaInfo);
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
};

const jiraAberto = async (req, res) => {
    const email = "carvalhohugo425@gmail.com";
    const key = process.env.JIRA_KEY;

    const auth = Buffer.from(`${email}:${key}`).toString("base64");
    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project="Suporte Populacao 3" AND statusCategory!=Done`;

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
    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project="Suporte Populacao 3" AND statusCategory != Done AND cf[10092] <= -8h`;

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
    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project = "Suporte Populacao 3" AND statusCategory = Done AND resolved >= startOfDay()`;

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

    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project="Suporte Populacao 3" AND statusCategory=Done&fields=customfield_10092,created,resolutiondate&expand=changelog&maxResults=1000`;

    const response = await fetch(urlApiJira, {
      method: "GET",
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();

    const issuesComDatas = data.issues.filter(issue => issue.fields.created && issue.changelog && issue.changelog.histories);

    if (issuesComDatas.length === 0) {
      return res.json({ mediaHoras: 0, totalChamados: 0 });
    }

    const temposEmMs = [];

    for (const issue of issuesComDatas) {
      const criado = new Date(issue.fields.created);

      // Procurar no changelog o momento que o status virou "Done"
      // os alertas n tem resolutionDate, então eu pego o log do momento que o alerta virou Done
      let dataDone = null;
      for (const history of issue.changelog.histories) {
        for (const item of history.items) {
          if (item.field === "status" && item.toString === "Done") {
            dataDone = new Date(history.created);
            break;
          }
        }
        if (dataDone) break;
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

    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project="Suporte Populacao 3" AND (created >= -7d OR resolutiondate >= -7d)&fields=created,resolutiondate,status,customfield_10092&maxResults=1000`;

    const response = await fetch(urlApiJira, {
        method: "GET",
        headers: {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json'
        }
    });

    const data = await response.json();
    console.log(data);

    const criadoPorDia = {};
    const resolvidoPorDia = {};

    const diasDatas = Array.from({ length: 7 }, (_, i) =>
        moment().subtract(i, 'days').format('YYYY-MM-DD')
    ).reverse();

   
    const dias = Array.from({ length: 7 }, (_, i) =>
        moment().subtract(i, 'days').format('dddd')
    ).reverse();

    const alertaDateField = 'customfield_10092'; // cf[10092]

for (let alerta of data.issues) {
    const dataAlerta = alerta.fields[alertaDateField];
    if (dataAlerta) {
        const diaAlerta = moment(dataAlerta).utcOffset('-03:00').startOf('day').format('YYYY-MM-DD');
        criadoPorDia[diaAlerta] = (criadoPorDia[diaAlerta] || 0) + 1;
    }

    if (alerta.fields.resolutiondate) {
        const resolvido = moment(alerta.fields.resolutiondate).utcOffset('-03:00').startOf('day').format('YYYY-MM-DD');
        resolvidoPorDia[resolvido] = (resolvidoPorDia[resolvido] || 0) + 1;
    }
}

    const resultado = {
        dias, // Agora retorna os nomes dos dias da semana
        criados: diasDatas.map(dia => criadoPorDia[dia] || 0),
        resolvidos: diasDatas.map(dia => resolvidoPorDia[dia] || 0)
    };

    console.log("Criados por dia:", criadoPorDia);
    console.log("Resolvidos por dia:", resolvidoPorDia);
    console.log("Array dias:", dias);
    res.json(resultado);

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
    jiraAbertoValidade,
    jiraFechadoNow,
    tempoFechamento,
    alertaTraceroute,
    pegarModelos,
    modeloComponente
};