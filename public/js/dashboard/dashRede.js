let graficoDeBarra;
let todosOsDadosDoServidor;

let horasParaGraficoAlertas = [];
let contagemAlertasCpu = [];
let contagemAlertasRam = [];
let graficoDeBarrasAlertas;

function iniciarGraficoDeLinha() {
    const canvasDoGraficoDeLinha = document.getElementById('graficoPorcentagem');

    graficoDeBarra = new Chart(canvasDoGraficoDeLinha, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Média Uso de CPU %',
                    data: [],
                    backgroundColor: 'rgba(0, 102, 255, 0.6)',
                    borderColor: 'rgb(0, 0, 0)',
                    borderWidth: 1,
                    fill: true,
                    yAxisID: 'y'
                },
                {
                    label: 'Média Uso de RAM %',
                    data: [],
                    backgroundColor: 'rgba(84, 0, 112, 0.7)',
                    borderColor: 'rgb(0, 0, 0)',
                    borderWidth: 1,
                    fill: true,
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Uso (%)', color: '#000', font: { size: 14 } }
                },
                x: {
                    title: { display: true, text: 'Horário', color: '#000', font: { size: 14 } }
                }
            }
        }
    });
}

function obterDataAnteriorFormatada(opcaoDePeriodo) {
    const dataCalculada = new Date();

    if (opcaoDePeriodo == "01") {
        dataCalculada.setDate(dataCalculada.getDate() - 7);
    } else if (opcaoDePeriodo == "02") {
        dataCalculada.setDate(dataCalculada.getDate() - 30);
    } else if (opcaoDePeriodo == "03") {
        dataCalculada.setDate(dataCalculada.getDate() - 180);
    } else {
        dataCalculada.setDate(dataCalculada.getDate() - 180);
    }

    const ano = dataCalculada.getFullYear();
    let mes = dataCalculada.getMonth() + 1;
    let dia = dataCalculada.getDate();

    if (mes < 10) {
        mes = '0' + mes;
    }
    if (dia < 10) {
        dia = '0' + dia;
    }
    return `${ano}-${mes}-${dia}`;
}

