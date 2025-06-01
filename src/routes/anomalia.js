const express = require('express');
const router = express.Router();
const anomaliaController = require('../controllers/anomaliaController');

// router.get('/api/fabricante/:id/plcs', anomaliaController.listarPlcsPorFabricante);
// router.get('/empresa_consumidora/:empresaId/fabricante/:fabricanteId/modelosPorEmpresa', anomaliaController.listarModeloPorEmpresa);
router.get('/fabricante/:id/empresas_consumidoras', anomaliaController.listarEmpresasConsumidoras);
router.get('/empresa_consumidora/:id/fabrica_setores', anomaliaController.listarFabricaSetores);
// router.get('/fabrica/:id/plcs', anomaliaController.listarPlcsPorFabrica);
// router.get('/api/plc/:id/setores', anomaliaController.setoresPorPlc);
// router.get('/api/fabrica/:fabricaId/plc/:plcId/setores', anomaliaController.setoresPorPlcFabrica);
// router.post('/api/analise_preditiva', anomaliaController.analisePreditivaPorSetores);
// router.get('/api/empresa_consumidora/:id/fabricas_mais_alertas', anomaliaController.listarFabricasMaisAlertas);
// router.get('/api/empresa_consumidora/:empresaId/modelo/:modelo/fabricas', anomaliaController.listarFabricasPorModelo);

module.exports = router;