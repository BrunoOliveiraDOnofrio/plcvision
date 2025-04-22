const express = require("express");
const router = express.Router();

const setor_registerController = require("../controllers/setor_registerController");

router.post("/cadastrar", function (req, res) {
    setor_registerController.cadastrar(req, res);
})

module.exports = router;