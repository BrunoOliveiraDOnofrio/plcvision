const dashNegocioModel = require("../models/dashNegocioModel");

function empresaMaisAfetada(req,res){
    
    var empresaId = req.params.empresaId

    dashNegocioModel
    .getEmpresaMaisAfetada(empresaId).
    then(function(nomeEmpresa){
        console.log(nomeEmpresa)
        if(nomeEmpresa.length > 0){
            res.status(200).json(nomeEmpresa)
        }else{
            res.status(204).send('Não foi possível encontrar a empresa!')
        }
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
        console.log(erro)
    })
}


function mesMaisAfetado(req,res){
    
    var empresaId = req.params.empresaId

    dashNegocioModel
    .getMesMaisAfetado(empresaId).
    then(function(nomeMes){
        console.log(nomeMes)
        if(nomeMes.length > 0){
            res.status(200).json(nomeMes)
        }else{
            res.status(204).send('Não foi possível encontrar o mês!')
        }
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
        console.log(erro)
    })
}

function modeloMaisAfetado(req,res){
    
    var empresaId = req.params.empresaId

    dashNegocioModel
    .getModeloMaisAfetado(empresaId).
    then(function(nomeModelo){
        console.log(nomeModelo)
        if(nomeModelo.length > 0){
            res.status(200).json(nomeModelo)
        }else{
            res.status(204).send('Não foi possível encontrar o modelo!')
        }
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
        console.log(erro)
    })
}


function modeloMaisVendido(req,res){
    
    var empresaNome = req.params.empresaNome

    dashNegocioModel
    .getModeloMaisVendido(empresaNome).
    then(function(nomeModelo){
        console.log(nomeModelo, "RETORNO DA FUNCAO ")
        if(nomeModelo.length > 0){
            res.status(200).json(nomeModelo)
        }else{
            res.status(204).send('Não foi possível encontrar o modelo!')
        }
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
        console.log(erro)
    })
}


function taxaDefeitosMes(req,res){
    
    var empresaId = req.params.empresaId

    dashNegocioModel
    .getPrctDefeitosMes(empresaId).
    then(function(prctDefeito){
        console.log(prctDefeito)
        if(prctDefeito.length > 0){
            res.status(200).json(prctDefeito)
        }else{
            res.status(204).send('Não foi possível encontrar as porcentagens!')
        }
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
        console.log(erro)
    })
}


function taxaDefeitosPorModelo(req,res){
    
    var empresaId = req.params.empresaId

    dashNegocioModel
    .getDefeitosPorModelo(empresaId).
    then(function(prctPorModelo){
        console.log(prctPorModelo)
        if(prctPorModelo.length > 0){
            res.status(200).json(prctPorModelo)
        }else{
            res.status(204).send('Não foi possível encontrar as taxas por modelo!')
        }
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
        console.log(erro)
    })
}

async function prctMeta(req, res) {

    var empresaNome = req.params.empresaNome

    try {
       var funcao =  await dashNegocioModel.getPrctMeta(empresaNome);
       res.json(funcao)

    } catch (error) {
        res.status(500).json(error.sqlMessage)
        console.log(error)
    }

}
 
async function painelCancelamento(req, res) {

    var empresaNome = req.params.empresaNome

    try {
       var funcao =  await dashNegocioModel.getPainelCancelamento(empresaNome);
       res.json(funcao)

    } catch (error) {
        res.status(500).json(error.sqlMessage)
        console.log(error)
    }

}


module.exports = {
    empresaMaisAfetada,
    mesMaisAfetado,
    modeloMaisAfetado,
    taxaDefeitosMes,
    taxaDefeitosPorModelo,
    modeloMaisVendido,
    prctMeta,
    painelCancelamento
}