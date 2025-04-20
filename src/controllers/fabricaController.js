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

function cadastrar(req, res){
    // pegar os campos
    let nomeEmpresa = req.body.select_empresa;
    let nomeFabrica = req.body.input_fabrica;
    let qtdSetor = req.body.input_qtdSetor;

    // Abertura para validações
// if(numero > 0){}
    // Abertura para validaçõse

    const dados = {
        nomeEmpresa: nomeEmpresa,
        nomeFabrica: nomeFabrica,
        qtdSetor: qtdSetor
    }

    fabricaModel.cadastrar(nomeEmpresa, nomeFabrica, qtdSetor).then(response => {
        res.json(response);

        const lastInsertedId = response.lastInsertedId;
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
    getByEmpresaId
};