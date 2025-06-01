const express = require('express')
const router = express.Router()
const controller = require('../controllers/dashComponenteController')

router.get('/obterAlertasPorHorarioRam/:data', function(req, res){
    controller.obterAlertasPorHorarioRam(req, res)
})

router.get('/obterAlertasPorHorario/:data', function(req, res){
    controller.obterAlertasPorHorario(req, res)
})

router.get('/obterMaiorHorario/:data', function(req,res){
    controller.obterMaiorHorario(req,res)
})


module.exports = router

