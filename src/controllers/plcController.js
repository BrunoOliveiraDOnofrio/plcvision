// const industriaModel = require("../models/industriaModel");
// const empresaModel = require("../models/empresaModel");
 const plcModel = require("../models/plcModel");
// const { get } = require("../routes/plc");
// para cadastrar um plc especifico, precisa fk da industria e da empresa

//function funcao(req, res) {
    // fazer algo
//}
function get(req, res){
    plcModel.get().then(response => {
        res.json(response)
    }).catch(e => {
        console.log(e)
        res.json(e)
    })
}

module.exports = {
    get
};