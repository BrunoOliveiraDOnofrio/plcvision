const express = require("express");
const router = express.Router();

const fabricaController = require("../controllers/fabricaController");

router.get("/", (req, res) => {
    fabricaController.getEmpresa(req, res);
})

router.post('/cadastrar', (req, res) =>{
    fabricaController.cadastrar(req, res);
});

module.exports = router;