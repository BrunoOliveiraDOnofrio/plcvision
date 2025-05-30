const database = require("../database/config")


const getAlertasNasUltimas24Horas = (empresaId) => {
    const sql = `SELECT COUNT(a.id) as qtdAlertas, ec.razao_social, ec.id as empresaId FROM alerta AS a
                JOIN config_plc cp
                ON cp.id = a.config_plc_id
                JOIN plc p
                ON p.id = cp.plc_id
                JOIN parceria par
                ON par.id = p.parceria_id
                JOIN empresa_consumidor ec
                ON ec.id = par.empresa_consumidor_id
                WHERE par.empresa_fabricante_id = ${empresaId} AND
                (dataHora BETWEEN date_sub(now(), INTERVAL 24 HOUR ) AND now())
                GROUP BY ec.id`
    return database.executar(sql)
}

const getUltimoAlerta = (dataHora, plcId) => {
    const sql = `SELECT a.id, a.criticidade, a.dataHora, a.tipo_valor, a.valor_capturado from alerta as a
    JOIN config_plc cp
    ON cp.id = a.config_plc_id
     WHERE cp.plc_id = ${plcId} AND dataHora >
'${dataHora}' ORDER BY dataHora asc LIMIT 1; `;
    return database.executar(sql)
}

const create = (dados) =>{
    const sql = `INSERT INTO alerta (criticidade, descricao, link_chamado, dataHora, status, valor_capturado, tipo_valor, config_plc_id) VALUES ('${dados.nivel}', '${dados.descricao}','${dados.link_chamado}', '${dados.dataHora}' , 'Aberto', ${dados.valor}, '${dados.tipoDado}', ${dados.config_plc_id})`;
    console.log(sql)
    return database.executar(sql)
}

// kkkkkkk
const insertedInTheLastTenMinutes = (config_id) =>{
    const sql = `SELECT COUNT(*) as alertas FROM alerta 
WHERE config_plc_id = ${config_id} and 
dataHora BETWEEN date_sub(now(), interval 20 second) AND now();`
    return database.executar(sql)
}

const nomeFabrica = (fabrica_id) =>{
    const sql = `SELECT razao_social, nome FROM fabrica_consumidor as fc 
    JOIN empresa_consumidor ec
    ON ec.id = fc.empresa_consumidor_id
     WHERE fc.id = ${fabrica_id};`
    return database.executar(sql)
}

const nomeSetor = (plc_id) => {
    const sql = `SELECT setor_fabrica.nome FROM plc JOIN setor_fabrica ON plc.setor_fabrica_id = setor_fabrica.id WHERE plc.id = ${plc_id};`
    return database.executar(sql)

}

const qtdAlertaHardware = () => {
    const sql = `SELECT p.modelo, COUNT(a.id) AS total_alertas
    FROM alerta a
    JOIN config_plc cp ON a.config_plc_id = cp.id
    JOIN plc p ON cp.plc_id = p.id
    WHERE a.dataHora >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY p.modelo
    ORDER BY total_alertas DESC
    LIMIT 1;`
            return database.executar(sql)
        }

const modeloComponente = (modelo) => {
    const sql = `SELECT
    c.hardware,
    COUNT(a.id) AS total_alertas
FROM alerta a
JOIN config_plc cp ON a.config_plc_id = cp.id
JOIN componente c ON cp.componente_id = c.id
JOIN plc p ON cp.plc_id = p.id
WHERE p.modelo = "${modelo}" AND a.dataHora >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
GROUP BY c.hardware
ORDER BY total_alertas DESC;`

        return database.executar(sql);
}

module.exports = {
    create,
    insertedInTheLastTenMinutes,
    getUltimoAlerta,
    nomeFabrica,
    nomeSetor,
    getAlertasNasUltimas24Horas,
    getAlertasNasUltimas24Horas,
    qtdAlertaHardware,
    modeloComponente
};