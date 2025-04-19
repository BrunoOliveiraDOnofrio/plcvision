const database = require("../database/config");

function getEmpresa(){
    const sql = `SELECT * FROM empresa_consumidor`;

    return database.executar(sql);
}

async function cadastrar(nomeEmpresa, nomeFabrica, qtdSetor){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    const sql = `SELECT id FROM empresa_consumidor WHERE razao_social = '${nomeEmpresa}'`;

    const resultado = await database.selecionar(sql);

    const idEmpresa = resultado[0].id;

    const instrucaoSql = `
        INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES ('${nomeFabrica}', '${idEmpresa}', 3, '${qtdSetor}');
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.inserir(instrucaoSql);
}

// SELECT id FROM empresa_consumidor WHERE razao_social = '${dados.nomeEmpresa}' 
// pegar o ID da empresa_consumidor cadastrado
module.exports = {
    getEmpresa,
    cadastrar
};