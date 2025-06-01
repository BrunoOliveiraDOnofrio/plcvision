let empresaSelecionada
let textoDoModal
let idsPlcsParaMonitorar = [];
let alertas 
let tempoRealDados
let ranking;
let indiceAtualEmpresa = 0
let atualizarGraficoInterval

const buttonMudar = document.getElementById('btn_mudar_alertas')

buttonMudar.addEventListener('click', () => mostrarAlertasAlterados())
const mostrarAlertasNormais = () => {
    fillHtmlAlertas(alertas)
    buttonMudar.innerText = `Ver Alertas em Progresso`
    buttonMudar.addEventListener('click', () => mostrarAlertasAlterados())
}

const mostrarAlertasAlterados = () => {
    if(alertasComunicados.length >0){
        fillHtmlAlertas(alertasComunicados)
        buttonMudar.innerText = "Voltar"
        buttonMudar.addEventListener('click', () => mostrarAlertasNormais())
     }else{
        mostrarModalSemAlertas()
        return
    }
}



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


const ativarLoading = () => {
    divLoading.style.display = 'flex';
    
    main.style.animation = '';

    setTimeout(()=> {
        
        main.style.display = 'none';
        main.style.animation = 'showTela 0.5s ease-in-out';
        main.style.opacity = '0';
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
        let cor = issue.plotar ? "#24284B" : issue.nivelAlerta == 'Atenção' ? "#fc9a0a" : "#FC3A0A"
        let atraso =-issue.plotar ? `Status alterado em: ${issue.horarioAtualizacao}` : issue.atraso 
        html += `<div id="${issue.issueKey}" style="background-color:${cor}" class="swiper-slide">
                            <div class="title-esc">
                                <div class="titulo">
                                    <!-- icone -->
                                    <i class="fa-solid fa-bell"></i>
                                     
                                     <span>Alerta ${issue.nivelAlerta} - PLC ${issue.plcId}</span>
                                </div>`

                            if(issue.plotar){
                                    html += `<i onclick="removerAlertasAlterados(this)" class='bx  bx-x'></i>`
                                    
                            } 
                            html+=`</div>
                            <div class="desc-alerta">
                                <span>${issue.titulo}</span>
                            </div>
                            <div class="tempo-button">
                                <span>${atraso}</span>`
                                if(!issue.plotar){
                                html+= `<button onclick="abrirModal('','${texto}', '${issue.atraso}', '${issue.empresa}', '${issue.nivelAlerta}', '${issue.issueKey}')">Comunicar</button>`
                                }
                            html+=`</div>
                        </div>`
    });
    wrapper.innerHTML = html;
    criarCarrosselDeAlertas();
}

const buscarIssuesEAtualizarGraficos = async (razao_social) => {
    fetch('/jira/alertas').then(response => response.json().then(async response =>{
        
        
        console.log(response.issues)
        
        empresaSelecionada = response.issues.filter(empresa =>{
            if(empresa.empresa == razao_social){
                return empresa
            }
        })
        // if(empresaSelecionada == [undefined]){
        //     return await getEmpresasRankeadas()
        // } 
        
        empresaSelecionada = empresaSelecionada[0]
        
        alertas = empresaSelecionada.issues
        
        await plotarQtdPlcsNoJira(empresaSelecionada.issues);
        
        await filtrarETrazerDadosTempoReal()
        let {sortedMachineCriticality, sortedAlerts} =sortMachineDataAndAlerts(tempoRealDados, alertas)
        if(sortedAlerts.length == 0){
          sortedAlerts = alertas  
        } else{
            alertas = sortedAlerts
        }
        // fillHtmlAlertas(sortedAlerts);
        fillLinhaDoTempo(sortedAlerts);
        plotCriticalityChart(sortedMachineCriticality)
        
        
        
     }
    ))
}

const getAlertasComTempoDeRespostaAtrasado = async (razao_social) => {
    fetch('/jira/alertas').then(response => response.json().then(async response =>{
        
        
        console.log(response.issues)
        
        empresaSelecionada = response.issues.filter(empresa =>{
            if(empresa.empresa == razao_social){
                return empresa
            }
        })
        if(empresaSelecionada == [undefined]){
            return await getEmpresasRankeadas()
        } 
        document.getElementById('h1_empresa').innerText ="Monitoramento " + razao_social
        document.getElementById('span_nome_empresa').innerText = razao_social.split(' ')[0]
        empresaSelecionada = empresaSelecionada[0]
        console.log(empresaSelecionada)
        alertas = empresaSelecionada.issues
        qtdAlertas.innerText = empresaSelecionada.issues.length
        await plotarQtdPlcsNoJira(empresaSelecionada.issues);
        console.log(sortMachineDataAndAlerts(tempoRealDados, alertas))
        let {sortedMachineCriticality, sortedAlerts} =sortMachineDataAndAlerts(tempoRealDados, alertas)
        if(sortedAlerts.length == 0){
          sortedAlerts = alertas  
        } else{
            alertas = sortedAlerts
        }
        fillHtmlAlertas(sortedAlerts);
        fillLinhaDoTempo(sortedAlerts);
        plotCriticalityChart(sortedMachineCriticality)
        if(atualizarGraficoInterval) clearInterval(atualizarGraficoInterval)
        atualizarGraficoInterval = setInterval(() => buscarIssuesEAtualizarGraficos(razao_social), 2*10000)
        ativarTela();
        iniciarVerificacoesSituacao()
     }
    ))
} 
Chart.register(ChartDataLabels);
// function plotCriticalityChart(machineCriticalityData) {
   
   
//     const sortedAndFilteredData = [...machineCriticalityData]
//         .filter(machine => machine.vezesForaPadrao > 0) // Only include critical machines
//         .sort((a, b) => b.vezesForaPadrao - a.vezesForaPadrao);

    
//     const topCriticalMachines = sortedAndFilteredData.slice(0, 5);

    
    
