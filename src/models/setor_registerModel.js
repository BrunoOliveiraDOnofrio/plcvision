const database = require("../database/config");

async function getNumPlc(fkSetor) {
    const instrucao = `SELECT COUNT(setor_fabrica_id) FROM plc
                       WHERE setor_fabrica_id = ${fkSetor}`

    return database.executar(instrucao);
}

    function cadastrarSetor(dados) {
        
        const { fabrica_id, nome } = dados;

        const instrucao = `INSERT INTO setor_fabrica(nome, fabrica_consumidor_id) VALUES
                        ('${nome}', ${fabrica_id});`

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

function pegarNomeFabrica(empresa_id) {
    const instrucao = `SELECT nome, id FROM fabrica_consumidor WHERE empresa_consumidor_id = ${empresa_id};`

    return database.executar(instrucao);
}

function pegarIdFabrica(id) {
    const instrucao = `SELECT * FROM setor_fabrica WHERE fabrica_consumidor_id = "${id}";`

    return database.executar(instrucao);
}

function pegaFabrica(id){
    const instrucao = `SELECT * FROM fabrica_consumidor WHERE id = ${id};` 

    return database.executar(instrucao);
}

function atualizarSetor(dados, id) {
    const instrucao = `UPDATE setor_fabrica
                       SET nome = '${dados.nome}', fabrica_consumidor_id = ${dados.fkFabrica}
                       WHERE id = ${id};`

    return database.executar(instrucao);
}

function buscarFabricaPorSetor(setorId){
    const instrucao = `SELECT f.* FROM fabrica_consumidor f JOIN setor_fabrica s ON s.id = ${setorId} AND f.id = s.fabrica_consumidor_id`;
    
    return database.executar(instrucao);
}

function obterSetorPorId(id) {
    const instrucao = `
      SELECT id, nome, fabrica_consumidor_id 
      FROM setor_fabrica
      WHERE id = ${id};
    `;
    return database.executar(instrucao);
}
  

module.exports = {
    cadastrarSetor,
    deletarSetor,
    listarSetorFabrica,
    atualizarSetor,
    getNumPlc,
    pegarNomeFabrica,
    pegarIdFabrica,
    pegaFabrica,
    obterSetorPorId,
    buscarFabricaPorSetor
};

