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

router.get('/dashboardComponente', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/analista/dashboard/dashboard_rede.html'));
})

router.get('/plcs', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/analista/plcs/plcs.html'),  {
        headers: {
            'Content-Type': 'text/html'
        }
    });
})

router.get('/dashPix', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/analista/dashboard/dashboard-analitica-pix-v2.html'));
})

router.get('/plcs/:id/show', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/analista/plcs/visualizar_plc.html'));
})

router.get('/dashModelo', (req, res) =>{
    res.sendFile(path.join(__dirname, '../../public/analista/dashboard/outlier.html'));
})

module.exports = router;