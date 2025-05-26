const database = require("../database/config")

//function cadastrar(fkEmpresa, fkIndustria, ...) {
    // query = "alguma query sql cm as fks";
    // return database.executar(query);
//}

const listarPorEmpresa = (empresaId) => {
    const sql = `SELECT plc.id,concat(fc.nome, ' ',plc.hostname) as plc FROM plc
JOIN setor_fabrica sf
ON sf.id = plc.setor_fabrica_id
JOIN fabrica_consumidor fc
ON fc.id = sf.fabrica_consumidor_id
WHERE fc.empresa_consumidor_id = ${empresaId};`;
    return database.executar(sql)
}



function get(empresaId){
    const sql = `SELECT plc.id, plc.modelo, plc.ano, plc.capacidade_ram, plc.hostname, plc.endereco_mac FROM plc
JOIN setor_fabrica sf
ON sf.id = plc.setor_fabrica_id
JOIN fabrica_consumidor fc
ON fc.id = sf.fabrica_consumidor_id
WHERE fc.empresa_consumidor_id = ${empresaId};`;

    return database.executar(sql)
}

const getConfigs = id => {
    const sql = `SELECT conf.id as config_id, co.id, co.hardware, co.tipo_dado, co.unidade_dado, co.funcao_python,co.tipo_dado, conf.limite_atencao, conf.limite_critico, co.hardware, co.coluna_captura from componente as co 
                   join config_plc as conf on conf.componente_id = co.id 
                   join plc as p on p.id = conf.plc_id 
                   where conf.plc_id = ${id} and conf.ativo = 1`;
    return database.executar(sql)                   
}

const getConfigsFabrica = id => {
    const sql = `SELECT conf.id as config_id, co.id, co.hardware, co.tipo_dado, co.unidade_dado, co.funcao_python,co.tipo_dado, conf.limite_atencao, conf.limite_critico, co.hardware, co.coluna_captura from componente as co 
                   join config_plc as conf on conf.componente_id = co.id 
                   where conf.fabrica_consumidor_id = ${id} and conf.ativo = 1`;
    return database.executar(sql)                   
}


const create = (dados) => {
    
    const sql = `INSERT INTO plc (modelo, ano, sistema_operacional, capacidade_ram, endereco_mac, hostname, setor_fabrica_id, parceria_id) VALUES ('${dados.modelo}', '${dados.ano}', '${dados.sistema_operacional}', '${dados.capacidade_ram}', '${dados.endereco_mac}', '${dados.hostname}', ${dados.setor_fabrica_id}, ${dados.parceria_id})`
    return database.executar(sql)
}

const getByMac = (mac) => {
    const sql = `SELECT fc.empresa_consumidor_id as empresa_id, sf.fabrica_consumidor_id, p.id, p.hostname, p.endereco_mac, p.sistema_operacional FROM plc as p
    join setor_fabrica sf
    on sf.id = p.setor_fabrica_id 
    join fabrica_consumidor fc
    on fc.id = sf.fabrica_consumidor_id
    WHERE endereco_mac = '${mac}'`
    return database.executar(sql)
}

function listarUm(id){
    const sql = `select * from plc as p
join parceria as par
on p.parceria_id = par.id
where par.empresa_fabricante_id = ${id}`;
    return database.executar(sql)
}

function pegarModelos(){
    const sql = `
        SELECT p.id, p.modelo, COUNT(*) AS total_alertas
        FROM alerta a
        JOIN config_plc cp ON a.config_plc_id = cp.id
        JOIN plc p ON cp.plc_id = p.id
        WHERE a.dataHora >= NOW() - INTERVAL 7 DAY
        GROUP BY p.id, p.modelo
        ORDER BY total_alertas DESC
        LIMIT 3;
    `;
    return database.executar(sql);
};

module.exports = {
    get,
    getConfigsFabrica,
    getByMac,
    create,
    getConfigs,
    listarUm,
    listarPorEmpresa,
    pegarModelos
};