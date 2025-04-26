const database = require('../database/config')

const get = () => {
    const sql = `SELECT * FROM componente`;
    return database.executar(sql)
}

module.exports = {
    get
}