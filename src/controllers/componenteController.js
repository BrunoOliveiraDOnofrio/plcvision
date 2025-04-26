const model = require('../models/componenteModel')


const get = (req,res) => {
    model.get().then(response => {
        res.status(200).json(response)
    }).catch(e => {
        res.status(500).json({
            error: "Erro ao buscar componentes",
            e: e
        })
    })
}

module.exports = {
    get
}