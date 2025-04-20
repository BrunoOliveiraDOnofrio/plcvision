const path = require("path");
const express = require("express");
const router = express.Router();


router.get('/alertas', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/analista/alertas/alertas.html'));
})

router.get('/monitoramento', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/analista/dashboard/dashboard.html'));
})

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/analista/dashboard/dashboard_analise.html'));
})

router.get('/plcs', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/analista/plcs/plcs.html'));
})

router.get('/plcs/:id/show', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/analista/plcs/visualizar_plc.html'));
})

module.exports = router;