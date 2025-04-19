const express = require("express");
const router = express.Router();

const fabricanteController = require("../controllers/fabricanteController");

//router.post("/funcao", function (req, res) {
//    empresaController.funcao(req, res);
//});

router.post('/', (req, res) => {
    fabricanteController.store(req, res);
})
router.post("/testar", fabricanteController.testarDados);

// router.get("/", fabricanteController.index);
router.get("/", fabricanteController.listarFabricantes);
router.delete("/:id", fabricanteController.destroy);

module.exports = router;

