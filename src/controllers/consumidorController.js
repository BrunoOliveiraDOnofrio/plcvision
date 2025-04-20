const consumidorModel = require("../models/consumidorModel");
const enderecoModel = require("../models/enderecoModel");
const crypto = require("crypto");

const gerarToken = () => {
    return crypto.randomBytes(16).toString("hex");
}

const show = (req, res) => {
    const id = req.params.id
    consumidorModel.getById(id).then(response => {
        if(response.length == 0){
            res.status(400).json({
                error : "Consumidor não encontrado"
            })
            return
        }
        res.status(200).json({
            message: "OK",
            empresa: response[0]
        })
    }).catch(e => {
        res.status(500).json({
            error : "Erro ao buscar empresa consumidora",
            e : e
        })
    })
}

const index = (req, res) => {
    
    consumidorModel.getAll().then(response => {
        res.status(200).json({
            message: "OK",
            empresas: response
        })
    }).catch(e => {
        res.status(500).json({
            error : "Erro ao buscar empresas consumidoras",
            e : e
        })
    })
}


const update = (req, res) => {
    console.log(req.body)
    const {endereco_id, logradouro, numLogradouro, complemento, bairro, cidade, estado} = req.body
    const {razaoSocial, cnpj, qtdFabricas, segmento} = req.body
    const id = req.params.id

    if(!logradouro || !numLogradouro || !bairro || !cidade || !estado ){
        res.status(400).json({
            error : "Preencha todos os campos obrigatórios"
        })
        return
    }
    if(!cnpj || !razaoSocial ||  !segmento){
        res.status(400).json({
            error : "Preencha todos os campos obrigatórios"
        })
        return
    }

    

    
    const dataEndereco = {
        endereco_id: endereco_id,
        logradouro : logradouro,
        numLogradouro : numLogradouro,
        complemento : complemento,
        bairro : bairro,
        cidade : cidade,
        estado : estado
    }

    

    enderecoModel.updateEndereco(dataEndereco).then(enderecoResponse => {
        
        
        const dataEmpresa = {
            razaoSocial : razaoSocial,
            cnpj : cnpj,
            qtdFabricas : qtdFabricas,
            segmento : segmento,
            
        }
        consumidorModel.updateConsumidor(dataEmpresa, id).then(response => {
            res.status(200).json({
                message: "Consumidor atualizado com sucesso",
                enderecoId: endereco_id
            })
        }).catch(e => {
            res.status(500).json({
                error : "Erro ao atualizar consumidor",
                e: e
            })
        })
    }).catch(e => {
        res.status(500).json({
            error : "Erro ao atualizar endereço",
            e : e
        })
    })

}


const store = (req, res) => {
    console.log(req.body)
    const {logradouro, numLogradouro, complemento, bairro, cidade, estado} = req.body
    const {razaoSocial, cnpj, qtdFabricas, segmento} = req.body
    

    if(!logradouro || !numLogradouro || !bairro || !cidade || !estado ){
        res.status(400).json({
            error : "Preencha todos os campos obrigatórios"
        })
        return
    }
    if(!cnpj || !razaoSocial ||  !segmento){
        res.status(400).json({
            error : "Preencha todos os campos obrigatórios"
        })
        return
    }

    const token = gerarToken()

    
    const dataEndereco = {
        logradouro : logradouro,
        numLogradouro : numLogradouro,
        complemento : complemento,
        bairro : bairro,
        cidade : cidade,
        estado : estado
    }

    

    enderecoModel.createEndereco(dataEndereco).then(enderecoResponse => {
        const enderecoId = enderecoResponse.insertId
        
        const dataEmpresa = {
            razaoSocial : razaoSocial,
            cnpj : cnpj,
            qtdFabricas : qtdFabricas,
            segmento : segmento,
            token : token,
            enderecoId : enderecoId
        }
        consumidorModel.createConsumidor(dataEmpresa).then(response => {
            res.status(200).json({
                message: "Consumidor cadastrado com sucesso",
                id: response.insertId,
                enderecoId: enderecoId
            })
        }).catch(e => {
            res.status(500).json({
                error : "Erro ao cadastrar consumidor",
                e: e
            })
        })
    }).catch(e => {
        res.status(500).json({
            error : "Erro ao cadastrar endereço",
            e : e
        })
    })

}

const getByToken = (req, res) => {
    const id = req.params.id
    const token = req.body.token

    consumidorModel.getByToken(token, id).then(response => {
        if(response.length == 0){
            res.status(400).json({
                error : "Token incorreto ou parceria inexistente"
            })
            return
        }
        res.status(200).json({
            empresa: response[0],
            message: "OK"
        })
    }).catch(e => {
        res.status(500).json({
            error : "Erro ao buscar empresa consumidora"
        })
    })
}

module.exports = {
    getByToken,
    store,
    index,
    show,
    update
};