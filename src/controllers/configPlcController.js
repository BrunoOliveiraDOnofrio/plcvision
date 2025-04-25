const model = require('../models/configPlcModel')


const desativar = async (req, res) => {
    const id = req.params.id
    try{
        const response = await model.desativar(id)
        res.status(200).json({
            message: "Configuração desativada com sucesso"
        })
    }catch(e){
        res.status(500).json({
            error: "Erro ao desativar configuração"
        })
    }
}

const storeDefault = async (req, res) =>{
    const plc_id = req.params.plcId
    const configuracoes = [
        {
            plc_id:plc_id,
            limite_atencao: 60,
            limite_critico: 80,
            componente_id: 2,
            padrao: 1
        },
        {
            plc_id:plc_id,
            limite_atencao: 60,
            limite_critico: 80,
            componente_id: 5,
            padrao: 1
        },
        {
            plc_id:plc_id,
            limite_atencao: 1900,
            limite_critico: 2400,
            componente_id: 8,
            padrao: 1
        }
    ]
    let contador = 0
    let deuRuim = false
    await Promise.all(
        configuracoes.map(async (configuracao) => {

            //verificar se a a configuração ja existe
            try{
                let exists = await model.checkIfExists(configuracao.plc_id, configuracao.componente_id)
                
                if(exists.length == 0){
                    
                    try{
                        response = await model.create(configuracao)
                        contador++
                    }catch(e) {
                        console.log(e)
                        deuRuim = true
                    }
                }else {
                    try{
                        console.log(exists)
                        let id = exists[0].id
                        configuracao['id'] = id
                        response = await model.update(configuracao, 1)
                        contador++
                    }catch(e) {
                        console.log(e)
                        deuRuim = true
                    }
                }

            }catch(e){
                console.log(e)
                deuRuim = true
            }
            
           
           

        })
    )

    if(deuRuim){
        res.status(500).json({
            error: "Erro ao adicionar configurações"
        })
        return
    }

    res.status(200).json({
        message: "Configurações adicionadas com sucesso",
        qtd: contador
    })
}

const checkIfConfigFabricaExists = async(req, res) => {
    const fabrica_id = req.params.fabricaId
    try{
        const response = await model.getDefaultsFabrica(fabrica_id)
        if(response.length > 0){
            res.status(200).json({
                status: 1
            })
            
        }else{
            res.status(200).json({
                status: 0
            })
        }
    }catch(e){
        res.status(500).json({
            error: "Erro ao verificar se a fábrica tem configurações padrões"
        }) 
    }
}

const store = async (req, res) =>{
    const plc_id = req.params.plcId
    const configuracoes = req.body.configuracoes
    let deuRuim = false
    let contador = 0 
    try{
        
        console.log(configuracoes)
        
        
        await Promise.all(
            configuracoes.map(async (configuracao) => {

                //verificar se a a configuração ja existe
                try{
                    let exists = await model.checkIfExists(plc_id, configuracao.componente_id)
                    
                    if(exists.length == 0){
                        configuracao['plc_id'] = plc_id
                        configuracao['padrao'] = 1
                        try{
                            response = await model.create(configuracao)
                            contador++
                        }catch(e) {
                            console.log(e)
                            deuRuim = true
                        }
                    }else {
                        try{
                            console.log(exists)
                            let id = exists[0].id
                            configuracao['id'] = id
                            response = await model.update(configuracao, 1)
                            contador++
                        }catch(e) {
                            console.log(e)
                            deuRuim = true
                        }
                    }

                }catch(e){
                    console.log(e)
                    deuRuim = true
                }
                
            
            

            })
        )

        
    }catch(e){
        console.log(e)
        deuRuim = true
    }
    if(deuRuim){
        res.status(500).json({
            error: "Erro ao adicionar configurações"
        })
        return
    }

    res.status(200).json({
        message: "Configurações adicionadas com sucesso",
        qtd: contador
    })
}


const storeDefaultFabrica = async (req, res) =>{
    const plc_id = req.params.plcId
    const fabrica_id = req.body.fabrica_id
    let deuRuim = false
    let contador = 0
    try{
        const configuracoes = await model.getDefaultsFabrica(fabrica_id)
        console.log(configuracoes)
        console.log(fabrica_id)
        
        await Promise.all(
            configuracoes.map(async (configuracao) => {

                //verificar se a a configuração ja existe
                try{
                    let exists = await model.checkIfExists(plc_id, configuracao.componente_id)
                    
                    if(exists.length == 0){
                        configuracao['plc_id'] = plc_id
                        configuracao['padrao'] = 1
                        try{
                            response = await model.create(configuracao)
                            contador++
                        }catch(e) {
                            console.log(e)
                            deuRuim = true
                        }
                    }else {
                        try{
                            console.log(exists)
                            let id = exists[0].id
                            configuracao['id'] = id
                            response = await model.update(configuracao, 1)
                            contador++
                        }catch(e) {
                            console.log(e)
                            deuRuim = true
                        }
                    }

                }catch(e){
                    console.log(e)
                    deuRuim = true
                }
                
            
            

            })
        )

        
    }catch(e){
        console.log(e)
        deuRuim = true
    }
    if(deuRuim){
        res.status(500).json({
            error: "Erro ao adicionar configurações"
        })
        return
    }

    res.status(200).json({
        message: "Configurações adicionadas com sucesso",
        qtd: contador
    })
}

module.exports = {
    storeDefault,
    store,
    storeDefaultFabrica,
    checkIfConfigFabricaExists,
    desativar
}