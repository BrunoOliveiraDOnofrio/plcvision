let empresaSelecionada
let textoDoModal
let idsPlcsParaMonitorar = [1];
let alertas 
let tempoRealDados

const divLoading = document.getElementById('div_loading');
const main = document.querySelector('.main');
const empresaId = sessionStorage.EMPRESA_ID


function sortMachineDataAndAlerts(machineCriticalityData, alertsData) {
  // 1. Sort the machine criticality data by 'vezesForaPadrao' in descending order
  const sortedMachineCriticality = [...machineCriticalityData].sort((a, b) => {
    return b.vezesForaPadrao - a.vezesForaPadrao;
  });

  // 2. Create a map of alerts, grouped by plcId, for efficient lookup
  const alertsByPlcId = alertsData.reduce((acc, alert) => {
    if (!acc[alert.plcId]) {
      acc[alert.plcId] = [];
    }
    acc[alert.plcId].push(alert);
    return acc;
  }, {});

  // 3. Build the final sorted alerts array based on the sorted machine criticality order
  const sortedAlerts = [];
  sortedMachineCriticality.forEach(machine => {
    const plcId = machine.maquina_id.toString(); // Ensure we're comparing strings if plcId is string
    if (alertsByPlcId[plcId]) {
      // Add all alerts for this plcId
      sortedAlerts.push(...alertsByPlcId[plcId]);
      // Optionally, you might want to sort alerts within the same plcId
      // For example, by dataCriacao or another relevant field if needed.
      // For now, they'll appear in their original order within each plcId group.
    }
  });

  return {
    sortedMachineCriticality: sortedMachineCriticality,
    sortedAlerts: sortedAlerts,
  };
}


const filtrarETrazerDadosTempoReal = async () => {

    let idsPlcs =[]

    idsPlcsParaMonitorar.forEach(numero => {
        idsPlcs.push(Number(numero))
    })
    const url = `/monitoramento/empresas/${empresaId}/monitorar`
    console.log(url)
    await fetch(`/monitoramento/empresas/${empresaId}/monitorar`, {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idsPlcs: idsPlcs
            })
    }).then(response => response.json().then(response => {
        console.log(response)
        tempoRealDados = response
    }))

    



}
const ativarTela = () => {
    divLoading.style.display = 'none';
    
    main.style.animation = 'showTela 0.5s ease-in-out';

    setTimeout(()=> {
        
        main.style.display = 'flex';
        main.style.animation = '';
        main.style.opacity = '1';
    }, 450)
}

fillLinhaDoTempo = (issues) => {
    const div_events = document.getElementById('div_events');

    let html = '';
    issues.forEach(issue => {
        
        let cor = issue.nivelAlerta == 'Atenção' ? "#fc9a0a" : "#FC3A0A"
        
        html += `  <div class="event">
                            <div class="ball-desc">
                                <div style="background-color:${cor}" class="ball"></div>
                                <div class="desc">
                                    <span>${issue.dataCriacao} Alerta ${issue.nivelAlerta}</span>
                                    <span>PLC ${issue.plcId}</span>
                                </div>
                            </div>
                        </div>`;
    });
    div_events.innerHTML = html;
}


const criarCarrosselDeAlertas = () => {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: {
        768: {
          slidesPerView: 2,
        }
      }
      ,pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
}


function prepararTextoParaParametro(texto) {
    
    return texto.replaceAll("\\", ' ').replace(/\s+/g, ' ').trim().replaceAll('"', '\\"').replaceAll("'", "\\'").replaceAll('"', '');
}

const fillHtmlAlertas = (issues) => {
    const wrapper = document.getElementById('div_wrapper');
    console.log(issues)
    let html = '';
    issues.forEach(issue => {
        let texto = prepararTextoParaParametro(issue.texto);
        let cor = issue.nivelAlerta == 'Atenção' ? "#fc9a0a" : "#FC3A0A"
        
        html += `<div style="background-color:${cor}" class="swiper-slide">
                            <div class="title-esc">
                                <div class="titulo">
                                    <!-- icone -->
                                    <i class="fa-solid fa-bell"></i>
                                     
                                     <span>Alerta ${issue.nivelAlerta} - PLC ${issue.plcId}</span>
                                </div>
                                <i class='bx  bx-x'></i>
                            </div>
                            <div class="desc-alerta">
                                <span>${issue.titulo}</span>
                            </div>
                            <div class="tempo-button">
                                <span>${issue.atraso}</span>
                                <button onclick="abrirModal('','${texto}')">Comunicar</button>
                            </div>
                        </div>`
    });
    wrapper.innerHTML = html;
    criarCarrosselDeAlertas();
}

