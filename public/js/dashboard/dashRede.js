let graficoDeBarra; 
let todosOsDadosDoServidor;

let horasParaGraficoAlertas = []; 
let contagemAlertasCpu = []; 
let contagemAlertasRam = []; 
let graficoDeBarrasAlertas; 

function iniciarGraficoDeLinha() {
    const canvasDoGraficoDeLinha = document.getElementById('graficoPorcentagem');
    if (!canvasDoGraficoDeLinha) {
        return; 
    }

    graficoDeBarra = new Chart(canvasDoGraficoDeLinha, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Uso de CPU %',
                    data: [],
                    backgroundColor: 'rgba(0, 102, 255, 0.6)',
                    borderColor: 'rgb(0, 0, 0)',
                    borderWidth: 1,
                    fill: true,
                    yAxisID: 'y'
                },
                {
                    label: 'Uso de RAM %',
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
        dataCalculada.setDate(dataCalculada.getDate() - 7);
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
    if (!graficoDeBarra || !graficoDeBarra.data || !todosOsDadosDoServidor) {
        return;
    }

    let dadosParaExibir;
    let nomeCampoCpu, nomeCampoRam;
    let tituloLinhaCpu, tituloLinhaRam;

    if (opcaoDePeriodo === "01") {
        dadosParaExibir = todosOsDadosDoServidor.media_cpu_ram_ultima_semana_por_hora;
        nomeCampoCpu = "media_cpu_ultima_semana_hora";
        nomeCampoRam = "media_ram_ultima_semana_hora";
        tituloLinhaCpu = "CPU % (Última Semana)";
        tituloLinhaRam = "RAM % (Última Semana)";
    } else if (opcaoDePeriodo === "02") {
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
        .then(resposta => resposta.json())
        .then(dadosRecebidos => {
            todosOsDadosDoServidor = dadosRecebidos;
            const seletorDePeriodo = document.getElementById('filtroMes');
            let opcaoPeriodoInicial = "03";

            if (seletorDePeriodo) {
                opcaoPeriodoInicial = seletorDePeriodo.value;
            }

            atualizarGraficoDeLinhaEKPIsDeUso(opcaoPeriodoInicial);

            const dataParaBuscarAlertas = obterDataAnteriorFormatada(opcaoPeriodoInicial);
            Promise.all([
                buscarAlertasCpu(dataParaBuscarAlertas),
                buscarAlertasRam(dataParaBuscarAlertas)
            ]).then(() => {
                criarOuAtualizarGraficoDeBarras();
                
                let horaPicoAlertasRam = "N/A";
                let maxAlertasRam = -1;
                if (horasParaGraficoAlertas.length > 0 && contagemAlertasRam.length > 0) {
                    const tamanhoLoopRAM = Math.min(horasParaGraficoAlertas.length, contagemAlertasRam.length);
                    for (let i = 0; i < tamanhoLoopRAM; i++) {
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

document.addEventListener('DOMContentLoaded', () => {
    iniciarGraficoDeLinha();
    buscarDadosIniciaisDoServidor();

    const seletorDePeriodo = document.getElementById('filtroMes');
    if (seletorDePeriodo) {
        seletorDePeriodo.addEventListener('change', function () {
            const opcaoSelecionada = this.value;
            atualizarGraficoDeLinhaEKPIsDeUso(opcaoSelecionada);

            const dataParaBuscarAlertas = obterDataAnteriorFormatada(opcaoSelecionada);

            Promise.all([
                buscarAlertasCpu(dataParaBuscarAlertas),
                buscarAlertasRam(dataParaBuscarAlertas)
            ]).then(() => {
                criarOuAtualizarGraficoDeBarras();
                
                let horaPicoAlertasRam = "N/A";
                let maxAlertasRam = -1;
                 if (horasParaGraficoAlertas.length > 0 && contagemAlertasRam.length > 0) {
                    const tamanhoLoopRAM = Math.min(horasParaGraficoAlertas.length, contagemAlertasRam.length);
                    for (let i = 0; i < tamanhoLoopRAM; i++) {
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