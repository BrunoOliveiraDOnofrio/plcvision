const alertaModel = require("../models/alertaModel");
// qnd ocorrer algum alerta, vai cadastar os dados e o alerta logo em seguida
const dadosModel = require("../models/dadosModel");


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
        url = response.self;
    })
    .catch(e => {
        console.log(e);
    })).catch(e => {
        console.log(e);
    });

    const color = alertaInfo.nivel === 1 ? "#D00000" : "#FFA500"; // Vermelho para crítico, laranja para atenção
    
    const dataSlack = `{
        "attachments":[
            {
                "fallback":"Novo chamado aberto [${nivelAlerta}]: <${url}|Ir para o JIRA>",
                "pretext":"Novo chamado aberto [${nivelAlerta}]: <${url}|Ir para o JIRA>",
                "color":"${color}",
                "fields":[
                    {
                        "title":"${titulo}",
                        "value":"Valor: ${alertaInfo.valor} ${alertaInfo.unidadeDado}",
                        "short":false
                    }
                ]
            }
        ]
    }`;

    const urlSlack = `https://hooks.slack.com/services/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`;

    fetch(`${urlSlack}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: dataSlack
    }).then(response => {
        console.log(response);
        console.log("A RESPOSTA DO SLACK TA BEM AQUI JOVEM");
    }).catch(e => {
        console.log(e);
    });
};

module.exports = {
    store,
    getUltimoAlerta
};