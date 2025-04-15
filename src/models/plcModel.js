const database = require("../database/config")

//function cadastrar(fkEmpresa, fkIndustria, ...) {
    // query = "alguma query sql cm as fks";
    // return database.executar(query);
//}
function get(){
    const sql = `SELECT * FROM plc`;

    return database.executar(sql)
}

function listarUm(){
    const sql = `SELECT * FROM plc WHERE id = ${sessionStorage.plcID}`
}

module.exports = {
    get
};