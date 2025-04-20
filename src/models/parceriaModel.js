const database = require("../database/config")

const store = (data) => {   
    const sql = `INSERT INTO parceria (empresa_fabricante_id, empresa_consumidor_id, dataParceria, qtdPlc) VALUES (${data.empresa_fabricante_id}, ${data.empresa_consumidor_id}, now(), 0)`
    return database.executar(sql)
}

module.exports = {
    store
}