const database = require("../database/config")


function getEmpresa() {
    const sql = "SELECT * from empresa_consumidor"

    return database.executar(sql);
}

function getFabrica() {
    const sql = "SELECT * from fabrica_consumidor"

    return database.executar(sql);
}

function cadastrar(empresa, fabrica, nomeSetor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", empresa, fabrica, nomeSetor);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
      instrucaoSql = `
        INSERT INTO setor_fabrica(nome, fabrica_consumidor_id) VALUES ('${nomeSetor}', '${fabrica}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    getEmpresa,
    getFabrica
};

