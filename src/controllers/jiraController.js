const alertaModel = require('../models/alertaModel');
require("dotenv").config({path: '../../.env'});
const key = process.env.JIRA_KEY;
const email = "carvalhohugo425@gmail.com"


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
    getAlertasComTempoDeRespostaAtrasado
}