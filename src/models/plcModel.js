const database = require("../database/config")

//function cadastrar(fkEmpresa, fkIndustria, ...) {
    // query = "alguma query sql cm as fks";
    // return database.executar(query);
//}
function get(){
    const sql = `SELECT * FROM plc`;

    return database.executar(sql)
}

const getConfigs = id => {
    const sql = `SELECT conf.id as config_id,co.id, co.funcao_python,co.tipo_dado, conf.limite_atencao, conf.limite_critico, co.hardware, co.coluna_captura from componente as co 
                   join config_plc as conf on conf.componente_id = co.id 
                   join plc as p on p.id = conf.plc_id 
                   where conf.plc_id = ${id}`
    return database.executar(sql)                   
}

const create = (dados) => {
    
    const sql = `INSERT INTO plc (modelo, ano, sistema_operacional, capacidade_ram, endereco_mac, hostname, setor_fabrica_id, parceria_id) VALUES ('${dados.modelo}', '${dados.ano}', '${dados.sistema_operacional}', '${dados.capacidade_ram}', '${dados.endereco_mac}', '${dados.hostname}', ${dados.setor_fabrica_id}, ${dados.parceria_id})`
    return database.executar(sql)
}

const getByMac = (mac) => {
    const sql = `SELECT sf.fabrica_consumidor_id, p.id, p.hostname, p.endereco_mac, p.sistema_operacional FROM plc as p
    join setor_fabrica sf
    on sf.id = p.setor_fabrica_id WHERE endereco_mac = '${mac}'`
    return database.executar(sql)
}

function listarUm(){
    
    const sql = `SELECT * FROM plc WHERE id = ${sessionStorage.plcID}`
}

module.exports = {
    get,
    getByMac,
    create,
    getConfigs
};