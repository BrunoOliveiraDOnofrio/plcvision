var express = require("express");
var router = express.Router();

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

function agruparComportamentosForaPadrao(dados) {
  const resultado = [];

  for (const empresaData of dados) {
    const empresaId = empresaData.empresa;
    let fora1 = 0;
    let fora2 = 0;

    for (const plc of empresaData.plcs) {
      for (const dia of plc.dados) {
        for (const leitura of dia) {
          if (leitura.foraPadrao === 1) fora1++;
          else if (leitura.foraPadrao === 2) fora2++;
        }
      }
    }

    resultado.push({
      empresa: empresaId,
      foraPadrao1: fora1,
      foraPadrao2: fora2,
      total: fora1 + fora2
    });
  }

  return resultado;
}



router.get('/monitoramento/empresas', (req, res) => {
    let response  = "No data";

    const dadosAgrupados = agruparComportamentosForaPadrao(dados)

    res.status(200).json(dadosAgrupados)
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