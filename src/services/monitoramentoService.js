const alertaModel = require('../models/alertaModel')


function gerarDadosBarrasAgrupadas(plcs) {
  const tiposCampos = new Set();
  const plcsFormatados = [];

  plcs.forEach(plc => {
    const contagemPorCampo = {};
    const dadosAchatos = plc.dados.flat();

    dadosAchatos.forEach(dado => {
        console.log(dado, "AQUI ESTA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      const campo = dado.campo;
      if (!campo) return;
        
      tiposCampos.add(campo); // coletando campos únicos

      if (!contagemPorCampo[campo]) contagemPorCampo[campo] = 0;
      if (dado.foraPadrao) contagemPorCampo[campo]++;
    });

    plcsFormatados.push({
      name: `PLC ${plc.maquina_id}`,
      campos: contagemPorCampo
    });
  });
  
  // Criando a série final (uma para cada tipo de falha)
  const camposOrdenados = Array.from(tiposCampos); // ["CPU Uso", "RAM Livre", "REDE Pacote Mandado", ...]

  const series = camposOrdenados.map(campo => {
    return {
      name: campo,
      data: plcsFormatados.map(plc => {
        return plc.campos[campo] || 0; // se não teve aquele campo, 0
      })
    };
  });

  const categorias = plcsFormatados.map(plc => plc.name);

  return { series, categorias };
}

function gerarDadosDispersao(modelo, filtroEmpresaId) {
  const series = [];
  
  let filtrado = filtrarDadosEmpresa(modelo, filtroEmpresaId)
  console.log(filtrado)  
    
      filtrado.plcs.forEach(plc => {
        const pontos = [];
        
        
       plc.dados.forEach(coleta => {
          let cpu = null;
          let ram = null;

          // Percorrer todos os registros da coleta
          coleta.forEach(registro => {
            if (registro.campo === "CPU Uso") {
            // console.log(registro, "AQUI A DESGRAÇA DE UM REGISTRO com uso de cpu")
              
              cpu = registro.valor;
            }
            if (registro.campo === "RAM Uso") {
            // console.log(registro, "AQUI A DESGRAÇA DE UM REGISTRO com uso de ram")

              ram = registro.valor;
            }
          });

          // Só adiciona se ambos estiverem presentes
          if (cpu !== null && ram !== null) {
            console.log("ADICIONANDO A BUCETA DE UM PONTO AII AI IA I AI ")
            pontos.push({
              x: cpu,
              y: ram,
              meta: {
                maquina_id: plc.maquina_id
              }
            });
          }
        });

        if (pontos.length > 0) {
          series.push({
            name: `PLC ${plc.maquina_id}`,
            data: pontos
          });
        }
      });
    

  return series;
}




function rankearEmpresasCriticidade(empresas, alertas){

    empresas.map((empresa) => {
        empresa['criticidade'] = empresa.foraPadrao1 + (empresa.foraPadrao2 * 2) + (empresa.foraPadrao3 * 3)  
        alertas.forEach(alerta => {
            if(empresa.empresa == alerta.empresaId){
                empresa['criticidade'] += (alerta.qtdAlertas * 1.5)
            }
        })
    })
    empresas = ordenarMaiorParaMenor(empresas)
    return empresas;
}

function mapaDeCalorEmpresa(dados) {
    const resultado = dados.plcs.map(plc => {
        const gravidadeCampo = {};
        
        // Flatten apenas um nível caso 'dados' seja um array de arrays
        const dadosAchatos = plc.dados.flat();

        dadosAchatos.forEach(item => {
            const campo = item.campo;
            console.log(campo, "AQUI ESTA OS CAMPOS MAPEADOSSS")
            const fora = item.foraPadrao;
            if(!campo) return
            if (!gravidadeCampo[campo]){
                 gravidadeCampo[campo] = 0
                 
                };
            if (fora !== 0) gravidadeCampo[campo]++;
        });

        return {
            name: `PLC ${plc.maquina_id}`,
            data: Object.values(gravidadeCampo),
            campos: Object.keys(gravidadeCampo)
        };
    });

    return resultado;
}


function filtrarDadosEmpresa(dados,empresaId){
    return dados.find(e => e.empresa == empresaId)
}


function ordenarMaiorParaMenor(dados){
    const menorCriticidade = dados[0]['criticidade']

    for(let i =0; i < dados.length; i ++){
        let menorIndice = i;

        for(let j = i + 1; j < dados.length; j++){

            let menorCriticidadeAtual = dados[j]['criticidade'] 
            let menorCriticidadeMenorIndice = dados[menorIndice]['criticidade'] 
            if(menorCriticidadeAtual > menorCriticidadeMenorIndice){
                menorCriticidadeMenorIndice = menorCriticidadeAtual
                menorIndice = j
            }  
        }

        let aux = dados[i]

        dados[i] = dados[menorIndice]
        dados[menorIndice] = aux
    }

    return dados
}

function agruparComportamentosForaPadrao(dados) {
  const resultado = [];

  for (const empresaData of dados) {
    const empresaId = empresaData.empresa;
    let fora1 = 0;
    let fora2 = 0;
    let fora3 = 0
    let foraPadraoPlcs = 0;
    for (const plc of empresaData.plcs) {
      let temFora = false;
      for (const dia of plc.dados) {
        for (const leitura of dia) {
          if (leitura.foraPadrao === 1) {
            fora1++
            temFora = true
          }
          else if (leitura.foraPadrao === 2){ 
            fora2++
            temFora = true
          }
          else if (leitura.foraPadrao === 3){
            fora3++
            temFora = true
          }
        }
      }
      if (temFora) foraPadraoPlcs++
    }



    resultado.push({
      empresa: empresaId,
      foraPadrao1: fora1,
      foraPadrao2: fora2,
      foraPadrao3: fora3,
      totalPlcsForaNormal: foraPadraoPlcs,
      total: fora1 + fora2 + fora3
    });
  }

  return resultado;
}

async function buscarAlertasDasUltimas24Horas(empresas){
    const alertasPorEmpresa = await alertaModel.getAlertasNasUltimas24Horas(1)
    
    return alertasPorEmpresa
}

module.exports = {
    agruparComportamentosForaPadrao,
    buscarAlertasDasUltimas24Horas,
    rankearEmpresasCriticidade,
    filtrarDadosEmpresa,
    mapaDeCalorEmpresa,
    gerarDadosBarrasAgrupadas,
    gerarDadosDispersao
}