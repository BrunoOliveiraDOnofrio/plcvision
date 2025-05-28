var datayC = [];
var dataxC = [];
var pontosDePerda = 0;
var myChartBarra2 = null; // Para o gráfico que será atualizado dinamicamente

function calcularRegressaoLinear(pontosDeDados) {
    const n = pontosDeDados.length;

    if (n < 2) {
        console.warn("São necessários pelo menos 2 pontos para calcular regressão/correlação.");
        return { m: 0, b: 0, r: NaN };
    }

    var somaX = 0;
    var somaY = 0;
    var somaXY = 0;
    var somaXQuadrado = 0;
    var somaYQuadrado = 0;

    for (var i = 0; i < n; i++) {
        const pontoAtual = pontosDeDados[i];
        const x = pontoAtual[0];
        const y = pontoAtual[1];
        somaX += x;
        somaY += y;
        somaXY += x * y;
        somaXQuadrado += x * x;
        somaYQuadrado += y * y;
    }

    // Numerador é o mesmo para 'm' e 'r'
    const numerador = n * somaXY - somaX * somaY;
    // Denominador para 'm'
    const denominadorM = n * somaXQuadrado - somaX * somaX;

    var m;
    if (denominadorM == 0) {
        m = 0;
    } else {
        m = numerador / denominadorM;
    }

    const b = (somaY - m * somaX) / n;

    var r;
    const denominadorParteY = n * somaYQuadrado - somaY * somaY;
    const produtoDenominadoresR = denominadorM * denominadorParteY;

    if (produtoDenominadoresR <= 0) {
        if (denominadorM == 0 || denominadorParteY == 0) {
            r = 0;
        } else if (numerador == 0) {
            r = 0;
        } else {
            r = 0;
        }
    } else {
        const denominadorR = Math.sqrt(produtoDenominadoresR);

        if (denominadorR == 0) {
            if (numerador == 0) {
                r = 0;
            } else if (numerador > 0) {
                r = 1;
            } else { 
                r = -1;
            }
        } else {
            r = numerador / denominadorR;
        }
    }

    if (isNaN(r)) {
        r = 0;
    }

    if (r > 1) {
        r = 1;
    } else if (r < -1) {
        r = -1;
    }

    return { m: m, b: b, r: r };
}

