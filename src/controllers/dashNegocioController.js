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
    
    var empresaId = req.params.empresaId

    dashNegocioModel
    .getModeloMaisVendido(empresaId).
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

    var empresaId = req.params.empresaId

    try {
       var funcao =  await dashNegocioModel.getPrctMeta(empresaId);
       res.json(funcao)

    } catch (error) {
        res.status(500).json(error.sqlMessage)
        console.log(error)
    }

}
 
async function painelCancelamento(req, res) {

    var empresaId = req.params.empresaId

    try {
       var funcao =  await dashNegocioModel.getPainelCancelamento(empresaId);
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