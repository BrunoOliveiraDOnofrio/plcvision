var express = require("express");
var router = express.Router();
const monitoramentoService = require('../services/monitoramentoService')


const path = require("path");

var dados = [
    // {
    //     maquina_id: NaN,
    //     dados: []
    // }
]

router.get("/login", function (req, res) {
    
    res.sendFile(path.join(__dirname, "../../public/login.html"));
})

router.get("/", function (req, res) {
    res.render("index");
});




router.get('/monitoramento/empresas', async (req, res) => {
    let response  = "No data";

    const dadosAgrupados = monitoramentoService.agruparComportamentosForaPadrao(dados)
    const alertas = await monitoramentoService.buscarAlertasDasUltimas24Horas(1)
    const empresasRankeadas = monitoramentoService.rankearEmpresasCriticidade(dadosAgrupados, alertas)
    
    res.status(200).json(empresasRankeadas)
})

router.get('/monitoramento/empresas/:empresaId/barras', async(req, res) => {
    const empresaId = req.params.empresaId

    const dadosEmpresaFiltrada = monitoramentoService.filtrarDadosEmpresa(dados, empresaId)
    const dadosBarrasAgrupadas = monitoramentoService.gerarDadosBarrasAgrupadas(dadosEmpresaFiltrada.plcs)
    
    res.json(dadosBarrasAgrupadas)
})

router.get('/monitoramento/empresas/:empresaId/foraNormal', async (req, res) => {
    const empresaId = req.params.empresaId
    const dadosAgrupados = monitoramentoService.agruparComportamentosForaPadrao(dados)
     
    const dadosAgrupadosEmpresa = dadosAgrupados.find(e => e.empresa == empresaId)
    const alertas = await monitoramentoService.buscarAlertasDasUltimas24Horas(1)
    dadosAgrupadosEmpresa['alertas'] = alertas.find(e => e.empresaId == empresaId)
    res.status(200).json(dadosAgrupadosEmpresa)

})

router.get(`/monitoramento/empresas/:empresaId/disperssao`, (req,res) => {
    const empresaId = req.params.empresaId
    const dadosDispersao = monitoramentoService.gerarDadosDispersao(dados,empresaId)
    res.status(200).json(dadosDispersao);
})

router.get('/monitoramento/empresas/:empresaId/mapa', async(req, res) => {
    const empresaId = req.params.empresaId
    
    const dadosEmpresaFiltrada = monitoramentoService.filtrarDadosEmpresa(dados, empresaId)
    
    const dadosMapaCalor = monitoramentoService.mapaDeCalorEmpresa(dadosEmpresaFiltrada)
    console.log(dadosMapaCalor)
    const plcComAlertas = []
    dadosMapaCalor.map(plc => {
        console.log(plc)
        const soma = plc.data.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
        if(soma > 0){
            plcComAlertas.push(plc)
        }
    })
    res.status(200).json({dados: plcComAlertas})
})




router.get("/monitoramento/:id", (req,res) => {
    
    const id = req.params.id
    
    let response = "OOK"
    //serve para diferenciar se o python esta mandando dados ou se eu qeuero visualizar os dados
    if(req.body.maquina && id == 0){
        // tem que verificar se ja existe o id da maquina no json global
        
        let existe = false;
        let existeEmpresa = false;
        let id_recebido = req.body.maquina
        let empresa_id_recebido = req.body.empresa
        dados.forEach((dado) => {

            if(dado.empresa == empresa_id_recebido){
                existeEmpresa = true
                
                dado.plcs.forEach((dado_plc, index) => {
                    if(dado_plc.maquina_id == id_recebido){
                
                        existe = true
                        let registrosQtd = dado_plc.dados.length
                        
                        if(registrosQtd == 7){
                            
                            dado_plc.dados.shift()
                        }
                        dado_plc.dados.push(req.body.dados)

                    }
                })
                    

                if(!existe){
                    
                    let dados_array = []
                    dados_array.push(req.body.dados)
                    dado.plcs.push(
                    {    
                        
                            maquina_id: id_recebido,
                            dados: [dados_array]
                        
                    })
                    // console.log(dados)
            
                }
            }
        })
                
            
           
        
        
        if(!existeEmpresa){
            dados.push({
                empresa: empresa_id_recebido,
                plcs: [
                    {
                        maquina_id: id_recebido,
                        dados: [req.body.dados]
                    }
                ]
            })
        }
        //se ja existir  verifica se ja passou do limite
            // se passou, limpa os dados e adiciona apenas o novo

            // se nao, faz o append
        
        //  da um append nos dados desse json 




        // dados['maquina'].push(req.body)
    }else if (id != 0){
        response = dados
        console.log("entrou web")
        dados.forEach((dado) => {
            if(dado.maquina_id == id){
                response = dado
            }
        })
    }
    res.json(response)
    
})

module.exports = router;