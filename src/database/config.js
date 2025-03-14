var mysql = require("mysql2");

// settar variáveis de conexão com o mysql

const selectConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_SELECT_USER,
    password: process.env.DB_SELECT_PASSWORD,
    port: process.env.DB_PORT
};

const insertConfig ={
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_INSERT_USER,
    password: process.env.DB_INSERT_PASSWORD,
    port: process.env.DB_PORT
};

const updateConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_UPDATE_USER,
    password: process.env.DB_UPDATE_PASSWORD,
    port: process.env.DB_PORT
};

const deleteConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_DELETE_USER,
    password: process.env.DB_DELETE_PASSWORD,
    port: process.env.DB_PORT
};

function selecionar(instrucao){
    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(selectConfig);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            return ("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

function inserir(instrucao){
    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(insertConfig);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            return ("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

function atualizar(instrucao){
    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(updateConfig);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            return ("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

function apagar(instrucao){
    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(deleteConfig);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            return ("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

module.exports = {
    selecionar,
    inserir,
    apagar,
    atualizar
};