const { destroy } = require("../controllers/usuarioController");
var database = require("../database/config")

function get(){
    const sql = `SELECT * FROM usuario`;

    return database.executar(sql)
}

function getById(id) {
    const instrucao = `
        SELECT idUsuario, nome, email, telCelular, setor, nivel, cargo
        FROM usuario
        WHERE idUsuario = ${id};
    `;
    return database.executar(instrucao).then(resultados => resultados[0]);
}

function update(dados, id){
    const sql = `UPDATE usuario SET nome = '${dados.nome}',
    setor = '${dados.setor}',
    email = '${dados.email}',
    cargo = '${dados.cargo}',
    nivel = '${dados.nivel}',
    telCelular = '${dados.telCelular}'
    WHERE idUsuario = ${id}`
    return database.executar(sql)
}

async function autenticar(email, senha) {
    const instrucao = `
        SELECT id,empresa_id, nome, email,telCelular,setor,cargo, nivel
        FROM usuario
        WHERE email = '${email}' AND senha = '${senha}';
    `;

    console.log("Executando a query:", instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a instrucaoSql
async function cadastrar(dados) {
    const { nome, email, celular, senha, nivel, setor, cargo, fkFabricante } = dados;

    const instrucao = `
        INSERT INTO usuario (nome, email, telCelular, senha, nivel, setor, cargo, empresa_id)
        VALUES ('${nome}', '${email}', '${celular}', '${senha}', ${nivel}, '${setor}', '${cargo}', ${fkFabricante});
    `;

    console.log("Executando query:", instrucao);

    return database.executar(instrucao);
}

function deleteUsuario(id) {
    const instrucao = `
        DELETE FROM usuario WHERE idUsuario = ${id};
    `;
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar,
    get,
    getById,
    update,
    deleteUsuario
};