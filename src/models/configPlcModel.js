const database = require('../database/config')

const checkIfExists = (plc_ic, componente_id) => {
    const sql = `SELECT id FROM config_plc WHERE plc_id = ${plc_ic} and componente_id = ${componente_id}`
    return database.executar(sql)
}

const desativar = (id) => {
    const sql = `UPDATE config_plc SET ativo = 0 WHERE id = ${id}`
    return database.executar(sql)
}   

const create = (data) => {
    const sql = `INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, padrao) VALUES (${data.componente_id}, ${data.plc_id}, ${data.limite_atencao}, ${data.limite_critico}, ${data.padrao})`;
    return database.executar(sql)
}

const update = (data, ativo) => { 
    const sql = `UPDATE config_plc SET limite_atencao = ${data.limite_atencao}, limite_critico = ${data.limite_critico}, ativo = ${ativo} WHERE id = ${data.id}`
    return database.executar(sql)
}

const getDefaultsFabrica = (fabricaId) => {
    const sql = `SELECT * FROM config_plc WHERE fabrica_consumidor_id = ${fabricaId}`
    return database.executar(sql)
}

module.exports = {
    create,
    checkIfExists,
    getDefaultsFabrica,
    update,
    desativar
}