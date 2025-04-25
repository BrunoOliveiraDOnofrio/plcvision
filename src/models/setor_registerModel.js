const database = require("../database/config");

async function getNumPlc(fkSetor) {
    const instrucao = `SELECT COUNT(setor_fabrica_id) FROM plc
                       WHERE setor_fabrica_id = ${fkSetor}`

    return database.executar(instrucao);
}

async function cadastrarSetor(dados) {
    
    const { nome, fkFabrica } = dados;

    const instrucao = `INSERT INTO setor_fabrica(nome, fabrica_consumidor_id) VALUES
                      ('${nome}', ${fkFabrica});`

    return database.executar(instrucao);
}

function deletarSetor(id) {
    const instrucao = `DELETE FROM setor_fabrica
                       WHERE id = ${id};`

    return database.executar(instrucao);
}


function listarSetorFabrica(id) {
    const instrucao = `SELECT id, nome, qtdPlc FROM setor_fabrica
                       WHERE fabrica_consumidor_id = ${id};`

    return database.executar(instrucao);
}

function pegarNomeFabrica(id) {
    const instrucao = `SELECT nome, id FROM fabrica_consumidor WHERE empresa_consumidor_id = ${id};`

    return database.executar(instrucao);
}

function pegarIdFabrica(id) {
    const instrucao = `SELECT * FROM setor_fabrica WHERE fabrica_consumidor_id = "${id}";`

    return database.executar(instrucao);
}

function atualizarSetor(dados, id) {
    const instrucao = `UPDATE setor_fabrica
                       SET nome = '${dados.nome}', fabrica_consumidor_id = ${dados.fkFabrica}, qtdPlc = ${dados.qtdPLC}
                       WHERE id = ${id};`

    return database.executar(instrucao);
}



module.exports = {
    cadastrarSetor,
    deletarSetor,
    listarSetorFabrica,
    atualizarSetor,
    getNumPlc,
    pegarNomeFabrica,
    pegarIdFabrica
};

