const database = require("../database/config")



function create(dados) {
    const sql = `INSERT INTO empresa_fabricante (cnpj,razao_social, endereco_id, qtdParcerias) VALUES ('${dados.cnpj}', '${dados.razao_social}', 1, 0)`;
    return database.executar(sql);
}


module.exports = {
    create
};