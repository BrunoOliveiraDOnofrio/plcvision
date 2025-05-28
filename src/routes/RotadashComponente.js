const express = require('express')
const router = express.Router()
const controller = require('../controllers/dashComponenteController')

router.get('/obterAlertasPorHorario/:data/:modelo', function(req, res){
    controller.obterAlertasPorHorario(req, res)
})


module.exports = router

