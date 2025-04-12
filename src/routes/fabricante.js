const express = require("express");
const router = express.Router();

const fabricanteController = require("../controllers/fabricanteController");

//router.post("/funcao", function (req, res) {
//    empresaController.funcao(req, res);
//});

router.post('/', (req, res) => {
    fabricanteController.store(req, res);
})

module.exports = router;

