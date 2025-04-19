var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js


router.put("/:id", (req, res) => {
    usuarioController.update(req,res)
})

router.get("/", (req, res) => {
    usuarioController.get(req, res);
})

router.post('/', (req, res) => {
    usuarioController.store(req, res);
})

router.post("/autenticar", usuarioController.autenticar);

module.exports = router;