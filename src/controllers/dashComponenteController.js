var dashComponenteModel = require('../models/dashComponenteModel')

function obterAlertasPorHorario(req,res){
    var data = req.params.data
    var modelo = req.params.modelo

    dashComponenteModel
    .obterAlertasPorHorario(data,modelo)
    .then(function(resultado){
        console.log(resultado)
        if(resultado.length > 0){
            res.status(200).json(resultado)
        }else{
            res.status(204).send('Nenhum alerta encontrado!')
        }
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
        console.log(erro)
    })

}

module.exports = {
    obterAlertasPorHorario
}