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
function obterAlertasEspecificos(data){
    const sql = `
    SELECT
    ec.razao_social AS nome_empresa,
    fc.nome AS nome_fabrica,
    sf.nome AS nome_setor,
    p.modelo AS modelo_plc,
    comp.hardware AS tipo_componente_alerta,
    COUNT(a.id) AS quantidade_problemas
FROM
    alerta AS a
JOIN
    config_plc AS cp ON a.config_plc_id = cp.id
JOIN
    componente AS comp ON cp.componente_id = comp.id
JOIN
    plc AS p ON cp.plc_id = p.id
JOIN
    setor_fabrica AS sf ON p.setor_fabrica_id = sf.id
JOIN
    fabrica_consumidor AS fc ON sf.fabrica_consumidor_id = fc.id
JOIN
    empresa_consumidor AS ec ON fc.empresa_consumidor_id = ec.id
WHERE
    comp.hardware IN ('CPU', 'RAM')
    AND DATE(a.dataHora) BETWEEN '${data}' AND CURDATE()
GROUP BY
    ec.razao_social,
    fc.nome,
    sf.nome,
    p.modelo,
    comp.hardware
ORDER BY
    quantidade_problemas DESC,
    nome_empresa,
    nome_fabrica,
    nome_setor,
    modelo_plc,
    tipo_componente_alerta;
    `
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
    obterAlertasPorHorarioRam,
    obterAlertasEspecificos
}