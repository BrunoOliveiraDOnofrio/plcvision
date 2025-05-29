const database = require('../database/config')

function getEmpresaMaisAfetada(empresaId){

    const sql= `
    SELECT * FROM vw_empresa_com_mais_alertas;
    ` 

    console.log(sql);
    return database.executar(sql);
}


module.exports = {
    getEmpresaMaisAfetada
}