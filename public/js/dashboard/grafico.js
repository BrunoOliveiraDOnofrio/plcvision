function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // meses começam em 0
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

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
    }else if(dadosAlerta.tipo_valor == "RAM Memória Livre Bytes"){
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

selectPlcs.addEventListener('change', (event) => {
    fecharAlerta()
    const selectedValue = event.target.value;
    monitoramentoInterval && clearInterval(monitoramentoInterval)
    startMonitoramento(selectedValue)

})

const criarHtmlsGraficoseKpis = (data) => {
    html_graficos_text = ""
    html_kpis_text = ""

    let dadosParaCriacao = data[data.length - 1]
    dadosParaCriacao.pop()
    dadosParaCriacao.forEach(dado => {

      if(dado.campo == "RAM Uso em Bytes Bytes"){
        dado.valor = Number((dado.valor / (1024 **3)).toFixed(2))
        dado.campo = "RAM Uso em GB"
      }else if(dado.campo == "RAM Memória Livre Bytes"){
        dado.valor = Number((dado.valor / (1024 **3)).toFixed(2))
        dado.campo = "RAM Memória Livre em GB"
      }
      html_kpis_text += `<div class="kpi-box">
                    <div class="value">
                        <span>${dado.valor}</span> 
                    </div>
                    <div class="desc">
                       <span>${dado.campo}</span>
                    </div>
                </div>`
      if(!graficosCriados){
      html_graficos_text += `<div class="charts-div">
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
        dado.forEach(dado => {
      // console.log(dado)
      
        
      if(dado.campo == "none"){
        let hora = dado.valor.split(" ")[1]
        horarios.push(hora)
      }else{
        if(dado.campo == "RAM Uso em Bytes Bytes"){
          dado.valor = Number((dado.valor / (1024 **3)).toFixed(2))
          dado.campo = "RAM Uso em GB"
        }else if(dado.campo == "RAM Memória Livre Bytes"){
          dado.valor = Number((dado.valor / (1024 **3)).toFixed(2))
          dado.campo = "RAM Memória Livre em GB"
        }
        linhaDeValores.push(dado.valor)
      }
        
    }) 
    
    dadosGrafico.push(linhaDeValores)
  })

    //organizar os dados para o gráfico

    let dadosParaGrafico = []

    for(let j = 0; j < dadosGrafico[0].length; j++){
      let linha = []
      for(let i = 0; i < dadosGrafico.length; i++){
        linha.push(dadosGrafico[i][j])
      }
      dadosParaGrafico.push(linha)
    } 

    
    const kpis = document.querySelector('#div_kpis')
    const charts = document.querySelector('#div_charts')
    kpis.innerHTML = html_kpis_text
    if(!graficosCriados){

      charts.innerHTML = html_graficos_text
    }
    criarOuAtualizarGraficosChartJs(dadosParaGrafico, horarios)
    graficosCriados = true

  }


const startMonitoramento = async (id) => {
  horaMudanca = getCurrentDateTime()
  monitoramentoInterval = setInterval(async() => {
  try{
    const dataFromPython = await fetch('/monitoramento/' + id,{      
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
      
  })
  const data = await dataFromPython.json()
    if (data == "No data") { 
        console.log("No data")
        const charts = document.querySelector('#div_charts')
        const kpis = document.querySelector('#div_kpis')
        kpis.innerHTML = `<h1>Não há dados para monitorar deste PLC</h1>`
        charts.innerHTML = ``
        graficosCriados = false
        instanciasGraficos = []
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



// const criarGraficosChartJs = (datas, horarios) => {

// const graficos = document.querySelectorAll('.meuGrafico')
// console.log(graficos)


// for(let i =0; i < graficos.length; i++){
//     const ctx = graficos[i].getContext('2d')
//     const meuGrafico = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: horarios,
//           datasets: [{
//             label: 'Valor',
//             data: datas[i],
//             fill: true,
//             backgroundColor: 'rgba(0, 123, 255, 0.2)',
//             borderColor: 'rgba(0, 123, 255, 1)',
//             borderWidth: 2,
//             tension: 0.4,
//             pointBackgroundColor: '#fff',
//             pointBorderColor: 'rgba(0, 123, 255, 1)',
//             pointRadius: 5
//           }]
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//               // max: 100
//             }
//           },
//           plugins: {
//             legend: {
//               display: false
//             }
//           }
//         }
//       });
      
// }
// }

let instanciasGraficos = []

const criarOuAtualizarGraficosChartJs = (datas, horarios) => {
  const graficos = document.querySelectorAll('.meuGrafico')

  graficos.forEach((canvas, i) => {
    const ctx = canvas.getContext('2d')

    // Se o gráfico já existe, apenas atualiza os dados
    if (instanciasGraficos[i]) {
      instanciasGraficos[i].data.labels = horarios
      instanciasGraficos[i].data.datasets[0].data = datas[i]
      
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
              beginAtZero: true
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