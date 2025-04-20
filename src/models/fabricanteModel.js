const database = require("../database/config");

async function create(dados) {
    try {
        const { cnpj, razao_social, estado, cidade, bairro, logradouro, numero, complemento } = dados;

        const instrucaoEndereco = `
            INSERT INTO endereco (estado, cidade, bairro, logradouro, numLogradouro, complemento)
            VALUES ('${estado}', '${cidade}', '${bairro}', '${logradouro}', '${numero}', '${complemento}');
        `;
        console.log("Executando query de inserção de endereço:", instrucaoEndereco);
        const enderecoResult = await database.inserir(instrucaoEndereco);
        console.log("Resultado da inserção do endereço:", enderecoResult);

        const fkEndereco = enderecoResult.insertId;

        const instrucaoFabricante = `
            INSERT INTO empresa_fabricante (cnpj, razao_social, endereco_id, status)
            VALUES ('${cnpj}', '${razao_social}', ${fkEndereco}, 1);
        `;

        console.log("Executando query de inserção de fabricante:", instrucaoFabricante);
        const fabricanteResult = await database.inserir(instrucaoFabricante);
        console.log("Resultado da inserção do fabricante:", fabricanteResult);

        return fabricanteResult;
    } catch (error) {
        console.error("Erro ao cadastrar fabricante e endereço:", error);
        throw error;
    }
}

function listarTudo() {
    const instrucao = `SELECT id, cnpj, razao_social FROM empresa_fabricante;`;
    try {
        const resultados = database.executar(instrucao);
        return resultados;
    } catch (error) {
        console.error("Erro ao listar fabricantes:", error);
        throw error;
    }
}

function listar() {
    const instrucao = `
        SELECT id, razao_social, cnpj, endereco_id FROM empresa_fabricante WHERE status = 1;
    `;
    return database.executar(instrucao);
}

async function deleteFabricante(id) {
    const instrucao = `
        UPDATE empresa_fabricante SET status = 0 WHERE id = ${id};
    `;
    return database.executar(instrucao);
}

function getById(id) {
    const instrucao = `
        select f.*, e.* from empresa_fabricante as f join endereco as e on f.endereco_id = e.id where f.id = ${id};
    `;
    return database.executar(instrucao).then(resultados => resultados[0]);
}

module.exports = {
    create,
    listarTudo,
    listar,
    delete: deleteFabricante,
    getById
};