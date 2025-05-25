const getAlertasComTempoDeRespostaAtrasado = async () => {
    fetch('/jira/alertas').then(response => response.json().then(response =>{
        console.log(response)
        qtdAlertas.innerText = response
     }
    ))
} 


getAlertasComTempoDeRespostaAtrasado()
