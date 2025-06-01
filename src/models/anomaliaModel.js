const database = require("../database/config");

// const listarPlcsPorFabricante = (fabricanteId) => {
//     const sql = `SELECT p.id, p.modelo, COUNT(a.id) AS quantidade_alertas, GROUP_CONCAT(a.id) AS ids_alertas_do_plc
//         FROM plc p
//         JOIN parceria pa ON p.parceria_id = pa.id
//         LEFT JOIN config_plc cp ON cp.plc_id = p.id
//         LEFT JOIN alerta a ON a.config_plc_id = cp.id
//         WHERE pa.empresa_fabricante_id = ${fabricanteId}
//         GROUP BY p.id, p.modelo
//         ORDER BY quantidade_alertas DESC`;
//     return database.executar(sql);
// };

// const listarModeloPorEmpresa = (empresaId, fabricanteId) => {
//     const sql = `
// SELECT 
//             p.modelo,
//             COUNT(DISTINCT a.id) as quantidade_alertas
//         FROM plc p
//         JOIN parceria pa ON p.parceria_id = pa.id
//         LEFT JOIN config_plc cp ON cp.plc_id = p.id
//         LEFT JOIN alerta a ON a.config_plc_id = cp.id
//         WHERE pa.empresa_fabricante_id = ${fabricanteId}
//         AND pa.empresa_consumidor_id = ${empresaId}
//         GROUP BY p.modelo
//         ORDER BY quantidade_alertas DESC;
//     `;
    
//     return database.executar(sql);
// }

const listarEmpresasConsumidoras = (fabricanteId) => {
    const sql = `
        SELECT 
            ec.id, 
            ec.razao_social, 
            COUNT(a.id) AS quantidade_alertas
        FROM empresa_consumidor ec
        JOIN parceria pa ON pa.empresa_consumidor_id = ec.id
        JOIN plc p ON p.parceria_id = pa.id
        LEFT JOIN config_plc cp ON cp.plc_id = p.id
        LEFT JOIN alerta a ON a.config_plc_id = cp.id
        WHERE pa.empresa_fabricante_id = ${fabricanteId}
        GROUP BY ec.id, ec.razao_social
        ORDER BY quantidade_alertas DESC
    `;
    return database.executar(sql);
};

const listarFabricaSetores = (empresaConsumidorId) => {
    const sql = `
        SELECT
            fc.id AS fabrica_id,
            fc.nome AS fabrica_nome,
            sf.id AS setor_id,
            sf.nome AS setor_nome,
            COUNT(a.id) AS quantidade_alertas
        FROM fabrica_consumidor fc
                 JOIN setor_fabrica sf ON sf.fabrica_consumidor_id = fc.id
                 JOIN plc p ON p.setor_fabrica_id = sf.id
                 LEFT JOIN config_plc cp ON cp.plc_id = p.id
                 LEFT JOIN alerta a ON a.config_plc_id = cp.id
        WHERE fc.empresa_consumidor_id = ${empresaConsumidorId}
        GROUP BY fc.id, fc.nome, sf.id, sf.nome
        ORDER BY quantidade_alertas DESC
    `;

    return database.executar(sql);
};

// const listarPlcsPorFabrica = (fabricaId) => {
//     const sql = `
//         SELECT p.id, p.modelo, COUNT(a.id) AS quantidade_alertas
//         FROM plc p
//         JOIN setor_fabrica sf ON p.setor_fabrica_id = sf.id
//         JOIN fabrica_consumidor fc ON sf.fabrica_consumidor_id = fc.id
//         LEFT JOIN config_plc cp ON cp.plc_id = p.id
//         LEFT JOIN alerta a ON a.config_plc_id = cp.id
//         WHERE fc.id = ${fabricaId}
//         GROUP BY p.id, p.modelo
//         ORDER BY quantidade_alertas DESC
//     `;
//     return database.executar(sql);
// };

