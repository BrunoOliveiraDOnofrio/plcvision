let modal = document.querySelector('.modal-slack-message');
let horasAtrasoGlobal 
let empresaGlobalSlack
let nivelGlobalSlack
let issueKeyGlobal 

let verificarSituacaoInterval


const iniciarVerificacoesSituacao = async () => {
  
      
      verificarSituacaoInterval = setInterval(async () => {

        await Promise.all(alertasComunicados.map(async alerta => {
            try{

              const response = await fetch(`/jira/alerta/${alerta.issueKey}`)

              const jsonResponse = await response.json()
              if(!alerta.plotar && jsonResponse.statusCategory.key != "new"){
                  alerta.plotar = true
                  qtdAlertas.innerText = Number(qtdAlertas.innerText) - 1
                  if(qtdAlertas.innerText == 0) qtdPlcs.innerText = 0
                  alerta.horarioAtualizacao = jsonResponse.dataModificacao
                  const alertaDivNoCarrossel = document.getElementById(alerta.issueKey)
                  if(alertaDivNoCarrossel) alertaDivNoCarrossel.remove()                  
                  mostrarModalAtualizacao(alerta.issueKey)            
              }
              console.log(jsonResponse)
            }catch(e) {
              console.log(e)
            }

        }))

        let alertasComunicadosString = JSON.stringify(alertasComunicados)
        sessionStorage.setItem('ALERTAS', alertasComunicadosString)
      }, 2000)
  
}



let alertasComunicados = sessionStorage.ALERTAS ?JSON.parse(sessionStorage.ALERTAS) : [];

const abrirModal = (titulo, texto, horaAtraso, empresa, nivel, issueKey) => {
    console.log(titulo)
    console.log(texto)
    horasAtrasoGlobal = horaAtraso
    empresaGlobalSlack = empresa
    nivelGlobalSlack = nivel
    issueKeyGlobal = issueKey
    p_mensagem.innerText = titulo + `\n` + texto; 
    modal.style.display = 'flex';
    modal.showModal();
}


const closeModal = () => {
    modal.style.display = 'none';
    modal.close();
}



const enviarMensagem = () => {
    let mensagem = p_mensagem.innerText;
    let obs = document.querySelector('#text_message').value;
    console.log(mensagem);
    const url = 'https://hooks.slack.com/services/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';
    const data = {
        color: '#FF0000',
        
	        blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `🚨 Alerta ${nivelGlobalSlack} de PLC!`,
        emoji: true
      }
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*🏢Empresa:* ${empresaGlobalSlack}`
        },
        {
          type: "mrkdwn",
          text: `*⏳Tempo de atraso:* ${horasAtrasoGlobal}`
        }
      ]
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Resumo do alerta:*\n${mensagem}`
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*🔗 Link do chamado:*\n<https://carvalhohugo425.atlassian.net/jira/servicedesk/projects/SUP/queues/custom/1/${issueKeyGlobal}|Clique aqui>`

      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Observações do Engenheiro de Manutenção:*\n${obs}`
      }
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "⏱️ *Urgência:* Resolução imediata recomendada"
        }
      ]
    }
  ]
	

    };

    fetch(url, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
            
            closeModal();
        } else {
            mostrarModalSucesso()
            document.querySelector('#text_message').value = "";
            closeModal()
            adicionarAlertaNoSessionStorage(issueKeyGlobal)
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}


function mostrarModalSucesso() {
  const modal = document.getElementById('modalSucesso');
  modal.style.display = 'flex';
  if (modal) {
    modal.showModal();
  }
}

function mostrarModalAtualizacao(texto) {
  const modal = document.getElementById('modalAtualizacao');
  p_alerta_att.innerText = "Chamado: "+texto
  modal.style.display = 'flex';
  if (modal) {
    modal.showModal();
  }
}

function fecharModalSucesso() {
  const modal = document.getElementById('modalSucesso');
  modal.style.display = 'none';
  if (modal) {
    modal.close();
  }
}

function fecharModalAtualizacao() {
  const modal = document.getElementById('modalAtualizacao');
  modal.style.display = 'none';
  if (modal) {
    modal.close();
  }
}

const adicionarAlertaNoSessionStorage = (key) => {
  let alertaCerto = alertas.filter(alerta => alerta.issueKey == key ? alerta : null)
  alertasComunicados.push(alertaCerto[0])
  if(!sessionStorage.ALERTAS){
      let alertasComunicadosJson = JSON.stringify(alertasComunicados)
      sessionStorage.setItem('ALERTAS', alertasComunicadosJson)
      return
  }

  let alertasComunicadosJson = JSON.parse(sessionStorage.getItem('ALERTAS'))
  alertasComunicadosJson.push(alertaCerto[0])
  let alertasComunicadosString = JSON.stringify(alertasComunicadosJson)
  sessionStorage.setItem('ALERTAS', alertasComunicadosString)


}