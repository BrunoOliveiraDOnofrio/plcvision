const path = require('path');
const express = require('express');
const router = express.Router();

const dashNegocioController = require('../controllers/dashNegocioController');

router.get('/monitoramento', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/dashboard/dashboard.html'));
})

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/dashboard/dashboard_analise.html'));
})

router.get('/consumidores', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/empresas_consumidoras/empresas_consumidoras.html'));
})

router.get('/consumidores/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/empresas_consumidoras/cadClientes.html'));
})

router.get('/consumidores/:id/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/empresas_consumidoras/alterar_consumidor.html'));
})

router.get('/alertas', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/alertas/alertas.html'));
})

router.get('/fabricas', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/fabricas/fabricas.html'));
})


router.get('/fabricas/:id/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/fabricas/AlterarFabrica.html'));
})


router.get('/fabricas/:id/config', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/fabricas/configurarFabrica.html'));
})

router.get('/fabricas/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/fabricas/CadastroFabrica.html'));
})

router.get('/plcs', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/plcs/plcs.html'));
})

router.get('/plcs/:id/show', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/plcs/visualizar_plc.html'));
})

router.get('/plcs/:id/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/plcs/edit_plc.html'));
})

router.get('/setores', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/setores/setores.html'));
})

router.get('/setores', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/setores/setores.html'));
})

router.get('/setores/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/setores/cadSetor.html'));
})

router.get('/setores/:id/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/setores/editar.html'));
})

router.get('/usuarios', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/usuarios/usuarios.html'));
})

router.get('/usuarios/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/usuarios/CadastroUsuario.html'));
})

router.get('/usuarios/:id/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/usuarios/editar.html'));
})

router.get('/dashNegocio', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adm_empresa/dashboardNegocio/dashboard.html'))
})
    
router.get('/dashNegocio/empresaMaisAfetada/:empresaId', (req, res) => {
    dashNegocioController.empresaMaisAfetada(req,res);
})

router.get('/dashNegocio/mesMaisAfetado/:empresaId', (req, res) => {
    dashNegocioController.mesMaisAfetado(req,res);
})

router.get('/dashNegocio/modeloMaisAfetado/:empresaId', (req, res) => {
    dashNegocioController.modeloMaisAfetado(req,res);
})

router.get('/dashNegocio/modeloMaisVendido/:empresaId', (req, res) => {
    dashNegocioController.modeloMaisVendido(req,res);
})

router.get('/dashNegocio/taxaDefeitosMes/:empresaId', (req, res) => {
    dashNegocioController.taxaDefeitosMes(req,res);
})

router.get('/dashNegocio/taxaDefeitosPorModelo/:empresaId', (req, res) => {
    dashNegocioController.taxaDefeitosPorModelo(req,res);
})

module.exports = router;