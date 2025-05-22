const alertaModel = require("../models/alertaModel");
// qnd ocorrer algum alerta, vai cadastar os dados e o alerta logo em seguida
const dadosModel = require("../models/dadosModel");

const moment = require('moment');

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
                plc_id: req.body.plc_id
            };
            console.log(alertaInfo)
            console.log("OLHA A BUCETA DO OBJETO ZUADO JSON QUE VC TA MANDANDO SEU LIXO")
            // aqui voces vao chamar o jira, e o slack
            await openJiraTaskSendSlackNotification(alertaInfo);
            
            alertaModel.create(req.body).then(response => {
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
    const urlApiJira = 'https://carvalhohugo425.atlassian.net/rest/api/3/issue';
    
    // Título dinâmico com base nas informações do alerta
    const nivelAlerta = alertaInfo.nivel === 1 ? "Crítico" : "Atenção";
    if(alertaInfo.hardware == undefined || alertaInfo.hardware == null || alertaInfo.hardware == '' || alertaInfo.valor == 0 || alertaInfo.valor == undefined || alertaInfo.valor == null){
      console.log("SAIA");
      console.log('CAIU NA VALIDAÇÃO FEZ O L BEM GRANDÃO AIIIIII')
      return;
    }

    const resultado = await alertaModel.nomeFabrica(alertaInfo.fabrica_id);
    const nomeFabrica = resultado[0].nome

    const resultado2 = await alertaModel.nomeSetor(alertaInfo.plc_id);
    const nomeSetor = resultado2[0].nome

    const titulo = `Alerta ${nivelAlerta}: ${alertaInfo.hardware} ${alertaInfo.tipoDado} (${alertaInfo.valor}${alertaInfo.unidadeDado}) Nome da Fábrica: ${nomeFabrica}`;

    // Descrição com detalhes do alerta
    const descricao = `
    Foi detectado um alerta de ${nivelAlerta} para ${alertaInfo.hardware} ${alertaInfo.tipoDado}.
    
    Valor atual: ${alertaInfo.valor} ${alertaInfo.unidadeDado}
    
    Localização : Fábrica "${nomeFabrica}" | Setor "${nomeSetor}"

    Este alerta foi gerado automaticamente pelo sistema de monitoramento.
    `;
    
        const dataJira = {
      fields: {
        project: {
          key: "SUP"
        },
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
        url = response.key;
    })
    .catch(e => {
        console.log(e);
    })).catch(e => {
        console.log(e);
    });
    // essa é a URL para abrir o card no jira, utilizeio o json que é a url para pegar a chave key
    url_alerta_jira = `https://carvalhohugo425.atlassian.net/jira/servicedesk/projects/SUP/boards/3?selectedIssue=${url}`

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
    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project=Suporte AND statusCategory!=Done`;

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
    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project=Suporte AND statusCategory!=Done AND created <= -3d`;

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
    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project=Suporte AND statusCategory=Done AND statusCategoryChangedDate >= -1d`;

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

    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project=Suporte AND resolution NOT IN (Declined, "Won't Do") AND statusCategory=Done&fields=created,resolutiondate`;

    const response = await fetch(urlApiJira, {
        method: "GET",
        headers: {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json'
        }
    });

    const data = await response.json();

    const temposResolucao = data.issues.filter(issue =>
        issue.fields.created && issue.fields.resolutiondate
    );

    let totalMs = 0; 

    for (let i = 0; i < temposResolucao.length; i++) {
        const criado = Date.parse(temposResolucao[i].fields.created);
        const resolvido = Date.parse(temposResolucao[i].fields.resolutiondate);
        totalMs += (resolvido - criado); 
    }

    const mediaHoras = ((totalMs / temposResolucao.length) / 1000 / 60 / 60).toFixed(2);

    res.json({ mediaHoras });

}

const alertaTraceroute = async (req, res) => {

    const email = "carvalhohugo425@gmail.com";
    const key = process.env.JIRA_KEY;
    const auth = Buffer.from(`${email}:${key}`).toString("base64");

    const urlApiJira = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=(created >= -7d OR resolutiondate >= -7d)&fields=created,resolutiondate&maxResults=1000`;

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

    const dias = Array.from({ length: 7 }, (_, i) =>
        moment().subtract(i, 'days').format('YYYY-MM-DD')
    ).reverse();


    
    // for (let alerta of data.issues) {
    // console.log('Created:', alerta.fields.created);
    // console.log('Resolved:', alerta.fields.resolutiondate);

    // console.log("Criado formatado:", moment(alerta.fields.created).utcOffset('-03:00').format('YYYY-MM-DD'));
    // console.log("Dias conhecidos:", dias);
    // }

    for (let alerta of data.issues) {
        const criado = moment(alerta.fields.created).utcOffset('-03:00').format('YYYY-MM-DD');
        criadoPorDia[criado] = (criadoPorDia[criado] || 0) + 1;

        if (alerta.fields.resolutiondate) {
            const resolvido = moment(alerta.fields.resolutiondate).utcOffset('-03:00').format('YYYY-MM-DD');
            resolvidoPorDia[resolvido] = (resolvidoPorDia[resolvido] || 0) + 1;
        }
    }

    const resultado = {
        dias,
        criados: dias.map(dia => criadoPorDia[dia] || 0),
        resolvidos: dias.map(dia => resolvidoPorDia[dia] || 0)
    };

    // console.log("Criados por dia:", criadoPorDia);
    // console.log("Resolvidos por dia:", resolvidoPorDia);
    // console.log("Array dias:", dias);
    res.json(resultado);

}

module.exports = {
    store,
    getUltimoAlerta,
    qtdAlertaHardware,
    jiraAberto,
    jiraAbertoValidade,
    jiraFechadoNow,
    tempoFechamento,
    alertaTraceroute
};