function calcularRegressaoLinear(pontosDeDados) {
    const n = pontosDeDados.length

    var somaX= 0
    var somaY= 0
    var somaXY= 0
    var somaXQuadrado= 0

    for (var i = 0; i < n; i++) {
        const pontoAtual= pontosDeDados[i]
        const x= pontoAtual[0]
        const y = pontoAtual[1]
        somaX += x
        somaY += y
        somaXY += x * y
        somaXQuadrado += x * x
    }

    // fórmula do numerador e do denominador para calcular a inclinação (m)
    const numerador = n* somaXY - somaX * somaY
    const denominador = n* somaXQuadrado- somaX * somaX

    // calcula(m) inclinação
    var m
    if (denominador == 0) { // eu adicionei so p evitar divisão por 0 mas acho q nem precisa
        m = 0
    } else {
        m = numerador / denominador;
    }

    // calcula o intercepto de y
    const b = (somaY - m * somaX) / n

    return { m: m, b: b }
}

function criarGrafico() {
    const elementoGraficoBarra = document.getElementById('graficoBarra')
    const elementoGraficoLinha = document.getElementById('graficoLinha')
        const labels = ['0-50', '51-100', '101-150', '151-200', '201-250', '251-300', '301-350', '351-400', '401-450', '451-500', '501-550', '551-600', '601-650']
        // aqui é onde eu vou ter que colocar os dados
        const valoresYReais = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.83, 0.84, 1, 1.2, 1.3, 1.4]
        const valoresX = [25, 75.5, 125.5, 175.5, 225.5, 275.5, 325.5, 375.5, 425.5, 475.5, 525.5, 575.5, 625.5]

        const pontosDeDados = [];
        for (var i = 0; i < valoresX.length; i++) {
               pontosDeDados[i] = [valoresX[i], valoresYReais[i]]
        }

        const resultadoDaRegressao = calcularRegressaoLinear(pontosDeDados)
        const m = resultadoDaRegressao.m
        const b = resultadoDaRegressao.b;
        // console.log(`y = ${m.toFixed(4)}x + ${b.toFixed(4)}`)
        // equação da regressão

        const valoresYRegressao = [];
        //         // passa pelos x para calcular o y(y = mx + b)
        for (var i = 0; i < valoresX.length; i++) {
            const x = valoresX[i];
            const yEsperado = (m * x) + b;
            // Adiciona o valor Yesperado calculado à lista.
            valoresYRegressao[i] = yEsperado;
        }
        console.log("Criando gráfico de barras...")
        new Chart(elementoGraficoBarra, {
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
                        title: { display: true, text: 'Porcentagem de perda', color: '#000', font: { size: 10 } }
                    },
                    x: {
                        title: { display: true, text: 'Quantidade de conexões abertas', color: '#000', font: { size: 14 } }
                    }
                },
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });
        console.log("Gráfico de barras criado.");
        console.log("Criando gráfico de linha...");
        new Chart(elementoGraficoLinha, {
            type: 'line',
            data: {
                labels: ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
                datasets: [{
                    label: 'Uso de CPU %    ',
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
        })
    }
window.onload = function() {
    criarGrafico();
};