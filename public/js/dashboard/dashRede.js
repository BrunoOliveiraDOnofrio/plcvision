function calcularRegressaoLinear(pontosDeDados) {
    const n = pontosDeDados.length;

    if (n < 2) { // Modificado para n < 2, pois correlação e regressão precisam de pelo menos 2 pontos
        console.warn("São necessários pelo menos 2 pontos para calcular regressão/correlação.");
        return { m: 0, b: 0, r: NaN }; // Retorna NaN para r
    }

    var somaX = 0;
    var somaY = 0;
    var somaXY = 0;
    var somaXQuadrado = 0;
    var somaYQuadrado = 0; // Adicionado para 'r'

    for (var i = 0; i < n; i++) {
        const pontoAtual = pontosDeDados[i];
        const x = pontoAtual[0];
        const y = pontoAtual[1];
        somaX += x;
        somaY += y;
        somaXY += x * y;
        somaXQuadrado += x * x;
        somaYQuadrado += y * y; // Adicionado para 'r'
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

    // --- Cálculo de 'r' (Coeficiente de Correlação) com if/else ---
    var r;
    const denominadorParteY = n * somaYQuadrado - somaY * somaY;
    const produtoDenominadoresR = denominadorM * denominadorParteY;

    if (produtoDenominadoresR <= 0) {
        // Se não há variação em X ou Y (denominadorM ou denominadorParteY são 0),
        // ou se o produto é negativo (o que não deveria acontecer com somas de quadrados
        // a menos que haja um problema com os dados ou n seja muito pequeno),
        // a correlação linear é geralmente considerada 0 ou indefinida.
        // Se um dos eixos não tem variação, a correlação linear é 0.
        if (denominadorM === 0 || denominadorParteY === 0) {
            r = 0;
        } else if (numerador === 0) { // Se produtoDenominadoresR < 0 e numerador é 0
            r = 0;
        } else {
            // Este caso (produto < 0 e os termos não são zero) é anômalo para dados reais.
            // Poderia ser um r = 1 ou -1 se os dados fossem perfeitamente colineares e algo deu errado,
            // mas NaN é mais seguro para indicar um problema.
            // No entanto, para manter simples e retornar um número:
            r = 0; // Ou NaN para indicar que algo estranho aconteceu
        }
    } else {
        // Math.sqrt() é ESSENCIAL aqui e é a forma simples de calcular a raiz quadrada.
        const denominadorR = Math.sqrt(produtoDenominadoresR);

        if (denominadorR === 0) {
            // Este caso é raro se produtoDenominadoresR > 0, mas por segurança.
            // Se o numerador também for 0, r = 0.
            // Se o numerador não for 0, indica correlação perfeita (+1 ou -1).
            if (numerador === 0) {
                r = 0;
            } else if (numerador > 0) {
                r = 1;
            } else { // numerador < 0
                r = -1;
            }
        } else {
            r = numerador / denominadorR;
        }
    }

    // Garante que 'r' esteja estritamente entre -1 e 1 e trata NaN
    if (isNaN(r)) {
        r = 0; // Define como 0 se 'r' se tornou NaN
    }

    if (r > 1) {
        r = 1;
    } else if (r < -1) {
        r = -1;
    }
    // --- Fim do cálculo de 'r' ---

    return { m: m, b: b, r: r };
}

function criarGrafico() {
    const elementoGraficoBarra = document.getElementById('graficoBarra')
    const elementoGraficoLinha = document.getElementById('graficoLinha')
    const kpiCorrelacao = document.getElementById('valorCor')
        const labels = ['0-50', '51-100', '101-150', '151-200', '201-250', '251-300', '301-350', '351-400', '401-450', '451-500', '501-550', '551-600', '601-650']
        // aqui é onde eu vou ter que colocar os dados
        const valoresYReais = [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.83, 1.84, 2, 3.2, 4.3, 5.4]
        const valoresX = [25, 75.5, 125.5, 175.5, 225.5, 275.5, 325.5, 375.5, 425.5, 475.5, 525.5, 575.5, 625.5]

        const pontosDeDados = [];
        for (var i = 0; i < valoresX.length; i++) {
               pontosDeDados[i] = [valoresX[i], valoresYReais[i]]
        }

        const resultadoDaRegressao = calcularRegressaoLinear(pontosDeDados)
        const r = resultadoDaRegressao.r
        const m = resultadoDaRegressao.m
        const b = resultadoDaRegressao.b;
        
        kpiCorrelacao.innerHTML = r.toFixed([3]) * 100 + "%"
        // console.log(`y = ${m.toFixed(4)}x + ${b.toFixed(4)}`)
        // equação da regressão

        const valoresYRegressao = [];
        //         // passa pelos x para calcular o y(y = mx + b)
        for (var i = 0; i < valoresX.length; i++) {
            const x = valoresX[i];
            if(valoresX >= 2){
                registroPerdas++
            }
            const yEsperado = (m * x) + b;
            // Adiciona o valor Yesperado calculado p lista.
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
                        suggestedMax: 3,
                        title: { display: true, text: 'Porcentagem de perda', color: '#000', font: { size: 10 } }
                    },
                    x: {
                        title: { display: true, text: 'Quantidade de conexões abertas', color: '#000', font: { size: 14 } }
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
                } // <-- FIM DA SEÇÃO DE PLUGINS
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