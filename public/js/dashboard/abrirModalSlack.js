let modal = document.querySelector('.modal-slack-message');


const abrirModal = () => {
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
        text: "🚨 Alerta Crítico de PLC!",
        emoji: true
      }
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*🏢Empresa:* X"
        },
        {
          type: "mrkdwn",
          text: "*⏳Tempo de atraso:* X horas"
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
        text: "*🔗 Link do chamado:*\n<https://carvalhohugo425.atlassian.net/jira/servicedesk/projects/SUP/queues/custom/1/SUP-250|Clique aqui>"

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

function fecharModalSucesso() {
  const modal = document.getElementById('modalSucesso');
  modal.style.display = 'none';
  if (modal) {
    modal.close();
  }
}