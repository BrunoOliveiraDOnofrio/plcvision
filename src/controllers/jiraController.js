const { response } = require('express');
const alertaModel = require('../models/alertaModel');
require("dotenv").config({path: '../../.env'});
const key = process.env.JIRA_KEY;
const email = "carvalhohugo425@gmail.com" 


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const buscarDetalhamento = async (req, res) => {
    const issueKey = req.params.key;
    


    
    const authString = Buffer.from(`${email}:${key}`).toString('base64');

    const endpoint = `https://carvalhohugo425.atlassian.net/rest/api/3/issue/${issueKey}`;

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${authString}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro ao buscar detalhamento do Jira:', errorData);
            // Retorna o erro exato do Jira para o cliente
            return res.status(response.status).json({
                error: errorData.errorMessages ? errorData.errorMessages.join(', ') : 'Erro desconhecido da API do Jira',
                jiraResponse: errorData
            });
        }

        const issueData = await response.json();

        // Extrai o status category
        const statusCategory = issueData.fields.status.statusCategory;
        const statusCategoryChangeDate = formatarDataParaDDMMYY(issueData.fields.statuscategorychangedate);

        res.status(200).json({
            statusCategory: statusCategory,
            dataModificacao: statusCategoryChangeDate
        });

    } catch (e) {
        console.error('Erro na requisição fetch:', e);
        res.status(500).json({
            error: 'Ocorreu um erro ao processar sua requisição.',
            details: e.message
        });
    }
};


