const database = require('../database/config')

function getEmpresaMaisAfetada(empresaId){

    const sql= `SELECT * FROM vw_empresa_com_mais_alertas;` 

    console.log(sql);
    return database.executar(sql);
}

function getMesMaisAfetado(empresaId) {
    
    let sql = empresaId !== "undefined" ? `SELECT * FROM vw_mes_com_mais_alertas_din WHERE empresaId = ${empresaId};` :`SELECT * FROM vw_mes_com_mais_alertas;`

    console.log(sql);
    return database.executar(sql);
}

function getModeloMaisAfetado(empresaId) {

    let sql = empresaId == 'undefined' ? `SELECT * FROM vw_modelo_com_mais_alertas;` : 
    `SELECT * FROM vw_modelo_com_mais_alertas_din WHERE empresaId = ${empresaId};`

    console.log(sql);
    return database.executar(sql);
}

function getPrctDefeitosMes(empresaId) {

    let sql = empresaId == 'undefined' ? `SELECT * FROM vw_prct_defeito_mes;` :
    `SELECT * FROM vw_prct_defeito_mes_din WHERE empresaId = ${empresaId};`

    console.log(sql);
    return database.executar(sql);
}

function getDefeitosPorModelo(empresaId) {

    let sql = empresaId == 'undefined' ? `SELECT * FROM vw_taxa_defeito_por_modelo;` :
    `SELECT * FROM vw_taxa_defeito_por_modelo_din WHERE empresaId = ${empresaId} ; `

    console.log();
    return database.executar(sql);
}

function getModeloMaisVendido(empresaId) {

    sql = `SELECT * FROM vw_modelo_mais_vendido;`

    console.log();
    return database.executar(sql);
}

async function getPrctMeta(empresaId) {

    const metaSql = `SELECT meta_de_vendas AS meta, mes FROM meta_vendas
    WHERE MONTH(data_hora) = MONTH(NOW());`

    const qtdAtual = `SELECT SUM(qtd) AS qtdTotal FROM painel_vendas
    WHERE MONTH(dtHora) = MONTH(NOW()) AND tipo = 'Pedido';`

    const meta = await database.executar(metaSql);
    const atual = await database.executar(qtdAtual);
    
    return {
        meta : meta[0].meta,
        atual : atual[0].qtdTotal
    }

}


async function getPainelCancelamento(empresaId) {

    const mediaCancel = `SELECT media_de_cancelamentos AS mediaCancel, mes FROM meta_vendas
    WHERE MONTH(data_hora) = MONTH(NOW());`

    const cancelAtual = `SELECT COUNT(id) AS cancelAtual, SUM(qtd) AS qtd, tipo FROM painel_vendas
    WHERE MONTH(dtHora) = MONTH(NOW()) AND tipo = 'Cancelamento'`

    const media = await database.executar(mediaCancel);
    const atual = await database.executar(cancelAtual);
    
    return {
        media : media[0].mediaCancel,
        atual : atual[0].qtd
    }

}


module.exports = {
    getEmpresaMaisAfetada,
    getMesMaisAfetado,
    getModeloMaisAfetado,
    getPrctDefeitosMes,
    getDefeitosPorModelo,
    getModeloMaisVendido,
    getPrctMeta,
    getPainelCancelamento
}