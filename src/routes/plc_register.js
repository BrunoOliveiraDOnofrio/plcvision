const express = require("express");
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')
const empresaConsumidorController = require('../controllers/consumidorController')
const fabricaController = require('../controllers/fabricaController')
const setorController = require('../controllers/setorPivoController')
const configPlcController = require('../controllers/configPlcController');
const plcController = require('../controllers/plcController')
const alertaController = require('../controllers/alertaController')


const { config } = require("dotenv");




router.post('/alerta', (req, res) => {
    alertaController.store(req, res)
})

router.get('/config/:plcId', (req, res) => {
    plcController.getConfigs(req, res)
})

router.post('/plc', (req, res) => {
    plcController.store(req,res)
})

router.get('/plc/:mac', (req, res) => {
    plcController.getByMac(req, res)
})

router.post('/login', (req, res) => {
    usuarioController.autenticar(req, res)
})

router.get('/fabricas/:empresaId', (req, res) => {
    fabricaController.getByEmpresaId(req, res)
})

router.post('/config/:plcId', (req, res) => {
    configPlcController.storeDefault(req, res)
})

router.post('/config/fabrica/:plcId', (req, res) => {
    configPlcController.storeDefaultFabrica(req, res)
})

router.get('/config/fabrica/check/:fabricaId', (req, res) => {
    configPlcController.checkIfConfigFabricaExists(req, res)
})

router.get('/setores/:fabricaId', (req, res) => {
    setorController.getByFabricaId(req, res)
})

router.get('/empresas/:id', (req, res) => {
    empresaConsumidorController.getByToken(req, res)
})

module.exports = router;