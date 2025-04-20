const express = require("express");
const router = express.Router();

const fabricaController = require("../controllers/fabricaController");



router.get("/empresas", (req, res) => {
    fabricaController.getEmpresa(req, res);
});

router.get("/fabricas", (req, res) => {
    fabricaController.getFabricas(req, res);
});

router.get("/nomeEmpresa/:id", (req, res) => {
    fabricaController.getNomeEmpresa(req, res);
});

router.post('/cadastrar', (req, res) =>{
    fabricaController.cadastrar(req, res);
});

router.put('/atualizar', (req,res) => {
    fabricaController.atualizar(req, res);
});

module.exports = router;