function atualizarGraficoDeLinhaEKPIsDeUso(opcaoDePeriodo) {
    let dadosParaExibir;
    let nomeCampoCpu, nomeCampoRam;
    let tituloLinhaCpu, tituloLinhaRam;

    if (opcaoDePeriodo == "01") {
        dadosParaExibir = todosOsDadosDoServidor.media_cpu_ram_ultima_semana_por_hora;
        nomeCampoCpu = "media_cpu_ultima_semana_hora";
        nomeCampoRam = "media_ram_ultima_semana_hora";
        tituloLinhaCpu = "CPU % (Última Semana)";
        tituloLinhaRam = "RAM % (Última Semana)";
    } else if (opcaoDePeriodo == "02") {
        dadosParaExibir = todosOsDadosDoServidor.media_cpu_ram_ultimo_mes_por_hora;
        nomeCampoCpu = "media_cpu_ultimo_mes_hora";
        nomeCampoRam = "media_ram_ultimo_mes_hora";
        tituloLinhaCpu = "CPU % (Último Mês)";
        tituloLinhaRam = "RAM % (Último Mês)";
    } else {
        dadosParaExibir = todosOsDadosDoServidor.media_cpu_ram_ultimos_seis_meses_por_hora;
        nomeCampoCpu = "media_cpu_ultimos_seis_meses_hora";
        nomeCampoRam = "media_ram_ultimos_seis_meses_hora";
        tituloLinhaCpu = "CPU % (Últimos 6 Meses)";
        tituloLinhaRam = "RAM % (Últimos 6 Meses)";
    }

    if (!dadosParaExibir) return;

    const novasHoras = [];
    const novosValoresCpu = [];
    const novosValoresRam = [];

    for (let i = 0; i < dadosParaExibir.length; i++) {
        const item = dadosParaExibir[i];
        novasHoras.push(`${item.hora}:00`);
        novosValoresCpu.push(item[nomeCampoCpu]);
        novosValoresRam.push(item[nomeCampoRam]);
    }

    graficoDeBarra.data.labels = novasHoras;
    graficoDeBarra.data.datasets[0].data = novosValoresCpu;
    graficoDeBarra.data.datasets[0].label = tituloLinhaCpu;
    graficoDeBarra.data.datasets[1].data = novosValoresRam;
    graficoDeBarra.data.datasets[1].label = tituloLinhaRam;
    graficoDeBarra.update();

    let picoCpu = -1;
    let horaPicoCpu = "N/A";
    let picoRam = -1;
    let horaPicoRam = "N/A";

    let maiorSubidaCpu = -1;
    let intervaloMaiorSubidaCpu = "N/A";
    let valorMaiorSubidaCpu = 0;

    let maiorSubidaRam = -1;
    let intervaloMaiorSubidaRam = "N/A";
    let valorMaiorSubidaRam = 0;

    if (dadosParaExibir.length > 0) {
        for (let i = 0; i < dadosParaExibir.length; i++) {
            const itemAtual = dadosParaExibir[i];
            const cpuAtual = itemAtual[nomeCampoCpu];
            const ramAtual = itemAtual[nomeCampoRam];

            if (cpuAtual > picoCpu) {
                picoCpu = cpuAtual;
                horaPicoCpu = `${itemAtual.hora}:00`;
            }
            if (ramAtual > picoRam) {
                picoRam = ramAtual;
                horaPicoRam = `${itemAtual.hora}:00`;
            }

            if (i > 0) {
                const itemAnterior = dadosParaExibir[i - 1];
                const cpuAnterior = itemAnterior[nomeCampoCpu];
                const ramAnterior = itemAnterior[nomeCampoRam];

                const aumentoCpuAtual = cpuAtual - cpuAnterior;
                const aumentoRamAtual = ramAtual - ramAnterior;

                if (aumentoCpuAtual > maiorSubidaCpu) {
                    maiorSubidaCpu = aumentoCpuAtual;
                    valorMaiorSubidaCpu = aumentoCpuAtual;
                    intervaloMaiorSubidaCpu = `${itemAnterior.hora}:00 - ${itemAtual.hora}:00`;
                }

                if (aumentoRamAtual > maiorSubidaRam) {
                    maiorSubidaRam = aumentoRamAtual;
                    valorMaiorSubidaRam = aumentoRamAtual;
                    intervaloMaiorSubidaRam = `${itemAnterior.hora}:00 - ${itemAtual.hora}:00`;
                }
            }
        }
    }

    document.getElementById('maiorUsoCPU').innerHTML = horaPicoCpu;
    document.getElementById('maiorRAM').innerHTML = horaPicoRam;

    const elementoMaiorAumentoCPU = document.getElementById('maiorAumentoCPU');
    if (intervaloMaiorSubidaCpu !== "N/A" && maiorSubidaCpu > -1) {
        elementoMaiorAumentoCPU.innerHTML = `${intervaloMaiorSubidaCpu} (+${valorMaiorSubidaCpu.toFixed(2)}%)`;
    } else {
        elementoMaiorAumentoCPU.innerHTML = "N/A";
    }

    const elementoMaiorAumentoRAM = document.getElementById('maiorAumentoRAM');
    if (intervaloMaiorSubidaRam !== "N/A" && maiorSubidaRam > -1) {
        elementoMaiorAumentoRAM.innerHTML = `${intervaloMaiorSubidaRam} (+${valorMaiorSubidaRam.toFixed(2)}%)`;
    } else {
        elementoMaiorAumentoRAM.innerHTML = "N/A";
    }
}

