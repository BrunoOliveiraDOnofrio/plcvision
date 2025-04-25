const express = require("express");
const router = express.Router();

const setor_registerController = require("../controllers/setor_registerController");

router.post("/cadastrarSetor", function (req, res) {
    setor_registerController.cadastrarSetor(req, res);
});

router.get('/listarSetorFabrica/:id', (req, res) => {
    setor_registerController.listarSetorFabrica(req, res);
});

router.get('/pegarNomeFabrica/:id', (req,res) => {
    setor_registerController.pegarNomeFabrica(req,res);
})

router.get('/pegarIdFabrica/:id', (req, res) => {
    setor_registerController.pegarIdFabrica(req,res);
})

router.put('/atualizarSetor/:id', (req, res) => {
    setor_registerController.atualizarSetor(req, res);
});

router.delete('/:id', (req, res) => {
    setor_registerController.deletarSetor(req, res);
});

module.exports = router;