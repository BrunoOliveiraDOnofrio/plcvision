// Empresa mais afetada
function carregarKPI1(){
    const kpi1 = document.getElementById("empresa-afetada");
    console.log(kpi1)
    fetch(`/adm/dashNegocio/empresaMaisAfetada/${sessionStorage.getItem('EMPRESA_ID')}`)
        .then((response) => {
            return response.json();
        })
        .then((dados) => {
            console.log("Empresa mais Afetada:", dados);
            kpi1.innerHTML = dados[0].razao_social.split(' ')[0].toUpperCase();
        })
        .catch((error) => {
            console.log("Erro:", error);
            kpi1.innerHTML = "baguete";
        });
}



// Mês com maior taxa de defeitos
function carregarKPI2(){
    const kpi2 = document.getElementById("mes-afetado");
    console.log(kpi2)
    fetch(`/adm/dashNegocio/mesMaisAfetado/${sessionStorage.getItem('ALERTA_ID')}`)
        .then((response) => {
            return response.json();
        })
        .then((dados) => {
            console.log("Mês com maior taxa de defeitos:", dados);
            
            const month = {
            "01": "Janeiro",
            "02": "Fevereiro",
            "03": "Março",
            "04": "Abril",
            "05": "Maio",
            "06": "Junho",
            "07": "Julho",
            "08": "Agosto",
            "09": "Setembro",
            "10": "Outubro",
            "11": "Novembro",
            "12": "Dezembro"
            }
            
            kpi2.innerHTML = month[dados[0].dataHoraMod].toUpperCase();
        })
        .catch((error) => {
            console.log("Erro:", error);
            kpi2.innerHTML = "baguete";
        });
}



// Modelo com maior taxa de defeitos
function carregarKPI3(){
    const kpi3 = document.getElementById("modelo-defeito");
    console.log(kpi3)
    fetch(`/adm/dashNegocio/modeloMaisAfetado/${sessionStorage.getItem('EMPRESA_ID')}`)
        .then((response) => {
            return response.json();
        })
        .then((dados) => {
            console.log("Modelo mais afetado:", dados);
            kpi3.innerHTML = dados[0].modelo.toUpperCase();
        })
        .catch((error) => {
            console.log("Erro:", error);
            kpi3.innerHTML = "baguete";
        });
}

function carregarKPI4(){
    const kpi4 = document.getElementById("modelo-vendido");
    console.log(kpi4)
    fetch(`/adm/dashNegocio/modeloMaisVendido/${sessionStorage.getItem('EMPRESA_ID')}`)
        .then((response) => {
            return response.json();
        })
        .then((dados) => {
            console.log("Modelo mais vendido:", dados);
            kpi4.innerHTML = dados[0].modelo.toUpperCase();
        })
        .catch((error) => {
            console.log("Erro:", error);
            kpi4.innerHTML = "baguete";
        });
}



// Gráfico de Meta
function gerarMetaVendas (){
  let metaTotal = 100;
    let qtdAtingida = 74;

    let qtdAtual = (qtdAtingida / metaTotal) * 100;
    let metaPedidos = 100 - qtdAtual;

    var optionsMeta = {
        series: [qtdAtual, metaPedidos],
        chart: {
            type: 'donut',
            height: 250, 
            width: "90%" 
        },
        plotOptions: {
            pie: { 
                donut: {
                    size: '40%', 
                    labels: {
                        show: true,
                        name: { 
                            show: false
                        },
                        value: { 
                            show: false
                        },
                        total: { 
                            show: true,
                            showAlways: true, 
                            label: '', 
                            fontSize: '28px', 
                            fontWeight: 'bold',
                            color: '#373d3f',
                            formatter: function (w) {
                               
                                return parseFloat(w.globals.series[0]).toFixed(0) + '%';
                            }
                        }
                    }
                }
            }
        },
        colors: ['#FFB20E', '#D2CDCD'], 
        labels: ['Qtd. Atual', '% até atingir a Meta'],
        legend: {
            show: true,
            position: 'bottom',
            fontSize: '15vw'
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function(val) {
                    return parseFloat(val).toFixed(0) + "%";
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200, 
                    height: 220
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '70%',
                            labels: {
                                total: {
                                    fontSize: '22px'
                                }
                            }
                        }
                    }
                }
            }
        }],
        stroke: {
            show: false
        }
    };

    let containerDoGrafico = document.querySelector("#chart-meta");
    if (containerDoGrafico.hasChildNodes()) {
        containerDoGrafico.innerHTML = '';
    }

    var chartMeta = new ApexCharts(containerDoGrafico, optionsMeta);
    chartMeta.render();
}





