const setor_registerModel = require("../models/setor_registerModel");

function store(req, res) {
    const { nome, fkFabrica } = req.body;

    if (!nome || !fkFabrica) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const dados = {
        nome: nome,
        fkFabrica: fkFabrica
    }

     setor_registerModel.cadastrarSetor(dados)
            .then(response => {
                console.log("Setor cadastrado:", response);
                res.status(201).json({ message: "Setor cadastrado com sucesso!", response });
            })
            .catch(error => {
                console.error("Erro ao cadastrar Setor:", error);
                res.status(500).json({ error: "Erro ao cadastrar Setor." });
            });
}

function deletarSetor(req, res) {
    const id = req.params.id;

    setor_registerModel.deletarSetor(id)
        .then(() => {
            res.status(200).json({ message: "Setor removido com sucesso!" });
        })
        .catch(error => {
            console.error("Erro ao remover Setor:", error);
            res.status(500).json({ error: "Erro ao remover Setor." });
        });
}

function listarSetorFabrica(req, res) {
    const fabricaId = req.params.fabricaId;

    if (!fabricaId) {
        return res.status(400).json({ error: "ID da fábrica não fornecido." });
    }

    setor_registerModel.listarSetorFabrica(fabricaId)
        .then(setor => {
            res.status(200).json(setor);
        })
        .catch(error => {
            console.error("Erro ao listar setores por fábrica:", error);
            res.status(500).json({ error: "Erro ao listar setor por fábrica." });
        });
}

function atualizarSetor(req, res) {
    const id = req.params.id;
    const dados = req.body;

    setor_registerModel.atualizarSetor(dados, id)
        .then(() => {
            res.status(200).json({ message: "Setor atualizado com sucesso!" });
        })
        .catch(error => {
            console.error("Erro ao atualizar Setor:", error);
            res.status(500).json({ error: "Erro ao atualizar Setor." });
        });
}


module.exports = {
    store,
    deletarSetor,
    listarSetorFabrica,
    atualizarSetor
};