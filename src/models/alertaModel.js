const database = require("../database/config")


const getAlertasNasUltimas24Horas = (empresaId) => {
    const sql = `SELECT COUNT(a.id) as qtdAlertas, ec.razao_social, ec.id as empresaId FROM alerta AS a
                JOIN config_plc cp
                ON cp.id = a.config_plc_id
                JOIN plc p
                ON p.id = cp.plc_id
                JOIN parceria par
                ON par.id = p.parceria_id
                JOIN empresa_consumidor ec
                ON ec.id = par.empresa_consumidor_id
                WHERE par.empresa_fabricante_id = ${empresaId} AND
                (dataHora BETWEEN date_sub(now(), INTERVAL 24 HOUR ) AND now())
                GROUP BY ec.id`
    return database.executar(sql)
}

const getUltimoAlerta = (dataHora, plcId) => {
    const sql = `SELECT a.id, a.criticidade, a.dataHora, a.tipo_valor, a.valor_capturado from alerta as a
    JOIN config_plc cp
    ON cp.id = a.config_plc_id
     WHERE cp.plc_id = ${plcId} AND dataHora >
'${dataHora}' ORDER BY dataHora asc LIMIT 1; `;
    return database.executar(sql)
}

const create = (dados) =>{
    const sql = `INSERT INTO alerta (criticidade, dataHora, status, valor_capturado, tipo_valor, config_plc_id) VALUES ('${dados.criticidade}', '${dados.dataHora}', 'Aberto', ${dados.valor_capturado}, '${dados.tipo_valor}', ${dados.config_plc_id})`;
    console.log(sql)
    return database.executar(sql)
}

// kkkkkkk
const insertedInTheLastTenMinutes = (config_id) =>{
    const sql = `SELECT COUNT(*) as alertas FROM alerta 
WHERE config_plc_id = ${config_id} and 
dataHora BETWEEN date_sub(now(), interval 20 second) AND now();`
    return database.executar(sql)
}

const nomeFabrica = (fabrica_id) =>{
    const sql = `SELECT nome FROM fabrica_consumidor WHERE id = ${fabrica_id};`
    return database.executar(sql)
}

const nomeSetor = (plc_id) => {
    const sql = `SELECT setor_fabrica.nome FROM plc JOIN setor_fabrica ON plc.setor_fabrica_id = setor_fabrica.id WHERE plc.id = ${plc_id};`
    return database.executar(sql)

}

const qtdAlertaHardware = () => {
    const sql = `SELECT tipo, COUNT(*) AS total
    FROM (
    SELECT 
        CASE 
        WHEN tipo_valor LIKE '%CPU%' THEN 'CPU'
        WHEN tipo_valor LIKE '%RAM%' THEN 'RAM'
        WHEN tipo_valor LIKE '%REDE%' THEN 'REDE'
        WHEN tipo_valor LIKE '%Bateria%' THEN 'BATERIA'
        END AS tipo
    FROM alerta
    ) AS tipos_alerta GROUP BY tipo ORDER BY total DESC LIMIT 1;`
     return database.executar(sql)
}

module.exports = {
    create,
    insertedInTheLastTenMinutes,
    getUltimoAlerta,
    nomeFabrica,
    nomeSetor,
    getAlertasNasUltimas24Horas,
    getAlertasNasUltimas24Horas,
    qtdAlertaHardware
};