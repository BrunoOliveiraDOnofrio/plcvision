const database = require('../database/config');

const createEndereco = (endereco) => {
    const sql = `INSERT INTO endereco ( logradouro, numLogradouro,complemento, bairro, cidade, estado) VALUES ( '${endereco.logradouro}', '${endereco.numLogradouro}', '${endereco.complemento}', '${endereco.bairro}', '${endereco.cidade}', '${endereco.estado}')`;
    return database.executar(sql)


}

const updateEndereco = (endereco) => {
    const sql = `UPDATE endereco SET logradouro = '${endereco.logradouro}', numLogradouro = '${endereco.numLogradouro}', complemento = '${endereco.complemento}', bairro = '${endereco.bairro}', cidade = '${endereco.cidade}', estado = '${endereco.estado}' WHERE id = ${endereco.endereco_id}`;
    return database.executar(sql)
}

module.exports = {
    createEndereco,
    updateEndereco
}