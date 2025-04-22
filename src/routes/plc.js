const express = require("express");
const router = express.Router();

const plcController = require("../controllers/plcController");

router.get("/", (req, res) => {
    plcController.get(req, res);
});

router.get("/:id", (req, res) => {
    plcController.listarUm(req, res);
});


router.get('/get/:empresaId', (req, res) => {
    plcController.listarPorEmpresa(req, res);
});


module.exports = router;