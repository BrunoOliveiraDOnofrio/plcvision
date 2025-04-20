const { response } = require("express");
const fabricaModel = require("../models/fabricaModel");


const getByEmpresaId = (req, res) => {
    const empresaId = req.params.empresaId

    fabricaModel.getByEmpresaId(empresaId).then(response => {
        if(response.length == 0){
            res.status(400).json({
                error: "Esta empresa não tem fábricas cadastradas"
            })
            return
        }
        res.status(200).json({
            fabricas: response
        })
    }).catch(e => {
        res.status(500).json({
            error: "Erro ao buscar fábricas"
        })
    })
}

function getEmpresa(req, res){
    fabricaModel.getEmpresa().then(response => {
        res.json(response)
    }).catch(e => {
        console.log(e)
        res.json(e)
    });
}

function getFabricas(req, res){
    fabricaModel.getFabricas().then(response => {
        res.json(response)
    }).catch(e => {
        console.log(e)
        res.json(e)
    })
}

function getNomeEmpresa(req, res){
    const id = req.params.id;

    fabricaModel.getNomeEmpresa(id).then(response => {
        res.json(response)
    }).catch(e => {
        console.log(e)
        res.json(e)
    })
}

async function cadastrar(req, res){
    // pegar os campos
    let empresa = req.body.empresaServer;
    let fabrica = req.body.fabricaServer;
    let qtdSetor = req.body.qtdSetorServer;
    // Dados do endereço
    let logradouro = req.body.logradouroServer;
    let numero = req.body.numeroServer;
    let bairro = req.body.bairroServer;
    let cidade = req.body.cidadeServer;
    let estado = req.body.estadoServer;
    let complemento = req.body.complementoServer;

    // Abertura para validações
// if(numero > 0){}
    // Abertura para validaçõse

    const cadEndereco = await fabricaModel.cadastraEndereco(logradouro, numero, bairro, cidade, estado, complemento);

    endereco_id = cadEndereco.insertId;

    fabricaModel.cadastrar(empresa, fabrica, endereco_id, qtdSetor).then(response => {
        res.json(response);
    }).catch(e =>{
        console.log(e),
        res.json(e)
    })

}

function atualizar(req, res){
    // pegar os campos
    let nomeFabrica = req.body.input_fabrica;
    let qtdSetor = req.body.input_qtdSetor;

    fabricaModel.atualizar(nomeFabrica, qtdSetor).then(response => {
        res.json(response);

    }).catch(e =>{
        console.log(e),
        res.json(e)
    })
}

module.exports = {
    getEmpresa,
    getFabricas,
    cadastrar,
    atualizar,
    getNomeEmpresa,
    getByEmpresaId
};