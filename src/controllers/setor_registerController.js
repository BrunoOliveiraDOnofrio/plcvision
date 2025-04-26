const setor_registerModel = require("../models/setor_registerModel");

async function cadastrarSetor(req, res) {
    const { fabrica_id, nome } = req.body;

    if (!fabrica_id || !nome) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const dados = {
        fabrica_id: fabrica_id,
        nome: nome
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
    const id = req.params.id;
    console.log(id)
    if (id == null) {
        return res.status(400).json({ error: "ID da fábrica não fornecido." });
    }

    setor_registerModel.listarSetorFabrica(id)
        .then(setor => {
            res.status(200).json(setor);
        })
        .catch(error => {
            console.error("Erro ao listar setores por fábrica:", error);
            res.status(500).json({ error: "Erro ao listar setor por fábrica." });
        });
}

function pegarNomeFabrica(req, res) {
    const id = req.params.id;
    console.log(id);

    setor_registerModel.pegarNomeFabrica(id)
        .then(setor => {
            res.status(200).json(setor);
        })
        .catch(error => {
            console.error("Erro ao pegar nome da fábrica:", error);
            res.status(500).json({ error: "Erro ao pegar nome da fábrica." });
        })
}

function pegarIdFabrica(req, res) {
    const id = req.params.id;
    console.log(id)

    setor_registerModel.pegarIdFabrica(id)
    .then(setor => {
        res.status(200).json(setor);
    })
    .catch(error => {
        console.error("Erro ao pegar id da fábrica:", error);
        res.status(500).json({ error: "Erro ao pegar id da fábrica." });
    })
}

function pegaFabrica(req, res) {
    const id = req.params.id;
    
    setor_registerModel.pegaFabrica(id)
    .then(setor => {
        res.status(200).json(setor);
    })
    .catch(error => {
        console.error("Erro ao pegar fábrica:", error);
        res.status(500).json({ error: "Erro ao pegar fábrica." });
    })
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


function obterSetorPorId(req, res) {
    const id = req.params.id;
    setor_registerModel.obterSetorPorId(id)
      .then(resultado => {
        if (resultado.length === 0) {
          return res.status(404).json({ error: 'Setor não encontrado.' });
        }
        const row = resultado[0];
        res.json({
          id: row.id,
          nome: row.nome,
          fkFabrica: row.fabrica_consumidor_id,
        });
      })
      .catch(error => {
        console.error('Erro ao buscar setor:', error);
        res.status(500).json({ error: 'Erro ao buscar setor.' });
      });
}

function buscarFabricaPorSetor(req, res) {
    const setorId = req.params.id;
    
    setor_registerModel.buscarFabricaPorSetor(setorId)
        .then(resultado => {
            res.status(200).json(resultado);
        })
        .catch(error => {
            console.error("Erro ao buscar fábrica do setor:", error);
            res.status(500).json({ error: "Erro ao buscar fábrica." });
        });
}

module.exports = {
    cadastrarSetor,
    deletarSetor,
    listarSetorFabrica,
    atualizarSetor,
    pegarNomeFabrica,
    pegarIdFabrica,
    pegaFabrica,
    obterSetorPorId,
    buscarFabricaPorSetor
};