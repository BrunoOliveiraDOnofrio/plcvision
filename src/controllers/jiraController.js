const alertaModel = require('../models/alertaModel');
require("dotenv").config({path: '../../.env'});
const key = process.env.JIRA_KEY;
const email = "carvalhohugo425@gmail.com"


const getAlertasComTempoDeRespostaAtrasado = async (req, res) => {
    try{
        const endpoint = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project=SUP1%20AND%20%22Time%20to%20first%20response%22%20%3D%20breached()%20AND%20statusCategory!=Done%20AND%20created>=-3d`

        

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${email}:${key}`).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        
    
        const data = await response.json();
        res.status(200).json(data.total);
    }catch (error) {
        console.error('Erro ao buscar alertas:', error);
        res.status(500).json({ error: 'Erro ao buscar alertas' });
    }

}

module.exports = {
    getAlertasComTempoDeRespostaAtrasado
}