//     const labels = topCriticalMachines.map(machine => `PLC - ${machine.maquina_id}`);
//     const data = topCriticalMachines.map(machine => machine.vezesForaPadrao);

    
//     const ctx = document.getElementById('myChart').getContext('2d');

    
//     if (window.myChartInstance) {
//         window.myChartInstance.destroy();
//     }

   
//     window.myChartInstance = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: labels, 
//             datasets: [{
//                 label: 'Vezes Fora do Padrão',
//                 data: data,
//                 backgroundColor: 'orangered',
//                 borderRadius: 6,
//                 barThickness: 30
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: {
//                 legend: {
//                     display: false 
//                 },
//                 datalabels: { 
//                     display: true, 
//                     anchor: 'end', 
//                     align: 'end', 
//                     offset: 4, 
//                     color: 'black', 
//                     font: {
//                         weight: 'bold',
//                         size: 12
//                     },
//                     formatter: function(value, context) {
                       
//                         const machineIndex = context.dataIndex;
//                         const machine = topCriticalMachines[machineIndex];
                       
//                         return machine.campoMaisCritico + " (" + machine.valorMaisCritico + ")";
//                     }
//                 }
//             },
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     max: 9,
//                     title: {
//                         display: true,
//                         text: 'Registros Anormais', 
//                         font: { size: 12, weight: 'bold' },
//                         color: 'black'
//                     },
//                     ticks: {
//                         stepSize: 1,
//                         color: 'black',
//                         font: { weight: 'bold' }
//                     }
//                 },
//                 x: {
//                     grid: {
//                         display: false
//                     },
//                     title: {
//                         display: true,
//                         text: 'PLCs com Situação Crítica (Top 5)', 
//                         font: { size: 14, weight: 'bold' },
//                         color: 'black'
//                     },
//                     ticks: {
//                         font: { size: 14, weight: 'bold', color: 'black' },
                       
//                     }
//                 }
//             }
//         }
//     });
// }

function plotCriticalityChart(machineCriticalityData) {
    const sortedAndFilteredData = [...machineCriticalityData]
        .filter(machine => machine.vezesForaPadrao > 0) // Only include critical machines
        .sort((a, b) => b.vezesForaPadrao - a.vezesForaPadrao);

    const topCriticalMachines = sortedAndFilteredData.slice(0, 5);

    const ctx = document.getElementById('myChart').getContext('2d');

    
    if (window.myChartInstance) {
        window.myChartInstance.destroy();
        window.myChartInstance = null; 
    }

    if (topCriticalMachines.length === 0) {
        
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 

        ctx.font = '14px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Nenhum PLC em estado crítico no momento atual.', ctx.canvas.width / 2, ctx.canvas.height / 2);

    } else {
        
        const labels = topCriticalMachines.map(machine => `PLC - ${machine.maquina_id}`);
        const data = topCriticalMachines.map(machine => machine.vezesForaPadrao);

        window.myChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Vezes Fora do Padrão',
                    data: data,
                    backgroundColor: 'orangered',
                    borderRadius: 6,
                    barThickness: 30
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    datalabels: {
                        display: true,
                        anchor: 'end',
                        align: 'end',
                        offset: 4,
                        color: 'black',
                        font: {
                            weight: 'bold',
                            size: 12
                        },
                        formatter: function(value, context) {
                            const machineIndex = context.dataIndex;
                            const machine = topCriticalMachines[machineIndex];
                            return machine.campoMaisCritico + " (" + machine.valorMaisCritico + ")";
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 9,
                        title: {
                            display: true,
                            text: 'Registros Anormais',
                            font: { size: 12, weight: 'bold' },
                            color: 'black'
                        },
                        ticks: {
                            stepSize: 1,
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
                            text: 'PLCs com Situação Crítica (Top 5)',
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
}



const getEmpresasRankeadas = async () => {
    fetch('/monitoramento/empresas').then(response => response.json().then(response =>{
        console.log(response)
        ranking = response
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
        html += `<div onclick="getAlertasComTempoDeRespostaAtrasado('${empresa.razao_social}')" class="line-cliente">
                        <span>${razao_social}</span>
                        <div class="barra-criticidade">
                            <div style="width: ${empresa.porcentagemBarra}%; background-color:${cor}" class="barra-preenchida"></div>
                        </div>
                        <div class="monitor-tooltip">
                        Clique para monitorar
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
        html += `<div onclick="getAlertasComTempoDeRespostaAtrasado('${empresa.razao_social}')" class="line-cliente">
                        <span>${razao_social}</span>
                        <div class="alertas-rounded">
                            <div class="criticos">
                                <span>Críticos ${critico}</span>
                            </div>
                            <div class="atencao">
                                <span>Atenção ${atencao}</span>
                            </div>
                        </div>
                        <div class="monitor-tooltip">
                            Clique para monitorar
                        </div>
                    </div>`
    })
    divQtdAlertas.innerHTML = html;
   



}



getEmpresasRankeadas()