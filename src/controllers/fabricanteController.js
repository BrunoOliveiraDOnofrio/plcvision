const fabricanteModel = require("../models/fabricanteModel");

//function funcao(req, res) {
    // fazer algo
//}

function store(req, res){
    const { cnpj, razao_social, estado, cidade, bairro, logradouro, numero, complemento} = req.body

    if (!cnpj || !razao_social) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }
    
    // console.log(req.body)
    //possiveis validações

    //mandar pro model o obj
    const dados = {
        razao_social: razao_social,
        cnpj: cnpj,
        estado: estado,
        cidade: cidade,
        bairro: bairro,
        logradouro: logradouro,
        numero: numero,
        complemento: complemento
    };

    fabricanteModel.create(dados)
        .then(response => {
            console.log("Fabricante cadastrado:", response);
            res.status(201).json({ message: "Fabricante cadastrado com sucesso!", response });
        })
        .catch(error => {
            console.error("Erro ao cadastrar fabricante:", error);
            res.status(500).json({ error: "Erro ao cadastrar fabricante." });
        });
}

function getById(req, res) {
    const id = req.params.id;

    fabricanteModel.getById(id)
        .then(fabricante => {
            if (fabricante) {
                res.status(200).json(fabricante);
            } else {
                res.status(404).json({ error: "Usuário não encontrado." });
            }
        })
        .catch(error => {
            console.error("Erro ao buscar usuário:", error);
            res.status(500).json({ error: "Erro ao buscar usuário." });
        });
}


// function index(req, res) {
//     try {
//         const fabricantes = fabricanteModel.listarTudo();
//         res.status(200).json(fabricantes);
//     } catch (error) {
//         console.error("Erro ao listar fabricantes:", error);
//         res.status(500).json({ error: "Erro ao listar fabricantes." });
//     }
// }

async function destroy(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "ID da fabricante é obrigatório." });
    }

    try {
        const resultado = await fabricanteModel.delete(id);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Fabricante não encontrada." });
        }
        res.status(200).json({ message: "Fabricante excluída com sucesso." });
    } catch (error) {
        console.error("Erro ao excluir fabricante:", error);
        res.status(500).json({ error: "Erro ao excluir fabricante." });
    }
}

async function testarDados(req, res) {
    try {
        const dados = req.body; // Captura os dados enviados no corpo da requisição
        console.log("Dados recebidos para teste:", dados);
        res.status(200).json({ message: "Dados recebidos com sucesso!", dados });
    } catch (error) {
        console.error("Erro ao testar dados:", error);
        res.status(500).json({ error: "Erro ao testar dados." });
    }
}

function listarFabricantes(req, res) {
    fabricanteModel.listar()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            console.error("Erro ao listar fabricantes:", error);
            res.status(500).json({ error: "Erro ao listar fabricantes." });
        });
}

module.exports = {
    store,
    getById,
    // index,
    destroy,
    testarDados,
    listarFabricantes
};