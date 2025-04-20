const alertaModel = require("../models/alertaModel");
// qnd ocorrer algum alerta, vai cadastar os dados e o alerta logo em seguida
const dadosModel = require("../models/dadosModel");

const store = (req,res) => {
    console.log(req.body)

    // verificar se existe um alerta nos ultimos 10 minutos com a mesma configuracao_id

    alertaModel.insertedInTheLastTenMinutes(req.body.config_plc_id).then(response => {
        
        if(response[0].alertas > 0){
            res.status(200).json({
                error: "Alerta já criado"
            })
        }else{
            
        
            alertaModel.create(req.body).then(response => {
                console.log(response)
                res.status(200).json({
                    message: "Alerta Inserido",
                    out: response
                })
            }).catch(e => {
                res.status(500).json({
                    error: "Erro ao inserir alerta",
                    e: e
                })
            })
        }
    })

}
module.exports = {
    store
};