

let carrosseisCriados = false
let valoresKpisSpans = []
let configuracoesObtidas = false
let configuracoesPlcs = []
let configuracaoAtual = null
let kpisCriados = false
let trocouPlc = false



const atualizarValoresKpis = (data, campos, configs) => {
  const horariosKpis = document.querySelectorAll('.horarios-kpis')
  valoresKpisSpans.forEach((span, index) => {
    const valor = data[index]
    campos.forEach((campo) => {
    if(campo == span.getAttribute("campo")){
      
      try{
        let valorEscrito = Number(span.innerHTML)
        if(!isNaN(valorEscrito) ){
          if(valor > valorEscrito){
            
            configuracaoAtual.forEach(configuracao => {
              if(configuracao.config_id == configs[index]){
                if(valor >= configuracao.limite_critico){
                  console.log("AQUIIII OOOOOOO", span.parentNode.parentNode.style.boxShadow)
                  span.parentNode.parentNode.style.boxShadow = `2px 2px 8px rgba(255, 0, 0, 0.9)`
                  span.style.color = ` rgba(255, 0, 0, 0.9)`
                }else if(valor >= configuracao.limite_atencao){
                  span.parentNode.parentNode.style.boxShadow = `2px 2px 8px rgba(255, 255, 0, 0.9)`
                  span.style.color = ` rgba(255, 255, 0, 0.9)`
                }
              }
            })
            horariosKpis[index].innerHTML = getCurrentTime()
            span.innerHTML = valor
          }
        }
      }catch(e){
        console.log(e)
      }
    
    }
    })
  })
  }


  function getCurrentTime() {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // meses começam em 0
    const day = String(now.getDate()).padStart(2, '0');
  
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`
    
    
  }

  


function getCurrentDateTime(completar_kpi) {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // meses começam em 0
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  if(completar_kpi){
    document.querySelector('#span_data_comeco').innerText = `desde ${hours}:${minutes}:${seconds}`
  }
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


const fecharAlerta = () => {
  const divAlerta = document.querySelector('#div_alerta')
  divAlerta.innerHTML = ``
  horaMudanca = getCurrentDateTime()
}

let horaMudanca = getCurrentDateTime()

setInterval(() => {
  getUltimoAlerta()
}, 10000)


const getUltimoAlerta = async () => {
  try {
    const selectPlc = document.querySelector('#select_plcs')
    const plcId = selectPlc.value
    const dataFromPython = await fetch('/alerta/last', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data_hora: horaMudanca,
        plc_id: plcId
      })
    })
    const data = await dataFromPython.json()
    if (data.message == "Não há alerta") {  
      console.log("Não há alerta")
      return
    }
    console.log(data)
    dadosAlerta = data.alerta
    const divAlerta = document.querySelector('#div_alerta')
    let nivelAlerta
    if(dadosAlerta.tipo_valor == "RAM Uso em Bytes"){
      dadosAlerta.valor_capturado = Number((dadosAlerta.valor_capturado / (1024 **3)).toFixed(2))
      dadosAlerta.tipo_valor = "RAM Uso em GB"
    }else if(dadosAlerta.tipo_valor == "RAM Memoria Livre Bytes"){
      dadosAlerta.valor_capturado = Number((dadosAlerta.valor_capturado / (1024 **3)).toFixed(2))
      dadosAlerta.tipo_valor = "RAM Memória Livre em GB"
    }
    if(dadosAlerta.criticidade == 0){
      nivelAlerta = "Atenção"
    }else if(dadosAlerta.criticidade == 1){
      nivelAlerta = "Critico"
    }
    let corSino

    if(nivelAlerta == "Atenção"){
      corSino = "yellow"
    }else if(nivelAlerta == "Critico"){
      corSino = "red"
    }

    divAlerta.innerHTML = `<div onclick="fecharAlerta()" class="alerta-box">
                    <i style="color: ${corSino}" class='bx bxs-bell-plus'></i>
                    <div class="text-group">
                        <span>Alerta ${nivelAlerta} em ${dadosAlerta.tipo_valor}</span>
                        <span>Valor Capturado: ${dadosAlerta.valor_capturado}</span>
                    </div>
                </div>`

  }catch(e)  {
      console.error(e)
  }
}



const selectEmpresas = document.querySelector('#select_empresas')
const selectPlcs = document.querySelector('#select_plcs')

let graficosCriados = false

let monitoramentoInterval = null

const selecionarConfiguracaoAtual = (id) => {
  configuracoesPlcs.forEach(config => {
    if(config.plc_id == id){
      configuracaoAtual = config.configuracoes
      console.log("CONFIGURACAO ATUAL", configuracaoAtual)
    }
  })
}

selectPlcs.addEventListener('change', (event) => {
    fecharAlerta()
    trocouPlc = true
    const selectedValue = event.target.value;
    monitoramentoInterval && clearInterval(monitoramentoInterval)
    selecionarConfiguracaoAtual(selectedValue)
    startMonitoramento(selectedValue)

})

const criarHtmlsGraficoseKpis = (data) => {
    html_graficos_text = ""
    html_kpis_text = ""

    let dadosParaCriacao = data[data.length - 1]
    let dadosDasKpis = []
    let camposDasKpis = []
    let idsConfigs = []
    dadosParaCriacao.pop()
    let configsDasKpis = []
    dadosParaCriacao.forEach(dado => {

      if(dado.campo == "RAM Uso em Bytes Bytes"){
        dado.valor = Number((dado.valor / (1024 **3)).toFixed(2))
        dado.campo = "RAM Uso em GB"
      }else if(dado.campo == "RAM Memória Livre Bytes"){
        dado.valor = Number((dado.valor / (1024 **3)).toFixed(2))
        dado.campo = "RAM Memoria Livre em GB"
      }
      html_kpis_text += `<div class="kpi-box swiper-slide">
                    <div class="value">
                        <span campo="${dado.campo}" class="valores-kpis">${dado.valor}</span> 
                    </div>
                    <div class="desc">
                       <span>${dado.campo}</span>
                    </div>
                    <div class="desc">
                       <span class="horarios-kpis">Horário: ${getCurrentTime()}</span>
                    </div>
                </div>`
                dadosDasKpis.push(dado.valor)
                camposDasKpis.push(dado.campo)
                configsDasKpis.push(dado.config_id)
                
      if(!graficosCriados){
      html_graficos_text += `<div class="charts-div swiper-slide">
                    <div class="header-chart">
                        <span>${dado.campo}</span>
                    </div>
                    <div class="content-chart">
                        <canvas class="meuGrafico"></canvas>
                    </div>
                </div>`
      }
    })

    let horarios = []
    let dadosGrafico = []
      data.forEach(dado => {
        let linhaDeValores = []
        let linhaDeConfigsId = []
        dado.forEach(dado => {
      
      
        
      if(dado.campo == "none"){
        let hora = dado.valor.split(" ")[1]
        horarios.push(hora)
      }else{
        if(dado.campo == "RAM Uso em Bytes Bytes"){
          dado.valor = Number((dado.valor / (1024 **3)).toFixed(2))
          dado.campo = "RAM Uso em GB"
        }else if(dado.campo == "RAM Memoria Livre Bytes"){
          dado.valor = Number((dado.valor / (1024 **3)).toFixed(2))
          dado.campo = "RAM Memória Livre em GB"
        }
        linhaDeValores.push(dado.valor)
        linhaDeConfigsId.push(dado.config_id)
        
      }
        
    }) 
    
    dadosGrafico.push(linhaDeValores)
    idsConfigs.push(linhaDeConfigsId)
    
  })

    //organizar os dados para o gráfico

    let dadosParaGrafico = []
    let configsParaGrafico = []
    
    
    for(let j = 0; j < dadosGrafico[0].length; j++){
      let linha = []
      let linhasConfigs = []
      for(let i = 0; i < dadosGrafico.length; i++){
        
        linha.push(dadosGrafico[i][j])
        if(i == 0){
          linhasConfigs.push(idsConfigs[i][j])
        }
      }
      dadosParaGrafico.push(linha)
      configsParaGrafico.push(linhasConfigs)
    } 
    
    let coresParaGraficos = []

    let cor = {
      cor1: "rgba(0, 123, 255, 1)",
      cor2: "rgba(0, 123, 255, 0.2)",
    }
    
    configsParaGrafico.forEach((config, index) => config.forEach((config) => {
      
      configuracaoAtual.forEach(configuracao => {
        if(configuracao.config_id == config){
          
          let corDefinida = false;
          cor = {
            cor1: "rgba(0, 123, 255, 1)",
            cor2: "rgba(0, 123, 255, 0.2)",
          }
          
          
          dadosParaGrafico[index].forEach((dado, i) => {
            if(dado >= configuracao.limite_critico && !corDefinida){
              
              cor = {
                cor1: "rgba(255, 0, 0, 1)",
                cor2: "rgba(255, 0, 0, 0.2)",
              }

              corDefinida = true
            }else if(dado >= configuracao.limite_atencao && !corDefinida){
              
              cor = {
                cor1: "rgba(255, 255, 0, 1)",
                cor2: "rgba(255, 255, 0, 0.2)",
              }
              corDefinida = true
            }
        })
        
      }
    })
    coresParaGraficos.push(cor)
    })
  )
        
  
    
    const kpis = document.querySelector('#div_kpis')
    const charts = document.querySelector('#div_charts')
    if(!kpisCriados){
      kpis.innerHTML = html_kpis_text
      valoresKpisSpans = document.querySelectorAll('.valores-kpis')
      kpisCriados = true
    }else{
      atualizarValoresKpis(dadosDasKpis, camposDasKpis, configsDasKpis)
    }
    if(!graficosCriados){

      charts.innerHTML = html_graficos_text
      graficosCriados = true

    }
    criarOuAtualizarGraficosChartJs(dadosParaGrafico, horarios, coresParaGraficos)
    if(!carrosseisCriados){
      console.log("CRIANDO DNV")
      gerarCarrossel()
      document.querySelectorAll('.swiper-button-next').forEach(el => el.style.opacity = 1)
      document.querySelectorAll('.swiper-button-prev').forEach(el => el.style.opacity = 1)  
      document.querySelector('.div-componentes').style.opacity = 1
      carrosseisCriados = true
    }

  }


const startMonitoramento = async (id) => {
  horaMudanca = getCurrentDateTime(true)
  monitoramentoInterval = setInterval(async() => {
  try{
    const dataFromPython = await fetch('/monitoramento/' + id,{      
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
      
  })
  const data = await dataFromPython.json()

  const charts = document.querySelector('#div_charts')
  const kpis = document.querySelector('#div_kpis')
  if(trocouPlc){
    kpis.innerHTML = ``
    charts.innerHTML = ``
    graficosCriados = false
    kpisCriados = false
    carrosseisCriados = false
    trocouPlc = false
  }
    if (data == "No data") { 
        
        const charts = document.querySelector('#div_charts')
        const kpis = document.querySelector('#div_kpis')
        kpis.innerHTML = `<h1>Não há dados para monitorar deste PLC</h1>`
        charts.innerHTML = ``
        graficosCriados = false
        kpisCriados = false
        carrosseisCriados = false
        // configuracoesObtidas = false
        instanciasGraficos = []
        document.querySelectorAll('.swiper-button-next').forEach(el => el.style.opacity = 0)
        document.querySelectorAll('.swiper-button-prev').forEach(el => el.style.opacity = 0)  
        document.querySelector('.div-componentes').style.opacity = 0
        return
    }

      
        criarHtmlsGraficoseKpis(data.dados)
      




}catch(e)  {
      console.error(e)
  }
  }, 1000)    

}


const fillSelectPlcs = (data) => {
    const select = document.querySelector('#select_plcs')
    data.forEach(plc => {
        const option = document.createElement('option')
        option.value = plc.id
        option.innerHTML = plc.plc
        select.appendChild(option)
    })
}

const pegarConfiguracoes = (plcs) => {
  plcs.forEach(plc => {
    const configuracoes = {
      plc_id: plc.id,
      configuracoes: plc.configs
    }
    configuracoesPlcs.push(configuracoes)

})
console.log(configuracoesPlcs, "TODAS")
} 

const getPlcsByEmpresaId = async (id) => {
  try{
    const response = await fetch('/plc/get/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
      });	
    const data = await response.json()
    console.log(data)
    fillSelectPlcs(data.plcs)
    pegarConfiguracoes(data.plcs)
  } catch (error) {
    console.error('Error:', error);
  }
}

selectEmpresas.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue)
    getPlcsByEmpresaId(selectedValue)
    
    
})


const getEmpresasByFabricanteId = async (id) => {
  try{
    const response = await fetch('/consumidor/select/' + sessionStorage.getItem("EMPRESA_ID"), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
      });	
    const data = await response.json()
    console.log(data)
    fillSelect(data.empresas)
  } catch (error) {
    console.error('Error:', error);
  }
}

const fillSelect = (data) => {
    const select = document.querySelector('#select_empresas')
    data.forEach(empresa => {
        const option = document.createElement('option')
        option.value = empresa.id
        option.innerHTML = empresa.razao_social
        select.appendChild(option)
    })
}

getEmpresasByFabricanteId(1)




let instanciasGraficos = []

const   criarOuAtualizarGraficosChartJs = (datas, horarios, cores) => {
  const graficos = document.querySelectorAll('.meuGrafico')

  graficos.forEach((canvas, i) => {
    const ctx = canvas.getContext('2d')

    // Se o gráfico já existe, apenas atualiza os dados
    if (instanciasGraficos[i]) {
      instanciasGraficos[i].data.labels = horarios
      instanciasGraficos[i].data.datasets[0].data = datas[i]
      instanciasGraficos[i].data.datasets[0].backgroundColor = cores[i].cor2
      instanciasGraficos[i].data.datasets[0].borderColor = cores[i].cor1
      instanciasGraficos[i].update()
    } else {
      // Cria o gráfico e armazena a instância
      const novoGrafico = new Chart(ctx, {
        type: 'line',
        data: {
          labels: horarios,
          datasets: [{
            label: 'Valor',
            data: datas[i],
            fill: true,
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgba(0, 123, 255, 1)',
            pointRadius: 5
          }]
        },
        options: {
          scales: {
            y: {
              // beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      })

      instanciasGraficos[i] = novoGrafico
    }
  })
}

const gerarCarrossel = () => {

  const larguraDispositivo = window.innerWidth;
  
  let criarCarrossel = false
  const qtdKpis = document.querySelectorAll('.kpi-box').length

  if(larguraDispositivo > 580 && qtdKpis > 4){
    criarCarrossel = true
  }else if(larguraDispositivo <= 580 && qtdKpis > 1){
    criarCarrossel = true
  }

if(criarCarrossel){
  const swiper = new Swiper('.kpisCarrossel', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1.3,
    spaceBetween: 10,
    breakpoints: {
      580: {
        slidesPerView: 4,
        spaceBetween: 10,
      }
    },
    pagination: {
      el: '.kpi-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.kpi-next',
      prevEl: '.kpi-prev',
    },
});
}


const swiperCharts = new Swiper('.chartsCarrossel', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1.4,
  spaceBetween: 15,
  breakpoints: {
    580: {
      slidesPerView: 2.8,
      spaceBetween: 10,
    }
  },
  // centeredSlides: true,
  pagination: {
    el: '.chart-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.chart-next',
    prevEl: '.chart-prev',
  },
  
});


}