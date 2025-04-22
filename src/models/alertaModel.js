const database = require("../database/config")

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
dataHora BETWEEN date_sub(now(), interval 10 minute) AND now();`
    return database.executar(sql)
}


module.exports = {
    create,
    insertedInTheLastTenMinutes,
    getUltimoAlerta
};