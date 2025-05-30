const router = require('express').Router();


const jiraController = require('../controllers/jiraController');

router.get('/alerta/:key', (req, res) => jiraController.buscarDetalhamento(req, res))

router.get('/alertas', (req, res) => jiraController.getAlertasComTempoDeRespostaAtrasado(req, res));

router.get('/issues', (req, res) => jiraController.getIssuesDoProjeto(req, res));
module.exports = router;