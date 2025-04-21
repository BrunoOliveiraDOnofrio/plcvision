const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js


router.put('/atualizar/:id', (req, res) => {
    usuarioController.atualizar(req, res);
});

router.get("/", (req, res) => {
    usuarioController.get(req, res);
})

router.get('/:id', (req, res) => {
    usuarioController.getById(req, res);
});

router.get('/lista/:empresaId', (req, res) => {
    usuarioController.listarMesmaEmpresa(req, res);
});

router.post('/', (req, res) => {
    usuarioController.store(req, res);
})

router.post("/autenticar", usuarioController.autenticar);

router.delete('/:id', (req, res) => {
    usuarioController.delete(req, res);
});

module.exports = router;