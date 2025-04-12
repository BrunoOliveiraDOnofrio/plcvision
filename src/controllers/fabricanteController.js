const fabricanteModel = require("../models/fabricanteModel");

//function funcao(req, res) {
    // fazer algo
//}

function store(req, res){
    // pegar os campos
    let cnpj = req.body.cnpj;
    let razao = req.body.razao_social;
    // console.log(req.body)
    //possiveis validações

    

    //mandar pro model o obj
    const dados = {
        cnpj: cnpj,
        razao_social: razao
    }

    fabricanteModel.create(dados).then(response => {
        console.log(response)
        res.json(response)

        const lastInsertedId = response.lastInsertedId

         
    }).catch(e => {
        console.log(e)
        res.json(e)
    })
}



module.exports = {
    store
};