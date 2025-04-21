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

router.get("/enderecoFabrica/:id", (req, res) => {
    fabricaController.getEnderecoFabrica(req,res);
})

router.post('/cadastrar', (req, res) =>{
    fabricaController.cadastrar(req, res);
});

router.get('/atualizarCampo/:id', (req, res) => {
    fabricaController.atualizarCampo(req, res);
});

router.put('/atualizar/:id', (req, res) => {
    fabricaController.atualizar(req, res);
})

router.delete('/excluir/:id', (req, res) => {
    fabricaController.excluir(req, res);
});

module.exports = router;