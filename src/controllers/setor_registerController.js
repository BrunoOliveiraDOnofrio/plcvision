const setor_registerModel = require("../models/setor_registerModel");

function cadastrar(req, res) {

    var empresa = req.body.empresaServer;
    var fabrica = req.body.fabricaServer;
    var nomeSetor = req.body.nomeSetorServer;

    if(nomeSetor == undefined) {
        res.status(400).send("Nome do Setor está vazio")
    } else {
        setor_registerModel.cadastrar(empresa, fabrica, nomeSetor)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

module.exports = {
    cadastrar
}