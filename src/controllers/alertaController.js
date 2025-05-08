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
            
            // aqui voces vao chamar o jira, e o slack
           await openJiraTaskSendSlackNotification()
            
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


const openJiraTaskSendSlackNotification = async (task) => {
  require("dotenv").config({path: '../../.env'});
            
  const email = "carvalhohugo425@gmail.com"
  const key = process.env.JIRA_KEY
  const urlApiJira = 'https://carvalhohugo425.atlassian.net/rest/api/3/issue'
  const dataJira = `{
      "fields": {
        "project": {
          "key": "SUP"
        },
        "summary": "Alerta Atenção no Uso de RAM GB",
        "description": {
          "type": "doc",
          "version": 1,
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "text": "Usuário não consegue acessar com credenciais válidas. Aparece erro 500.",
                  "type": "text"
                }
              ]
            }
          ]
        },
        "issuetype": {
          "name": "Task"
        }
      }
    }`
    let url 
    await fetch(`${urlApiJira}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${email}:${key}`).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: dataJira}).then(response => response.json().then(response => {
        console.log(response, "AQUI ESTA A RESPOSTA EM JSON")
        url = response.self
      })
      .catch(e => {
        console.log(e)
      })).catch(e => {
        console.log(e)
      })

      const dataSlack = `    {
    "attachments":[
        {
            "fallback":"Novo chamado aberto [Crítico]: <${url}|Ir para o JIRA>",
            "pretext":"Novo chamado aberta [Crítico]: <${url}|Ir para o JIRAs>",
            "color":"#D00000",
            "fields":[
                {
                "title":"Alerta Uso CPU %",
                "value":"Empresa: Casas Bahia",
                "short":"Fábrica: Rua Maria Susano"
                }
            ]
        }
    ]
    }`

    const urlSlack = `https://hooks.slack.com/services/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`

    fetch(`${urlSlack}`, {
      method: 'POST',
      headers: {
        
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: dataSlack}).then(response => {
          console.log(response)
          console.log("A RESPOSTA DO SLACK TA BEM AQUI JOVEM")
      }).catch(e => {
        console.log
      })

}

module.exports = {
    store,
    getUltimoAlerta
};