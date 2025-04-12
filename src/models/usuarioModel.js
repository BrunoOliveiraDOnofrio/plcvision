var database = require("../database/config")

function get(){
    const sql = `SELECT * FROM usuario`;

    return database.executar(sql)
}

function update(dados, id){
    const sql = `UPDATE usuario SET nome = '${dados.nome}',
    setor = '${dados.setor}',
    email = '${dados.email}',
    cargo = '${dados.cargo}',
    nivel = '${dados.nivel}',
    telCelular = '${dados.telCelular}'
    WHERE id = ${id}`
    return database.executar(sql)
}






function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
        SELECT idUsuario, nome, nivel, fkEmpresa FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.selecionar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a instrucaoSql
function cadastrar(nome, email, telCelular, senha, nivel, setor, cargo, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    const instrucaoSql = `
        INSERT INTO usuario (nome, email, telCelular, senha, nivel, setor, cargo, fkEmpresa) VALUES ('${nome}', '${email}', '${telCelular}',  '${senha}', '${nivel}', '${setor}', '${cargo}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.inserir(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    get,
    update
};