// const setoresPorPlc = (plcId) => {
//     const sql = `
//         SELECT sf.nome AS setor_nome, COUNT(a.id) AS quantidade_alertas
//         FROM plc p
//                  JOIN setor_fabrica sf ON p.setor_fabrica_id = sf.id
//                  LEFT JOIN config_plc cp ON cp.plc_id = p.id
//                  LEFT JOIN alerta a ON a.config_plc_id = cp.id
//         WHERE p.modelo = (SELECT modelo FROM plc WHERE id = ${plcId})
//         GROUP BY sf.nome
//         ORDER BY quantidade_alertas DESC
//     `;
//     return database.executar(sql);
// };

// const setoresPorPlcFabrica = (plcId, fabricaId) => {
//     const sql = `
//         SELECT sf.nome AS setor_nome, COUNT(a.id) AS quantidade_alertas
//         FROM plc p
//         JOIN setor_fabrica sf ON p.setor_fabrica_id = sf.id
//         JOIN fabrica_consumidor fc ON sf.fabrica_consumidor_id = fc.id
//         LEFT JOIN config_plc cp ON cp.plc_id = p.id
//         LEFT JOIN alerta a ON a.config_plc_id = cp.id
//         WHERE p.id = ${plcId} AND fc.id = ${fabricaId}
//         GROUP BY sf.nome
//         ORDER BY quantidade_alertas DESC
//     `;
//     return database.executar(sql);
// };

// const listarFabricasMaisAlertas = (empresaConsumidorId) => {
//     const sql = `
//         SELECT 
//             fc.id AS fabrica_id,
//             fc.nome AS fabrica_nome,
//             COUNT(a.id) AS quantidade_alertas
//         FROM fabrica_consumidor fc
//         JOIN setor_fabrica sf ON sf.fabrica_consumidor_id = fc.id
//         JOIN plc p ON p.setor_fabrica_id = sf.id
//         LEFT JOIN config_plc cp ON cp.plc_id = p.id
//         LEFT JOIN alerta a ON a.config_plc_id = cp.id
//         WHERE fc.empresa_consumidor_id = ${empresaConsumidorId}
//         GROUP BY fc.id, fc.nome
//         ORDER BY quantidade_alertas DESC
//     `;
//     return database.executar(sql);
// };

// const setoresPorModelo = (modelo) => {
//     const sql = `
//         SELECT DISTINCT sf.nome AS setor_nome, COUNT(a.id) AS quantidade_alertas
//         FROM plc p
//         JOIN setor_fabrica sf ON p.setor_fabrica_id = sf.id
//         LEFT JOIN config_plc cp ON cp.plc_id = p.id
//         LEFT JOIN alerta a ON a.config_plc_id = cp.id
//         WHERE p.modelo = '${modelo}'
//         GROUP BY sf.id, sf.nome
//         ORDER BY quantidade_alertas DESC
//     `;
//     return database.executar(sql);
// };

// const listarFabricasPorModelo = (empresaId, modelo) => {
//     const sql = `
//         SELECT 
//             fc.nome AS fabrica_nome,
//             COUNT(DISTINCT a.id) as quantidade_alertas
//         FROM plc p
//         JOIN setor_fabrica sf ON p.setor_fabrica_id = sf.id
//         JOIN fabrica_consumidor fc ON sf.fabrica_consumidor_id = fc.id
//         LEFT JOIN config_plc cp ON cp.plc_id = p.id
//         LEFT JOIN alerta a ON a.config_plc_id = cp.id
//         WHERE fc.empresa_consumidor_id = ${empresaId}
//         AND p.modelo = '${modelo}'
//         GROUP BY fc.id, fc.nome
//         ORDER BY quantidade_alertas DESC;
//     `;
    
//     return database.executar(sql);
// };

module.exports = { 
    // listarPlcsPorFabricante,
    // listarModeloPorEmpresa,
    listarEmpresasConsumidoras, 
    listarFabricaSetores, 
    // listarPlcsPorFabrica, 
    // setoresPorPlc, 
    // setoresPorPlcFabrica, 
    // listarFabricasMaisAlertas,
    // setoresPorModelo,
    // listarFabricasPorModelo
};