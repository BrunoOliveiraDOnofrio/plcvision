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
    alertaController.jiraFechadoNow(req,res);
})

router.get("/kpi3", (req,res) => {
    alertaController.qtdAlertaHardware(req,res);
})

router.get("/kpi4", (req,res) => {
    alertaController.tempoFechamento(req,res);
})
module.exports = router;

