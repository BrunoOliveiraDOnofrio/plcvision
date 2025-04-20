const model = require('../models/setorPivoModel')

const getByFabricaId = (req, res) => {
    const id = req.params.fabricaId;


    
    model.getByFabricaId(id).then(response  => {
        if(response.length == 0){
            res.status(400).json({
                error: "Essa fábrica não tem setores cadastrados"
            })
            return 
        }
        res.status(200).json({
            setores: response
        })
    }).catch(e => {
        res.status(500).json({
            error: "Erro ao buscar setores"
        });
    })
}

module.exports = {
    getByFabricaId
}