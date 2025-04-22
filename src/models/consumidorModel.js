const database = require("../database/config")


const getByFabricanteId = (id) => {     
    const sql = `select ec.id , ec.razao_social FROM empresa_consumidor as ec
JOIN parceria par
ON par.empresa_consumidor_id = ec.id
JOIN empresa_fabricante ef
ON par.empresa_fabricante_id = ef.id
WHERE ef.id =${id};`
    return database.executar(sql)
}

const getAll = (empresa_fabricante_id) => {
    // const sql = `SELECT empresa_consumidor.id, razao_social, qtdFabrica,cnpj, concat(logradouro, ' ', numLogradouro, ' ', cidade, ' ', bairro) as endereco,segmento, token FROM empresa_consumidor join
    // endereco 
    // on endereco.id = empresa_consumidor.endereco_id;`
    const sql = `SELECT ec.id, ec.razao_social, ec.qtdFabrica, ec.cnpj, 
concat(logradouro, ' ', numLogradouro, ' ', cidade, ' ', bairro) as endereco,
ec.segmento, ec.token FROM empresa_fabricante as ef
JOIN parceria p
ON p.empresa_fabricante_id = ef.id
JOIN empresa_consumidor ec
ON ec.id = p.empresa_consumidor_id
JOIN endereco e 
ON e.id = ec.endereco_id
WHERE ef.id = ${empresa_fabricante_id};`
    return database.executar(sql)
}

const getById = (id) => {
    const sql = `SELECT empresa_consumidor.id, endereco.id as enderecoId, razao_social, qtdFabrica,cnpj, logradouro,   numLogradouro,  cidade,  bairro , complemento, estado, segmento FROM empresa_consumidor join
    endereco 
    on endereco.id = empresa_consumidor.endereco_id
    WHERE empresa_consumidor.id = ${id};`
    return database.executar(sql)
}


const getByToken = (token, id) => {
    const sql = `SELECT ec.id, ec.razao_social, p.id as parceriaId from usuario as u
                join empresa_fabricante ef
                on ef.id = u.empresa_id
                join parceria p
                on p.empresa_fabricante_id = ef.id
                join empresa_consumidor ec
                on ec.id = p.empresa_consumidor_id
                where token = '${token}' and u.id = ${id};`
    return database.executar(sql)
}

const createConsumidor = (data) => {
    const sql = `INSERT INTO empresa_consumidor (razao_social, segmento,cnpj,  token, qtdFabrica,endereco_id) VALUES ('${data.razaoSocial}', '${data.segmento}', '${data.cnpj}',  '${data.token}', ${data.qtdFabricas}, ${data.enderecoId})`;
    return database.executar(sql)
}

const updateConsumidor = (data, id) => {
    const sql = `UPDATE empresa_consumidor SET razao_social = '${data.razaoSocial}', segmento = '${data.segmento}', cnpj = '${data.cnpj}', qtdFabrica = ${data.qtdFabricas} WHERE id = ${id}`;
    return database.executar(sql)
}

module.exports = {
    getByToken,
    createConsumidor,
    getAll,
    getById,
    updateConsumidor,
    getByFabricanteId
}