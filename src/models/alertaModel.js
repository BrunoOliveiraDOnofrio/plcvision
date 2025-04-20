const database = require("../database/config")

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
    insertedInTheLastTenMinutes
};