function buscarDadosIniciaisDoServidor() {
    fetch('http://127.0.0.1:3000/bucket/api/s3json')
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(dadosRecebidos) {
            todosOsDadosDoServidor = dadosRecebidos;
            var seletorDePeriodo = document.getElementById('filtroMes');
            var opcaoPeriodoInicial = "03";
            if (seletorDePeriodo) {
                opcaoPeriodoInicial = seletorDePeriodo.value;
            }

            atualizarGraficoDeLinhaEKPIsDeUso(opcaoPeriodoInicial);

            var dataParaBuscarAlertas = obterDataAnteriorFormatada(opcaoPeriodoInicial);

            obterAlertasEspecificos(dataParaBuscarAlertas);
            Promise.all([
                buscarAlertasCpu(dataParaBuscarAlertas),
                buscarAlertasRam(dataParaBuscarAlertas)
            ]).then(function() {
                criarOuAtualizarGraficoDeBarras();

                let horaPicoAlertasRam = "N/A";
                let maxAlertasRam = -1;
                if (horasParaGraficoAlertas.length > 0 && contagemAlertasRam.length > 0) {
                    for (let i = 0; i < contagemAlertasRam.length; i++) {
                        if (contagemAlertasRam[i] > maxAlertasRam) {
                            maxAlertasRam = contagemAlertasRam[i];
                            horaPicoAlertasRam = horasParaGraficoAlertas[i];
                        }
                    }
                }
                document.getElementById('KPIAlertasRam').innerHTML = horaPicoAlertasRam;

                let horaPicoAlertasCpu = "N/A";
                let maxAlertasCpu = -1;
                if (horasParaGraficoAlertas.length > 0 && contagemAlertasCpu.length > 0) {
                    for (let i = 0; i < contagemAlertasCpu.length; i++) {
                        if (contagemAlertasCpu[i] > maxAlertasCpu) {
                            maxAlertasCpu = contagemAlertasCpu[i];
                            horaPicoAlertasCpu = horasParaGraficoAlertas[i];
                        }
                    }
                }
                document.getElementById('KPIAlertasCpu').innerHTML = horaPicoAlertasCpu;

                let totalDeAlertas = 0;
                for (let i = 0; i < contagemAlertasCpu.length; i++) {
                    totalDeAlertas += contagemAlertasCpu[i];
                }
                for (let i = 0; i < contagemAlertasRam.length; i++) {
                    totalDeAlertas += contagemAlertasRam[i];
                }
                document.getElementById('quantidadeAlertas').innerHTML = totalDeAlertas;
            });
        })
        .catch(function(erro) {
            console.error("Erro ao buscar dados iniciais do servidor (s3json):", erro);
        });
}

function obterAlertasEspecificos(dataDaBusca) {
    var tbody = document.getElementById('dados_alertas_tbody');

    if (!tbody) {
        console.error('Elemento tbody da listagem com ID "dados_alertas_tbody" não encontrado!');
        return;
    }

    tbody.innerHTML = '';
    fetch('/dashComponente/obterAlertasEspecificos/' + dataDaBusca)
        .then(function(resposta) {
            if (!resposta.ok) {
                throw new Error('Erro ao buscar dados da listagem: ' + resposta.status);
            }
            return resposta.json();
        })
        .then(function(alertas) {
            if (!alertas || alertas.length === 0) {
                var linhaMensagem = tbody.insertRow();
                var celulaMensagem = linhaMensagem.insertCell();
                celulaMensagem.colSpan = 6;
                celulaMensagem.textContent = 'Nenhum alerta específico encontrado para este período.';
                celulaMensagem.style.textAlign = 'center';
                return;
            }
            for (var i = 0; i < alertas.length; i++) {
                var alertaItem = alertas[i];
                var linha = tbody.insertRow();

                var celulaEmpresa = linha.insertCell();
                celulaEmpresa.textContent = alertaItem.nome_empresa || 'N/A';

                var celulaFabrica = linha.insertCell();
                celulaFabrica.textContent = alertaItem.nome_fabrica || 'N/A';

                var celulaSetor = linha.insertCell();
                celulaSetor.textContent = alertaItem.nome_setor || 'N/A';

                var celulaModelo = linha.insertCell();
                celulaModelo.textContent = alertaItem.modelo_plc || 'N/A';

                var celulaComponente = linha.insertCell();
                celulaComponente.textContent = alertaItem.tipo_componente_alerta || 'N/A';

                var celulaProblemas = linha.insertCell();
                celulaProblemas.textContent = alertaItem.quantidade_problemas !== undefined ? alertaItem.quantidade_problemas : 'N/A';
            }
        })
        .catch(function(erro) {
            console.error('Falha ao obter ou processar alertas para listagem:', erro);
            if (tbody) {
                tbody.innerHTML = '';
                var linhaErro = tbody.insertRow();
                var celulaErro = linhaErro.insertCell();
                celulaErro.colSpan = 6;
                celulaErro.textContent = 'Erro ao carregar dados da listagem. Verifique o console.';
                celulaErro.style.textAlign = 'center';
                celulaErro.style.color = 'red';
            }
        });
}

