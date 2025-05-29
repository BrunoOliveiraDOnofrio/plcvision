const database = require('../database/config')

function getEmpresaMaisAfetada(empresaId){

    const sql= `SELECT * FROM vw_empresa_com_mais_alertas;` 

    console.log(sql);
    return database.executar(sql);
}

function getMesMaisAfetado(empresaId) {

    const sql = `SELECT * FROM vw_mes_com_mais_alertas;`

    console.log(sql);
    return database.executar(sql);
}

function getModeloMaisAfetado(empresaId) {

    const sql = `SELECT * FROM vw_modelo_com_mais_alertas;`

    console.log(sql);
    return database.executar(sql);
}


module.exports = {
    getEmpresaMaisAfetada,
    getMesMaisAfetado,
    getModeloMaisAfetado
}