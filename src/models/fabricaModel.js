const database = require("../database/config");


const getByEmpresaId = empresaId => {
    const sql = `select fc.id as fabrica_id, fc.nome, e.logradouro, e.numLogradouro, e.cidade, e.estado, e.bairro from fabrica_consumidor as fc
                join  endereco e 
                on fc.endereco_id = e.id
                where empresa_consumidor_id = ${empresaId};`
    return database.executar(sql)
}

function getEmpresa(){
    const sql = `SELECT * FROM empresa_consumidor`;

    return database.executar(sql);
}

function getFabricas(){
    const sql = `SELECT * FROM fabrica_consumidor`;   

    return database.executar(sql);
}

function getNomeEmpresa(empresa_consumidor_id){
    const sql = `SELECT razao_social FROM empresa_consumidor where id = ${empresa_consumidor_id};`;

    return database.executar(sql);
}

function cadastraEndereco(logradouro, numero, bairro, cidade, estado, complemento){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    const instrucaoSql = `INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES ('${logradouro}', '${numero}', '${cidade}', '${estado}', '${bairro}', '${complemento}')`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.inserir(instrucaoSql);
}

async function cadastrar(empresa, fabrica, endereco_id, qtdSetor){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    const sql = `SELECT id FROM empresa_consumidor WHERE razao_social = '${empresa}'`;

    const resultado = await database.selecionar(sql);

    const idEmpresa = resultado[0].id;

    const instrucaoSql = `
        INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES ('${fabrica}', '${idEmpresa}', '${endereco_id}', '${qtdSetor}');
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.inserir(instrucaoSql);
}

function atualizar(){
    const sql = ``;
}

// SELECT id FROM empresa_consumidor WHERE razao_social = '${dados.nomeEmpresa}' 
// pegar o ID da empresa_consumidor cadastrado
module.exports = {
    getEmpresa,
    getFabricas,
    cadastraEndereco,
    cadastrar,
    atualizar,
    getNomeEmpresa,
    getByEmpresaId
};