// Gráfico de Cancelamentos
function gerarPainelCancel() {

var optionsCancel = {
        series: [{
        name: 'Média de Cancelamentos',
        data: [7]
      }, {
        name: 'Qtd. de Cancelamentos Atual',
        data: [4]
      }],
        chart: {
        type: 'bar',
        height: 280
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
          borderRadiusApplication: 'end'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Maio'],
      },
      fill: {
        opacity: 1
      },
      legend: {
          show: true,
          position: 'bottom',
          fontSize: '15vw'
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " pedidos"
          }
        }
      }
      };
      
      var chartCancel = new ApexCharts(document.querySelector("#chart-cancel"), optionsCancel);
      chartCancel.render();
}




// Gráfico de Taxa de Defeitos
async function gerarGraficoTaxaDefeitos() {

  const request = await fetch(`/adm/dashNegocio/taxaDefeitosMes/${sessionStorage.getItem('EMPRESA_ID')}`);
  const dadosMes = await request.json();
  console.log(dadosMes);

  const dados = [];
  const meses = [];

  const somaTotal = dadosMes.reduce((soma, valor)=> soma += valor.qtd, 0);
  console.log(somaTotal);
  
  for(let dado of dadosMes) {
    const month = {
            "01": "Janeiro",
            "02": "Fevereiro",
            "03": "Março",
            "04": "Abril",
            "05": "Maio",
            "06": "Junho",
            "07": "Julho",
            "08": "Agosto",
            "09": "Setembro",
            "10": "Outubro",
            "11": "Novembro",
            "12": "Dezembro"
            }
      
        const nomeMes = month[dado.mes];
        const prctDefeito = ((dado.qtd/somaTotal) * 100).toFixed(2);

    dados.push(prctDefeito);
    meses.push(nomeMes);
  }

var optionsDefeitos = {
        series: [{
          name: "% Defeitos",
          data: dados,
          colors: ['#4B5293']
      }],
        chart: {
          height: 280,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], 
          opacity: 0.5
        },
      },
      xaxis: {
        categories: meses,
      },
      yaxis: {
        labels: {
          formatter: function(valor){
            return valor + "%";
          }
        }
      }
      };

      var chartDefeitos = new ApexCharts(document.querySelector("#chart-defeitos"), optionsDefeitos);
      chartDefeitos.render();

}



// Gráfico % de Defeito por Modelo
async function gerarGraficoDefeitosPorModelo(){

  const request = await fetch(`/adm/dashNegocio/taxaDefeitosPorModelo/${sessionStorage.getItem('EMPRESA_ID')}`);
  const dadosModelos = await request.json();
  console.log(dadosModelos);

  const dados = [];
  const modelos = [];

  const somaTotal = dadosModelos.reduce((soma, valor)=> soma += valor.qtd, 0);
  console.log(somaTotal);

  for(let dado of dadosModelos) {
    
    const prctDefeito = ((dado.qtd/somaTotal) * 100).toFixed(1);

    dados.push(prctDefeito);
    modelos.push(dado.modelo);
  }

  const chartModelosContainer = document.querySelector("#chart-modelos");
    let chartModelosInstance = null;

    const optionsModelosMobile = {
        series: [{
            data: dados
        }],
        chart: {
          type: 'bar',
            height: 500 
        },
        plotOptions: {
            bar: {
              barHeight: '100%',
                distributed: true,
                horizontal: true,
                dataLabels: {
                    position: 'bottom'
                },
            }
        },
        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
            '#f48024', '#69d2e7'
        ],
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
              colors: ['#fff']
            },
            formatter: function(val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val + "%"
            },
            offsetX: 0,
            dropShadow: {
                enabled: true
            }
          },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: modelos,
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
              },
            y: {
                title: {
                  formatter: function() {
                        return ''
                    }
                }
            }
        }
    };
    

    const optionsDesktop = {
      series: [{
            name: 'Taxa de Defeito', 
            data: dados,
            colors: ['#4B5293']
        }],
        chart: {
          height: 300,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: '15px !important',
            colors: ["#304758"]
          }
        },
        xaxis: {
          categories: modelos,
          position: 'bottom',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            style: {
                    fontSize: '12px !important', 
                    fontFamily: 'Inter'
                }
            },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            }
          }
        }
        };

    function updateChart() {
        if (!chartModelosContainer) return;

        const isDesktop = window.matchMedia("(min-width: 702px)").matches;
        const currentOptions = isDesktop ? optionsDesktop : optionsModelosMobile;

        if (chartModelosInstance) {
            chartModelosInstance.destroy();
          }
          
          chartModelosContainer.innerHTML = ''; 
          
          chartModelosInstance = new ApexCharts(chartModelosContainer, currentOptions);
          chartModelosInstance.render();
    }
    
    updateChart();

    window.matchMedia("(min-width: 702px)").addEventListener('change', updateChart);

}
    


document.addEventListener("DOMContentLoaded", function() {
    
    carregarKPI1();
    carregarKPI2();
    carregarKPI3();
    carregarKPI4();
    gerarMetaVendas();
    gerarPainelCancel();
    gerarGraficoTaxaDefeitos();
    gerarGraficoDefeitosPorModelo();

});