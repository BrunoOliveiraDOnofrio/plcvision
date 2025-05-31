const path = require("path");
const express = require("express");
const router = express.Router();

router.get('/alertas', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/tempo_real/alertas/alertas.html'));
})

router.get('/monitoramento', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/tempo_real/dashboard/dashboardTempoReal.html'));
})


router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/tempo_real/dashboard/dashboardTempoReal.html'));
})

router.get('/plcs', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/tempo_real/plcs/plcs.html'));
})

router.get('/plcs/:id/show', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/tempo_real/plcs/visualizar_plc.html'));
})


module.exports = router;