const getAlertasComTempoDeRespostaAtrasado = async (razao_social) => {
    fetch('/jira/alertas').then(response => response.json().then(async response =>{
        
        
        console.log(response.issues)
        empresaSelecionada = response.issues.map(empresa =>{
            if(empresa.empresa == razao_social){
                return empresa
            }
        })
        if(empresaSelecionada == [undefined]){
            return await getEmpresasRankeadas()
        } 
        console.log(empresaSelecionada)
        empresaSelecionada = empresaSelecionada[0]
        console.log(empresaSelecionada)
        alertas = empresaSelecionada.issues
        qtdAlertas.innerText = empresaSelecionada.issues.length
        await plotarQtdPlcsNoJira(empresaSelecionada.issues);
        console.log(sortMachineDataAndAlerts(tempoRealDados, alertas))
        const {sortedMachineCriticality, sortedAlerts} =sortMachineDataAndAlerts(tempoRealDados, alertas)
        fillHtmlAlertas(sortedAlerts);
        fillLinhaDoTempo(sortedAlerts);
        plotCriticalityChart(sortedMachineCriticality)
        ativarTela();
     }
    ))
} 


function plotCriticalityChart(machineCriticalityData) {
  // Sort the machine criticality data by 'vezesForaPadrao' in descending order
  // We'll filter out machines with 0 'vezesForaPadrao' as they are not critical
  const sortedAndFilteredData = [...machineCriticalityData]
    .filter(machine => machine.vezesForaPadrao > 0) // Only include critical machines
    .sort((a, b) => b.vezesForaPadrao - a.vezesForaPadrao);

  // Take the top 5 (or fewer if less than 5 critical machines)
  const topCriticalMachines = sortedAndFilteredData.slice(0, 5);

  // Prepare labels and data for the chart
  const labels = topCriticalMachines.map(machine => `PLC - ${machine.maquina_id}`);
  const data = topCriticalMachines.map(machine => machine.vezesForaPadrao);

  // Get the canvas context
  const ctx = document.getElementById('myChart').getContext('2d');

  // Destroy existing chart if it exists to prevent re-rendering issues
  if (window.myChartInstance) {
    window.myChartInstance.destroy();
  }

  // Create the new chart
  window.myChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, // Dynamically generated labels (e.g., 'PLC - 8', 'PLC - 4')
      datasets: [{
        label: 'Vezes Fora do Padrão', // Meaningful label for the dataset
        data: data, // Dynamically generated data (vezesForaPadrao)
        backgroundColor: 'orangered',
        borderRadius: 6,
        barThickness: 30
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false // Hide legend as there's only one dataset
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Quantidade de Registros Fora do Padrão', // Updated Y-axis title
            font: { size: 14, weight: 'bold' },
            color: 'black'
          },
          ticks: {
            stepSize: 1, // Set step size to 1 for whole numbers of "vezesForaPadrao"
            color: 'black',
            font: { weight: 'bold' }
          }
        },
        x: {
          grid: {
            display: false
          },
          title: {
            display: true,
            text: 'PLCs com Situação Crítica (Top 5)', // Updated X-axis title
            font: { size: 14, weight: 'bold' },
            color: 'black'
          },
          ticks: {
            font: { size: 14, weight: 'bold', color: 'black' },
          }
        }
      }
    }
  });
}


const getEmpresasRankeadas = async () => {
    fetch('/monitoramento/empresas').then(response => response.json().then(response =>{
        console.log(response)
        getAlertasComTempoDeRespostaAtrasado(response[0].razao_social)
        fillRanking(response)
        fillDistribuicaoDeAlertas(response)
    }))
}


const plotarQtdPlcsNoJira = async (issues) => {
    console.log(issues)
    const qtdPlcs = document.getElementById('qtdPlcs');
    const plcsIds = issues.map(issue => issue.plcId);
    const uniquePlcs = [...new Set(plcsIds)];
    idsPlcsParaMonitorar = uniquePlcs;
    await filtrarETrazerDadosTempoReal()
    qtdPlcs.innerText = uniquePlcs.length;
}


const fillRanking = (empresas) => {
    const ranking = document.getElementById('lista_empresa_criticidade')
    let html = '';

    empresas.forEach(empresa => {
        let cor = empresa.porcentagemBarra == 66 ? 'orange' : empresa.porcentagemBarra == 100 ? 'red' : 'green';
        let razao_social = empresa.razao_social.split(' ')[0]
        html += `<div class="line-cliente">
                        <span>${razao_social}</span>
                        <div class="barra-criticidade">
                            <div style="width: ${empresa.porcentagemBarra}%; background-color:${cor}" class="barra-preenchida"></div>
                        </div>
                    </div>`

    });
    ranking.innerHTML = html;
}

const fillDistribuicaoDeAlertas = (empresas) => {
    const divQtdAlertas = document.getElementById('div_qtd_alertas');
    let html = ""
    empresas.forEach(empresa => {
        let razao_social = empresa.razao_social.split(' ')[0]
        let critico = empresa.criticos ? empresa.criticos : 0
        let atencao = empresa.atencao ? empresa.atencao : 0
        html += `<div class="line-cliente">
                        <span>${razao_social}</span>
                        <div class="alertas-rounded">
                            <div class="criticos">
                                <span>Críticos ${critico}</span>
                            </div>
                            <div class="atencao">
                                <span>Críticos ${atencao}</span>
                            </div>
                        </div>
                    </div>`
    })
    divQtdAlertas.innerHTML = html;



}



getEmpresasRankeadas()