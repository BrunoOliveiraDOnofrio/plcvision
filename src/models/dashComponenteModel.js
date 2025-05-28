const database = require('../database/config')

function obterAlertasPorHorario(data, modelo){
    const sql = `
    SELECT
    HOUR(a.datahora) AS Hora,
    COUNT(a.id) AS Quantidade_Alertas
FROM
    alerta a
LEFT JOIN
    config_plc cp ON a.config_plc_id = cp.id
LEFT JOIN
    plc p ON cp.plc_id = p.id
WHERE
    HOUR(a.datahora) BETWEEN 7 AND 19
    AND a.tipo_valor = 'Conexões'
    AND DATE(a.datahora) BETWEEN '${data}' AND CURDATE()
    AND p.modelo = '${modelo}'
GROUP BY
    HOUR(a.datahora)
ORDER BY
    Hora; 
    `
    console.log(sql)
    return database.executar(sql)
}

module.exports = {
    obterAlertasPorHorario
}