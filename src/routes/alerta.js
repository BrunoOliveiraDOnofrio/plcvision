const express = require("express");
const router = express.Router();

const alertaController = require("../controllers/alertaController");

//router.post("/funcao", function (req, res) {
//    alertaController.funcao(req, res);
//});

router.post("/last", (req, res) => {
    alertaController.getUltimoAlerta(req, res);
});

module.exports = router;