const excluirIssues = async (issuesKeys) => {
    

    const idAndamento = 11
    const idConcluido = 61
    let atualizados =  0;
    try{
        
        await Promise.all(issuesKeys.map(async (issueKey, index) => {
            const endpoint = `https://carvalhohugo425.atlassian.net/rest/api/3/issue/${issueKey}`
            console.log(index)
            let idTransition = 41
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Basic ${Buffer.from(`${email}:${key}`).toString('base64')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    
                },
                // body: JSON.stringify({
                //     transition: {
                //         id: idTransition
                //     }
                // })
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

const atualizarIssues = async (issuesKeys) => {
    

    const idAndamento = 11
    const idConcluido = 61
    let atualizados =  0;
    try{
        
        await Promise.all(issuesKeys.map(async (issueKey, index) => {
            const endpoint = `https://carvalhohugo425.atlassian.net/rest/api/3/issue/${issueKey}/transitions`
            console.log(index)
            let idTransition

            if((index >= 0 && index <= 7) || (index >=  29 && index <= 31) ){
                idTransition = idAndamento;
            }else if ((index >= 8 && index <= 17) || (index >= 32 && index <= 46)){
                idTransition = idConcluido;
            }else{
                console.log("sem alterar", issueKey)
            }
            if(idTransition){
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
            }
            await sleep(1000);

    }))
    return atualizados;
} catch (error) {
    console.error('Erro ao atualizar issues:', error);
}
}


const getIssuesDoProjeto = async (req, res) => {
    const endpoint = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project=SPOP3&maxResults=100`
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
    issuesKeys = issuesKeys.reverse()


    const quantidadeAtualizada = await atualizarIssues(issuesKeys);

    res.status(200).json({
        message: `Issues atualizadas com sucesso! ${quantidadeAtualizada} issues foram atualizadas.`,
    });
    }catch(e) {
        res.status(500).json({ error: 'Erro ao buscar issues do projeto' ,e: e});
    }
}


const getAlertasParaNivelDeCriticidade = async() => {
    try{
        const endpoint = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project = SPOP3 AND cf[10092] <= -5h AND statusCategory = New`

        

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${email}:${key}`).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        
    
        const data = await response.json();
        
        const issuesTratados = await tratarIssuesEmpresaRazaoPlcId(data.issues);
        // console.log(issuesTratados)
        return issuesTratados
        
        ;
    }catch (error) {
        console.error('Erro ao buscar alertas:', error);
        return { error: 'Erro ao buscar alertas' };
    }

}



const getAlertasComTempoDeRespostaAtrasado = async (req, res) => {
    try{
        const endpoint = `https://carvalhohugo425.atlassian.net/rest/api/3/search?jql=project = SPOP3 AND cf[10092] <= -5h AND statusCategory = New`

        

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${email}:${key}`).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        
    
        const data = await response.json();
        
        const issuesTratados = await tratarIssuesEmpresaRazaoPlcId(data.issues);
        // console.log(issuesTratados)
        res.status(200).json({
            total :data.total,
            issues: issuesTratados
        }
        );
    }catch (error) {
        console.error('Erro ao buscar alertas:', error);
        res.status(500).json({ error: 'Erro ao buscar alertas' });
    }

}


function formatarDataParaDDMMYY(dataString) {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = String(data.getFullYear()).slice(-2);
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

function calcularHorasAtraso(dataString) {
    // Converte a string para objeto Date
    const dataAlvo = new Date(dataString);
    // Pega o momento atual
    const agora = new Date();
    // Calcula a diferença em milissegundos
    const diffMs = agora - dataAlvo;
    // Converte para horas
    let diffHoras = diffMs / (1000 * 60 * 60);
    // Retorna o valor arredondado para duas casas decimais

    if(diffHoras < 0){
        let diffMinutos = Math.abs(diffHoras * 60);
        return `${diffMinutos.toFixed(2)} minutos`;
    }else if(diffHoras > 24){
       let diffDias = Math.floor(diffHoras / 24);
         diffHoras = diffHoras - (diffDias * 24);
        return `${diffDias} dias e ${diffHoras.toFixed(2)} horas`;
    }  
    return `${diffHoras.toFixed(2)} hora(s)`;
}

const tratarIssuesEmpresaRazaoPlcId = async (issues) => {
    novasInformacoes = []
    console.log(issues.length)
    issues.map(issue => {

        const objetoDaEmpresa = {
            "empresa" : "",
            "issues" : [],
            "qtdIssuesCriticos" : 0,
            "qtdIssuesAtencao":0
        }
        const novoIssue = {
            "titulo" : issue.fields.summary,
            "empresa" : "",
            "plcId" : "",
            "texto" : "",
            "issueKey" : issue.key,
            "prioridade" : issue.fields.priority.name,
            "status" : issue.fields.status.name,
            "dataCriacao" : formatarDataParaDDMMYY(issue.fields.customfield_10092),
            "atraso" : calcularHorasAtraso(issue.fields.customfield_10092),
        }

        novoIssue.nivelAlerta = novoIssue.prioridade === "Medium" ? "Atenção" : "Crítico";

        

        const textoDoIssue = issue.fields.description.content[0].content[0].text;
        novoIssue.texto = textoDoIssue;
        const linhasDoTexto = textoDoIssue.split('\n')
        linhasDoTexto.forEach(linha => {
            if(linha.includes("Empresa:")){
                const empresa = linha.split(":")[1].trim();
                novoIssue.empresa = empresa
                objetoDaEmpresa.empresa = empresa;
                
            }else if(linha.includes("PLC:")){
                novoIssue.plcId = linha.split(":")[1].trim();
            }


        
    }

        
    
    )
        let existe = false    
        novasInformacoes.forEach(informacao => {
            if(informacao.empresa === objetoDaEmpresa.empresa){
                informacao.issues.push(novoIssue);
                existe = true;
                if(novoIssue.prioridade === "Medium"){
                    informacao.qtdIssuesAtencao++;
                }else{
                    informacao.qtdIssuesCriticos++;
                }
            }
        })

        if(!existe){
            if(novoIssue.prioridade === "Medium"){
                    objetoDaEmpresa.qtdIssuesAtencao++;
            }else{
                    objetoDaEmpresa.qtdIssuesCriticos++;
            }
            objetoDaEmpresa.issues.push(novoIssue);
            novasInformacoes.push(objetoDaEmpresa);
        }

})

        
    return novasInformacoes
}

    // agrupar os alertas separando por empresas 

    



module.exports = {
    getAlertasComTempoDeRespostaAtrasado,
    getIssuesDoProjeto,
    getAlertasParaNivelDeCriticidade,
    buscarDetalhamento
}