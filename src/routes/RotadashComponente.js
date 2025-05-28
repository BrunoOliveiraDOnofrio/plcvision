const express = require('express')
const router = express.Router()
const controller = require('../controllers/dashComponenteController')

router.get('/obterAlertasPorHorario/:data/:modelo', function(req, res){
    controller.obterAlertasPorHorario(req, res)
})

router.get('/obterMaiorHorario/:data/:modelo', function(req,res){
    controller.obterMaiorHorario(req,res)
})


module.exports = router

