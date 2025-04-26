const express = require("express");
const router = express.Router();

const plcController = require("../controllers/plcController");
const configPlcController = require("../controllers/configPlcController");

router.put('/config/:id', (req, res) => {
    configPlcController.desativar(req, res);
});

router.get('/config/:fabricaId', (req, res) => plcController.getConfigsFabrica(req, res))

router.post('/config/:plcId', (req, res) => {
    configPlcController.store(req, res);
});

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