function criarGraficosEstaticos() {
    const GraficoBarra = document.getElementById('graficoBarra')
    const GraficoLinha = document.getElementById('graficoLinha')
    const GraficoBarra3 = document.getElementById('graficoBarra3')
    const kpiCorrelacao = document.getElementById('valorCor')
    const KPIPontosDePerda = document.getElementById('KPIPontosDePerda')
    const labels = ['1-50', '51-100', '101-150', '151-200', '201-250', '251-300', '301-350', '351-400', '401-450', '451-500', '501-550', '551-600', '601-650']
    const valoresYReais = [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.83, 1.84, 2, 3.2, 4.3, 5.4]
    const valoresX = [24.5, 75.5, 125.5, 175.5, 225.5, 275.5, 325.5, 375.5, 425.5, 475.5, 525.5, 575.5, 625.5]

    for(var i = 0; i < valoresYReais.length; i++){
        if (valoresYReais[i] >= 2.0){
            pontosDePerda++
        }
    }

    KPIPontosDePerda.innerHTML = pontosDePerda

    const pontosDeDados = [];
    for (var i = 0; i < valoresX.length; i++) {
        pontosDeDados[i] = [valoresX[i], valoresYReais[i]]
    }

    const resultadoDaRegressao = calcularRegressaoLinear(pontosDeDados)
    const r = resultadoDaRegressao.r
    const m = resultadoDaRegressao.m
    const b = resultadoDaRegressao.b;

    kpiCorrelacao.innerHTML = r.toFixed([3]) * 100 + "%"

    const valoresYRegressao = [];
    for (var i = 0; i < valoresX.length; i++) {
        const x = valoresX[i];
        //
        // if (valoresX >= 2) {
        //     registroPerdas++
        // }
        const yEsperado = (m * x) + b;
        valoresYRegressao[i] = yEsperado;
    }

    console.log("Criando gráfico de barras...");
    new Chart(GraficoBarra, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Perda de Pacotes % (Real)',
                data: valoresYReais,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Perda de Pacotes % (Esperado)',
                data: valoresYRegressao,
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 3,
                    title: { display: true, text: 'média de perda de pacotes', color: '#000', font: { size: 10 } }
                },
                x: {
                    title: { display: true, text: 'Taxa de conexões abertas', color: '#000', font: { size: 14 } }
                }
            },
            plugins: {
                annotation: {
                    annotations: {
                        linhaLimite: {
                            type: 'line',
                            yMin: 2.0,
                            yMax: 2.0,
                            borderColor: 'rgb(250, 0, 0)',
                            borderWidth: 2,
                            label: {
                                enabled: true,
                                content: 'Limite aceitável',
                                position: 'end',
                                backgroundColor: 'rgba(250, 0, 0)',
                                color: 'white',
                                font: {
                                    size: 10,
                                    weight: 'bold'
                                },
                                yAdjust: -10
                            }
                        }
                    }
                }
            }
        }
    });
    console.log("Gráfico de barras criado.");
    console.log("Criando gráfico de linha...");
    new Chart(GraficoLinha, {
        type: 'line',
        data: {
            labels: ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
            datasets: [{
                label: 'Uso de CPU %',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Uso da CPU (%)', color: '#000', font: { size: 14 } }
                },
                x: {
                    title: { display: true, text: 'Horário', color: '#000', font: { size: 14 } }
                }
            }
        }
    });

    console.log("Criando GraficoBarra3 com dados estáticos...");
    new Chart(GraficoBarra3, {
        type: 'bar',
        data: {
            labels: ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
            datasets: [{
                label: 'Alertas por horário (Estático)',
                data: [1, 2, 3, 4, 5, 18, 26, 20, 21, 12, 11, 10, 9],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Quantidade de alertas', color: '#000', font: { size: 12 } }
                },
                x: {
                    title: { display: true, text: 'Horário', color: '#000', font: { size: 14 } }
                }
            }
        }
    });
    console.log("GraficoBarra3 criado com dados estáticos.");
}

function obterAlertasPorHorario(data, modelo) {
    fetch(`/dashComponente/obterAlertasPorHorario/${data}/${modelo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(a => {
            datayC = [];
            dataxC = [];
            for (let i = 0; i < a.length; i++) {
                datayC.push(a[i].Quantidade_Alertas);
                dataxC.push(`${a[i].Hora}:00`);
            }
            criarOuAtualizarGraficoBarra2Dinamico();
        })
        .catch(error => {
            console.error("Erro ao obter alertas por horário:", error);
        });
}

function obterMaiorHorario(data, modelo) {
    fetch(`/dashComponente/obterMaiorHorario/${data}/${modelo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(a => {
            const maiorUso = document.getElementById('maiorUso')
            maiorUso.innerHTML = a[0].Hora
        })
        .catch(error => {
            console.error("MAIOR HORARIO ERRO:", error);
        });
}

function criarOuAtualizarGraficoBarra2Dinamico() {
    const GraficoBarra2Canvas = document.getElementById('graficoBarra2');
    myChartBarra2 = new Chart(GraficoBarra2Canvas, {
        type: 'bar',
        data: {
            labels: dataxC,
            datasets: [{
                label: 'Alertas por horário',
                data: datayC,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Quantidade de alertas', color: '#000', font: { size: 12 } }
                },
                x: {
                    title: { display: true, text: 'Horário', color: '#000', font: { size: 14 } }
                }
            }
        }
    });
}

window.onload = function () {
    criarGraficosEstaticos();
    obterAlertasPorHorario('2025-05-27', '001');
    obterMaiorHorario('2025-05-27','001');
};
