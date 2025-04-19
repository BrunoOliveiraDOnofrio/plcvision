const fabricaModel = require("../models/fabricaModel");

function getEmpresa(req, res){
    fabricaModel.getEmpresa().then(response => {
        res.json(response)
    }).catch(e => {
        console.log(e)
        res.json(e)
    });
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

module.exports = {
    getEmpresa,
    cadastrar
};