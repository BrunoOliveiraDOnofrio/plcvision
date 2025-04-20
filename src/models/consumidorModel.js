const database = require("../database/config")

const getByToken = (token, id) => {
    const sql = `SELECT ec.id, ec.razao_social, p.id as parceriaId from usuario as u
                join empresa_fabricante ef
                on ef.id = u.empresa_id
                join parceria p
                on p.empresa_fabricante_id = ef.id
                join empresa_consumidor ec
                on ec.id = p.empresa_consumidor_id
                where token = '${token}' and u.id = ${id};`
    return database.executar(sql)
}

module.exports = {
    getByToken
}