const database = require('../database/config')

function obterAlertasPorHorario(data){
    const sql = `
    SELECT
    HOUR(a.datahora) AS Hora,
    COUNT(a.id) AS Quantidade_Alertas
FROM
    alerta a
LEFT JOIN
    config_plc cp ON a.config_plc_id = cp.id
LEFT JOIN
    componente c ON cp.componente_id = c.id  -- Adicionado JOIN com a tabela componente
LEFT JOIN
    plc p ON cp.plc_id = p.id
WHERE
     c.hardware = 'CPU'
    AND DATE(a.datahora) BETWEEN '${data}' AND CURDATE()
GROUP BY
    HOUR(a.datahora)
ORDER BY
    Hora;
    `
    console.log(sql)
    return database.executar(sql)
}

function obterAlertasPorHorarioRam(data){
    const sql = `
    SELECT
    HOUR(a.datahora) AS Hora,
    COUNT(a.id) AS Quantidade_Alertas
FROM
    alerta a
LEFT JOIN
    config_plc cp ON a.config_plc_id = cp.id
LEFT JOIN
    componente c ON cp.componente_id = c.id  -- Adicionado JOIN com a tabela componente
LEFT JOIN
    plc p ON cp.plc_id = p.id
WHERE
    c.hardware = 'RAM'
    AND DATE(a.datahora) BETWEEN '${data}' AND CURDATE()
GROUP BY
    HOUR(a.datahora)
ORDER BY
    Hora;
    `
    console.log(sql)
    return database.executar(sql)
}

function obterMaiorHorario(data){
    const sql = `
    SELECT
    HOUR(a.datahora) AS Hora -- Seleciona apenas a hora
FROM
    alerta a
LEFT JOIN
    config_plc cp ON a.config_plc_id = cp.id
LEFT JOIN
    plc p ON cp.plc_id = p.id
WHERE
    a.tipo_valor = 'Uso em Bytes'
    AND DATE(a.datahora) BETWEEN '${data}' AND CURDATE()
GROUP BY
    Hora
ORDER BY
    COUNT(a.id)
LIMIT 1;
    `
    return database.executar(sql)
}

module.exports = {
    obterAlertasPorHorario,
    obterMaiorHorario,
    obterAlertasPorHorarioRam
}