// const industriaModel = require("../models/industriaModel");
// const empresaModel = require("../models/empresaModel");
 const plcModel = require("../models/plcModel");
// const { get } = require("../routes/plc");
// para cadastrar um plc especifico, precisa fk da industria e da empresa

//function funcao(req, res) {
    // fazer algo
//}
function get(req, res){
    plcModel.get().then(response => {
        res.json(response)
    }).catch(e => {
        console.log(e)
        res.json(e)
    })
}

const getConfigs = (req, res) => {
    const plc_id = req.params.plcId

    plcModel.getConfigs(plc_id).then(response => {
        res.status(200).json({
            configs: response
        })
    }).catch(e => {
        res.status(400).json({
            error: "Erro ao procurar configurações do PLC"
        })
    })
}


const store = async(req, res) => {
    const {modelo, ano, sistema_operacional, capacidade_ram, endereco_mac, hostname, setor_fabrica_id, parceria_id} = req.body
    const dados = {
        modelo: modelo,
        ano: ano,
        sistema_operacional: sistema_operacional,
        capacidade_ram: capacidade_ram,
        endereco_mac: endereco_mac,
        hostname: hostname,
        setor_fabrica_id: setor_fabrica_id,
        parceria_id: parceria_id
    }

    plcModel.getByMac(endereco_mac).then(response => {
        if(response.length > 0 ){
            res.status(400).json({
                error: "PLC já cadastrado"
            })
            return
        }else{

     

    plcModel.create(dados).then(async response => {
        try{
            const plcNovo = await plcModel.getByMac(endereco_mac)
        
            res.status(200).json({
                message: 'OK',
                out: response,
                plc: plcNovo[0]
            })
        }catch(e) {
            console.log(e)
            res.status(500).json({
                error: "Impossivel localizar PLC"
            })
            return 
        }
    }).catch(e => {
        res.status(500).json({
            error: "Erro ao cadastrar plc"
        })
    })
}
})

}

const getByMac = (req, res) => {
    const mac = req.params.mac;

    plcModel.getByMac(mac).then(response => {
        if(response.length > 0 ){
            res.status(200).json({
                plc: response[0]
            })
            
        }else{
            res.status(200).json({
                message: "Não há plc com esse mac",
                status: 0
            })
        }

    }).catch(e => {
        console.log(e)
        res.status(500).json({
            error: "Erro ao procurar Plc"
        })
    })
}

module.exports = {
    get,
    getByMac,
    store,
    getConfigs
};