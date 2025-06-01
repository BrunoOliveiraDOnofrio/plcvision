const anomaliaModel = require("../models/anomaliaModel");

// const listarPlcsPorFabricante = (req, res) => {
//     const fabricanteId = req.params.id;
//     anomaliaModel.listarPlcsPorFabricante(fabricanteId)
//         .then(result => {
//             result.forEach(plc => {
//                 plc.ids_alertas_do_plc = plc.ids_alertas_do_plc
//                     ? plc.ids_alertas_do_plc.split(',').map(Number)
//                     : [];
//             });
//             res.status(200).json(result);
//         })
//         .catch(error => {
//             console.error("ERRO AO BUSCAR PLCs:", error);
//             res.status(500).json({ error: "Erro ao buscar PLCs", details: error });
//         });
// };

// const listarModeloPorEmpresa = (req, res) => {
//     const empresaId = req.params.empresaId;
//     const fabricanteId = req.params.fabricanteId;
//     anomaliaModel.listarModeloPorEmpresa(empresaId, fabricanteId)
//         .then(result => res.status(200).json(result))
//         .catch(error => {
//             console.error("ERRO AO BUSCAR MODELOS POR EMPRESA CONSUMIDORAS:", error);
//             res.status(500).json({ error: "Erro ao buscar empresas consumidoras", details: error });
//         });
// };

function listarEmpresasConsumidoras(req, res) {
    const fabricanteId = req.params.id;
    
    if (!fabricanteId) {
        return res.status(400).json({ erro: "ID do fabricante não informado" });
    }

    anomaliaModel.listarEmpresasConsumidoras(fabricanteId)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(404).json({ erro: "Nenhuma empresa encontrada" });
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar empresas:", erro);
            res.status(500).json({ erro: "Erro interno ao buscar empresas" });
        });
};

const listarFabricaSetores = (req, res) => {
    const empresaConsumidorId = req.params.id;
    anomaliaModel.listarFabricaSetores(empresaConsumidorId)
        .then(result => res.status(200).json(result))
        .catch(error => {
            console.error("ERRO AO BUSCAR FÁBRICAS/SETORES:", error);
            res.status(500).json({ error: "Erro ao buscar fábricas/setores", details: error });
        });
};

// const listarPlcsPorFabrica = (req, res) => {
//     const fabricaId = req.params.id;
//     anomaliaModel.listarPlcsPorFabrica(fabricaId)
//         .then(result => res.status(200).json(result))
//         .catch(error => {
//             console.error("ERRO AO BUSCAR PLCs DA FÁBRICA:", error);
//             res.status(500).json({ error: "Erro ao buscar PLCs da fábrica", details: error });
//         });
// };

// const setoresProcessosPorPlcFabrica = async (req, res) => {
//     const { fabricaId, plcId } = req.params;
//     try {
//         const setores = await anomaliaModel.setoresPorPlcFabrica(plcId, fabricaId);
//         const processos = await anomaliaModel.processosPreditivosPorPlcFabrica(plcId, fabricaId);
//         res.json({ setores, processos });
//     } catch (error) {
//         console.error("ERRO AO BUSCAR SETORES/PROCESSOS DA FÁBRICA:", error);
//         res.status(500).json({ error: "Erro ao buscar setores/processos da fábrica", details: error });
//     }
// };

// const analisePreditivaPorSetores = async (req, res) => {
//     const setores = req.body.setores || [];
//     const { dataInicial, dataFinal } = req.body;
//     try {
//         const analise = await analisarProcessos({ setores, dataInicial, dataFinal });
//         res.json({ processos: analise || [] });
//     } catch (error) {
//         res.status(500).json({ error: "Erro na análise preditiva", details: error.message });
//     }
// };

// const setoresProcessosPorPlc = async (req, res) => {
//     const plcId = req.params.id;
//     try {
//         const setores = await anomaliaModel.setoresPorPlc(plcId);
//         // Simulação: processos preditivos podem vir do S3 ou outro model
//         const processos = await anomaliaModel.processosPreditivosPorPlc(plcId);
//         res.json({ setores, processos });
//     } catch (error) {
//         console.error("ERRO AO BUSCAR SETORES/PROCESSOS:", error);
//         res.status(500).json({ error: "Erro ao buscar setores/processos", details: error });
//     }
// };

// const setoresPorPlc = async (req, res) => {
//     const plcId = req.params.id;
//     try {
//         const setores = await anomaliaModel.setoresPorPlc(plcId);
//         res.json(setores);
//     } catch (error) {
//         res.status(500).json({ error: "Erro ao buscar setores do PLC", details: error });
//     }
// };

// const setoresPorPlcFabrica = async (req, res) => {
//     const { fabricaId, plcId } = req.params;
//     try {
//         const setores = await anomaliaModel.setoresPorPlcFabrica(plcId, fabricaId);
//         res.json(setores);
//     } catch (error) {
//         res.status(500).json({ error: "Erro ao buscar setores do PLC na fábrica", details: error });
//     }
// };

// const listarFabricasMaisAlertas = (req, res) => {
//     const empresaConsumidorId = req.params.id;
//     anomaliaModel.listarFabricasMaisAlertas(empresaConsumidorId)
//         .then(result => res.status(200).json(result))
//         .catch(error => {
//             console.error("ERRO AO BUSCAR FÁBRICAS COM MAIS ALERTAS:", error);
//             res.status(500).json({ error: "Erro ao buscar fábricas com mais alertas", details: error });
//         });
// };

// const setoresPorModelo = async (req, res) => {
//     const modelo = req.params.modelo;
//     try {
//         const setores = await anomaliaModel.setoresPorModelo(modelo);
//         res.json(setores);
//     } catch (error) {
//         res.status(500).json({ error: "Erro ao buscar setores do modelo", details: error });
//     }
// };

// const listarFabricasPorModelo = (req, res) => {
//     const { empresaId, modelo } = req.params;
    
//     anomaliaModel.listarFabricasPorModelo(empresaId, modelo)
//         .then(result => {
//             if (!Array.isArray(result)) {
//                 result = [];
//             }
//             res.status(200).json(result);
//         })
//         .catch(error => {
//             console.error("ERRO AO BUSCAR FÁBRICAS DO MODELO:", error);
//             res.status(500).json([]);
//         });
// };

module.exports = {
    // listarPlcsPorFabricante,
    // listarModeloPorEmpresa,
    listarEmpresasConsumidoras,
    listarFabricaSetores,
    // listarPlcsPorFabrica,
    // analisePreditivaPorSetores,
    // setoresProcessosPorPlcFabrica,
    // setoresProcessosPorPlc,
    // setoresPorPlc,
    // setoresPorPlcFabrica,
    // listarFabricasMaisAlertas,
    // setoresPorModelo,
    // listarFabricasPorModelo
};