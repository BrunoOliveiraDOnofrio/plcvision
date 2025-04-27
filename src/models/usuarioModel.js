const { destroy, listarPorEmpresa } = require("../controllers/usuarioController");
var database = require("../database/config")

function get(){
    const sql = `SELECT * FROM usuario`;

    return database.executar(sql)
}

function getById(id) {
    const instrucao = `
        SELECT id, nome, email, telCelular, setor, nivel, cargo
        FROM usuario
        WHERE id = ${id};
    `;
    return database.executar(instrucao).then(resultados => resultados[0]);
}

function listarMesmaEmpresa(empresaId) {
    const instrucao = `
        SELECT id, nome, email, setor, cargo, telCelular, nivel
        FROM usuario 
        WHERE empresa_id = ${empresaId};
    `;
    return database.executar(instrucao);
}

function update(dados, id) {
    const sql = `
        UPDATE usuario 
        SET nome = '${dados.nome}', email = '${dados.email}', setor = '${dados.setor}', cargo = '${dados.cargo}', nivel = '${dados.nivel}', telCelular = '${dados.celular}'
            WHERE id = ${id};
    `;
    return database.executar(sql);
}

async function autenticar(email, senha) {
    const instrucao = `
        SELECT usuario.id as id,empresa_id,ef.razao_social, nome, email,telCelular,setor,cargo, nivel
        FROM usuario JOIN empresa_fabricante ef
        ON usuario.empresa_id = ef.id

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
        DELETE FROM usuario WHERE id = ${id};
    `;
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar,
    get,
    getById,
    update,
    deleteUsuario,
    listarMesmaEmpresa
};