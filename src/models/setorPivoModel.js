const database = require('../database/config')

const getByFabricaId = (id) => {
    const sql = `select * from setor_fabrica 
                where fabrica_consumidor_id = ${id}`
    return database.executar(sql)
}


module.exports = {
    getByFabricaId
}