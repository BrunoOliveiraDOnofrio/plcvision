const database = require("../database/config")

//function cadastrar(fkEmpresa, fkIndustria, ...) {
    // query = "alguma query sql cm as fks";
    // return database.executar(query);
//}
function get(){
    const sql = `SELECT * FROM plc`;

    return database.executar(sql)
}


module.exports = {
    get
};