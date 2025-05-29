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


module.exports = {
    empresaMaisAfetada,
    mesMaisAfetado,
    modeloMaisAfetado
}