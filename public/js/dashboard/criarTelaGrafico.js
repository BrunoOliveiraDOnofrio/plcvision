const criar =  async() => {
    const mainDiv = document.querySelector('.main')

    mainDiv.innerHTML = `<div class="content">
            <div class="title-div">
                <h1>Monitoramento de Recursos</h1>
                <small>Acompanhe métricas em tempo real</small>
                <div class="line-select-alertas">
                <div class="group-selects">
                    <select name="" id="select_empresas">
                        <option value="">Selecione uma empresa</option>
                        
                    </select>
                    <select name="" id="select_plcs">
                        <option value="0">Selecione um PLC</option>
                    </select>
                </div>
                <div class="" id="div_alerta">
                
                </div>

                </div>
            </div>
            <div class="wrap-all-div">
            <h1>Picos das métricas capturadas <span id="span_data_comeco"></span></h1>
            <div class="swiper kpisCarrossel">
                <div id="div_kpis" class="kpis-div swiper-wrapper">
                    <h1>Não há dados para monitorar deste PLC</h1>
                    
                    
                </div>
                
            </div>
            <div class="swiper-pagination kpi-pagination"></div>
            <div class="swiper-button-next kpi-next"></div>
            <div class="swiper-button-prev kpi-prev"></div>
            </div>
            <div class="wrap-all-div div-componentes">
            <div class="title-legendas">
                <h1>Comportamento dos Componentes</h1>
                <div class="legenda-div">
                    <div class="box blue"></div>
                    <span>Estável</span>
                </div>
                <div class="legenda-div">
                    <div class="box yellow"></div>
                    <span>Atenção</span>
                </div>
                <div class="legenda-div">
                    <div class="box red"></div>
                    <span>Crítico</span>
                </div>
            </div>
            <div class="swiper chartsCarrossel">
                <div id="div_charts" class="all-charts-div swiper-wrapper">
                    
                </div>
            </div>
            <div class="swiper-pagination chart-pagination"></div>
            <div class="swiper-button-next chart-next"></div>
            <div class="swiper-button-prev chart-prev"></div>
            </div>
        </div>
        `

        try {
        // Verifica se o script já foi carregado
        if (window.script2Loaded) return;

        // Busca o conteúdo do script
        const response = await fetch('../../js/dashboard/grafico.js');
        const scriptText = await response.text();
            console.log(scriptText)
        // Usa Function constructor (mais seguro que eval)
        const scriptFunction = new Function(scriptText);
        scriptFunction();

        // Marca como carregado
        window.script2Loaded = true;
    } catch (error) {
        console.error('Erro ao carregar o script:', error);
    }
}