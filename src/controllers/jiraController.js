const alertaModel = require('../models/alertaModel');
require("dotenv").config({path: '../../.env'});
const key = process.env.JIRA_KEY;
const email = "carvalhohugo425@gmail.com" 


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const atualizarIssues = async (issuesKeys) => {
    

    const idAndamento = 11
    const idConcluido = 61
    let atualizados =  0;
    try{
        
        await Promise.all(issuesKeys.map(async (issueKey, index) => {
            const endpoint = `https://carvalhohugo425.atlassian.net/rest/api/3/issue/${issueKey}/transitions`
            console.log(index)
            let idTransition = 41
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${Buffer.from(`${email}:${key}`).toString('base64')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({
                    transition: {
                        id: idTransition
                    }
                })
            });
            // atualizados++;
            
            if (response.ok) {
                console.log(`Issue ${issueKey} atualizada com sucesso.`);
            } else {
                console.error(`Erro ao atualizar a issue ${issueKey}:`, response.statusText);
            }
            await sleep(1000);

    }))
    return atualizados;
} catch (error) {
    console.error('Erro ao atualizar issues:', error);
}
}


const getIssuesDoProjeto = async (req, res) => {
    const endpoint = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project=SPOP2&maxResults=30`
    try{
    const response = await fetch(endpoint, {
        method: 'GET',
        headers:{
            'Authorization' : `Basic ${Buffer.from(`${email}:${key}`).toString('base64')}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }

    })
    const data = await response.json()
    console.log(data)

    let issuesKeys = data.issues.map(issue => issue.key);

    const quantidadeAtualizada = await atualizarIssues(issuesKeys);

    res.status(200).json({
        message: `Issues atualizadas com sucesso! ${quantidadeAtualizada} issues foram atualizadas.`,
    });
    }catch(e) {
        res.status(500).json({ error: 'Erro ao buscar issues do projeto' ,e: e});
    }
}


const getAlertasComTempoDeRespostaAtrasado = async (req, res) => {
    try{
        const endpoint = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project=SUP1%20AND%20created <= -8H AND statusCategory=new`

        

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${email}:${key}`).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        
    
        const data = await response.json();
        console.log(data)
        res.status(200).json(data.total);
    }catch (error) {
        console.error('Erro ao buscar alertas:', error);
        res.status(500).json({ error: 'Erro ao buscar alertas' });
    }

}

module.exports = {
    getAlertasComTempoDeRespostaAtrasado,
    getIssuesDoProjeto
}