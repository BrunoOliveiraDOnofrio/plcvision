const consumidorModel = require("../models/consumidorModel");

const getByToken = (req, res) => {
    const id = req.params.id
    const token = req.body.token

    consumidorModel.getByToken(token, id).then(response => {
        if(response.length == 0){
            res.status(400).json({
                error : "Token incorreto ou parceria inexistente"
            })
            return
        }
        res.status(200).json({
            empresa: response[0],
            message: "OK"
        })
    }).catch(e => {
        res.status(500).json({
            error : "Erro ao buscar empresa consumidora"
        })
    })
}

module.exports = {
    getByToken
};