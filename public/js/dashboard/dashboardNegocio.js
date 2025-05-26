// Gráfico de Meta

document.addEventListener("DOMContentLoaded", function() {
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
        colors: ['#FF8C00', '#D2CDCD'], 
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

    // Se precisar atualizar dinamicamente:
    // window.meuDonutProgresso = chartDonutProgresso;

});

// Função de exemplo para atualizar o gráfico (coloque fora do DOMContentLoaded se chamada de outros lugares)
/*
function atualizarDonutProgresso(novoqtdAtingida) {
    let valorTotal = 100; // Ou sua variável metaTotal
    let novaPorcentagemPreenchida = (novoqtdAtingida / valorTotal) * 100;
    let novametaPedidos = 100 - novaPorcentagemPreenchida;

    if (window.meuDonutProgresso) {
        window.meuDonutProgresso.updateSeries([novaPorcentagemPreenchida, novametaPedidos]);
    }
}
*/




// Gráfico de Cancelamentos
document.addEventListener("DOMContentLoaded", function() 
{var optionsCancel = {
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
});



// Gráfico de Taxa de Defeitos
document.addEventListener("DOMContentLoaded", function() {

     var optionsDefeitos = {
          series: [{
            name: "% Defeitos",
            data: [15, 10, 7, 23, 14]
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
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        }
        };

        var chartDefeitos = new ApexCharts(document.querySelector("#chart-defeitos"), optionsDefeitos);
        chartDefeitos.render();

});



// Gráfico % de Defeito por Modelo
document.addEventListener("DOMContentLoaded", function() {

    var optionsModelos = {
          series: [{
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5]
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
          formatter: function (val, opt) {
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
          categories: ['LOGO!', 'SISMATIC S7-200', 'SISMATIC S7-400', 'SISMATIC S7-1200', 'SISMATIC S7-1500', 'SISMATIC ET 200SP', 'SISMATIC ET 200MP', 'SISMATIC S5', 'SISMATIC S7-1500T', 'SISMATIC S7-1500F', 'SISMATIC S7-300F'],
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
              formatter: function () {
                return ''
              }
            }
          }
        }
        };

        var chartModelos = new ApexCharts(document.querySelector("#chart-modelos"), optionsModelos);
        chartModelos.render();

});