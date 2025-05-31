
let intervalo;
let width = 0
const barraCarregamento = document.querySelector('.barra-preenchida');
let intervaloAtualizarTempo;
let tempoTotal
const iniciarCarregamento = async() => {
    console.log(barraCarregamento)
    barraCarregamento.style.display = 'block';
    barraCarregamento.style.width = width + '%';
    // barraCarregamento.style.transition = 'width 0.5s ease-in-out';
    let tempoRestante = 100 - width;
    let tempo = 600 * tempoRestante;
    let tempoFormatado = tempo / 1000;
    let tempoFormatadoMin = Math.floor(tempoFormatado / 60);
    let tempoFormatadoSeg = Math.floor(tempoFormatado % 60);
    let tempoFormatadoStr = `${tempoFormatadoMin}m ${tempoFormatadoSeg}s`;
    span_tempo_restante.innerHTML = `${tempoFormatadoStr}`;
    tempoTotal = tempo;
    let largura = width;
    intervalo = setInterval(async () => {
        if (largura >= 100) {
            clearInterval(intervalo);
            ativarLoading()
            if(ranking[++indiceAtualEmpresa]){
                await getAlertasComTempoDeRespostaAtrasado(ranking[indiceAtualEmpresa].razao_social)

            }else{
                getEmpresasRankeadas()
            }

            setTimeout(() => {
                width = 0
                iniciarCarregamento()
            },2000)
            
            // barraCarregamento.style.display = 'none';
        } else {
            largura++;
            barraCarregamento.style.width = largura + '%';
        }
        
        
    }, 600);

    intervaloAtualizarTempo = setInterval(() => {
        
        tempoRestante = tempoTotal - 1000;
        let tempoFormatado = tempoRestante / 1000;
        let tempoFormatadoMin = Math.floor(tempoFormatado / 60);
        let tempoFormatadoSeg = Math.floor(tempoFormatado % 60);
        if(tempoRestante <= 0) {
            clearInterval(intervaloAtualizarTempo);
            tempoRestante = 0;
            tempoFormatadoMin = 0;
            tempoFormatadoSeg = 0;
        }
        let tempoFormatadoStr = `${tempoFormatadoMin}m ${tempoFormatadoSeg}s`;
        span_tempo_restante.innerHTML = `${tempoFormatadoStr}`;
        tempoTotal = tempoRestante;
    }, 1000);   
}

const pausarPlayCarregamento = () => {

    const iconPause = document.querySelector('#icon-pause');
    if(iconPause.classList.contains('bx-pause-circle')) {
        clearInterval(intervalo);
        clearInterval(intervaloAtualizarTempo);
        width = parseInt(barraCarregamento.style.width);
        iconPause.classList.remove('bx-pause-circle');
        iconPause.classList.add('bx-play-circle');
    } else {
        iniciarCarregamento();
        iconPause.classList.remove('bx-play-circle');
        iconPause.classList.add('bx-pause-circle');
    }
    

}


iniciarCarregamento();