const express = require("express");
const router = express.Router();

const alertaController = require("../controllers/alertaController");

//router.post("/funcao", function (req, res) {
//    alertaController.funcao(req, res);
//});

router.post("/last", (req, res) => {
    alertaController.getUltimoAlerta(req, res);
});

router.post("/store", (req, res) => {
    alertaController.store(req, res);
});

router.get("/kpi1", (req,res) => {
    alertaController.jiraAberto(req,res);
})

router.get("/kpi2", (req,res) => {
    alertaController.jiraAbertoValidade(req,res);
})

router.get("/kpi3", (req,res) => {
    alertaController.jiraFechadoNow(req,res);
})

router.get("/kpi4", (req,res) => {
    alertaController.qtdAlertaHardware(req,res);
})

router.get("/kpi5", (req,res) => {
    alertaController.tempoFechamento(req,res);
})

router.get("/graficoTraceroute", (req, res) => {
    alertaController.alertaTraceroute(req,res);
})

router.get("/modeloComponente/:modelo", (req, res) => {
    alertaController.modeloComponente(req,res);
})

module.exports = router;