function buscarAlertasCpu(dataDaBusca) {
    return fetch(`/dashComponente/obterAlertasPorHorario/${dataDaBusca}`)
        .then(resposta => resposta.json())
        .then(dadosAlertas => {
            contagemAlertasCpu = [];
            horasParaGraficoAlertas = [];

            for (let i = 0; i < dadosAlertas.length; i++) {
                contagemAlertasCpu.push(dadosAlertas[i].Quantidade_Alertas);
                horasParaGraficoAlertas.push(`${dadosAlertas[i].Hora}:00`);
            }
        });
}

function buscarAlertasRam(dataDaBusca) {
    return fetch(`/dashComponente/obterAlertasPorHorarioRam/${dataDaBusca}`)
        .then(resposta => resposta.json())
        .then(dadosAlertas => {
            contagemAlertasRam = [];
            for (let i = 0; i < dadosAlertas.length; i++) {
                contagemAlertasRam.push(dadosAlertas[i].Quantidade_Alertas);
            }
        });
}

function criarOuAtualizarGraficoDeBarras() {
    const canvasDoGraficoDeBarras = document.getElementById('graficoBarra2');
    if (!canvasDoGraficoDeBarras) return;

    if (graficoDeBarrasAlertas) {
        graficoDeBarrasAlertas.destroy();
    }
    graficoDeBarrasAlertas = new Chart(canvasDoGraficoDeBarras, {
        type: 'bar',
        data: {
            labels: horasParaGraficoAlertas,
            datasets: [
                {
                    label: 'Alertas CPU por Horário',
                    data: contagemAlertasCpu,
                    backgroundColor: 'rgba(0, 26, 172, 0.6)',
                    borderColor: 'rgb(0, 0, 0)',
                    borderWidth: 1
                },
                {
                    label: 'Alertas RAM por Horário',
                    data: contagemAlertasRam,
                    backgroundColor: 'rgba(91, 0, 75, 0.6)',
                    borderColor: 'rgb(0, 0, 0)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Quantidade de alertas', color: '#000', font: { size: 12 } } },
                x: { title: { display: true, text: 'Horário', color: '#000', font: { size: 14 } } }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarGraficoDeLinha();
    buscarDadosIniciaisDoServidor();

    var seletorDePeriodo = document.getElementById('filtroMes');
    if (seletorDePeriodo) {
        seletorDePeriodo.addEventListener('change', function() {
            var opcaoSelecionada = this.value;
            atualizarGraficoDeLinhaEKPIsDeUso(opcaoSelecionada);

            var dataParaBuscarAlertas = obterDataAnteriorFormatada(opcaoSelecionada);

            obterAlertasEspecificos(dataParaBuscarAlertas);

            Promise.all([
                buscarAlertasCpu(dataParaBuscarAlertas),
                buscarAlertasRam(dataParaBuscarAlertas)
            ]).then(function() {
                criarOuAtualizarGraficoDeBarras();
                let horaPicoAlertasRam = "N/A";
                let maxAlertasRam = -1;
                if (horasParaGraficoAlertas.length > 0 && contagemAlertasRam.length > 0) {
                    for (let i = 0; i < contagemAlertasRam.length; i++) {
                        if (contagemAlertasRam[i] > maxAlertasRam) {
                            maxAlertasRam = contagemAlertasRam[i];
                            horaPicoAlertasRam = horasParaGraficoAlertas[i];
                        }
                    }
                }
                document.getElementById('KPIAlertasRam').innerHTML = horaPicoAlertasRam;

                let horaPicoAlertasCpu = "N/A";
                let maxAlertasCpu = -1;
                if (horasParaGraficoAlertas.length > 0 && contagemAlertasCpu.length > 0) {
                    for (let i = 0; i < contagemAlertasCpu.length; i++) {
                        if (contagemAlertasCpu[i] > maxAlertasCpu) {
                            maxAlertasCpu = contagemAlertasCpu[i];
                            horaPicoAlertasCpu = horasParaGraficoAlertas[i];
                        }
                    }
                }
                document.getElementById('KPIAlertasCpu').innerHTML = horaPicoAlertasCpu;

                let totalDeAlertas = 0;
                for (let i = 0; i < contagemAlertasCpu.length; i++) {
                    totalDeAlertas += contagemAlertasCpu[i];
                }
                for (let i = 0; i < contagemAlertasRam.length; i++) {
                    totalDeAlertas += contagemAlertasRam[i];
                }
                document.getElementById('quantidadeAlertas').innerHTML = totalDeAlertas;
            });
        });
    }
});