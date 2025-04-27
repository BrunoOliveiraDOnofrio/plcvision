let adm = false



const url = window.location.href.split('/')
url.forEach((item, index) => {
    if (item == "adm") {
        adm = true
    }
})

const listarUsuarios = () => {
    fetch("/plc").then((response) => response.json().then((json) => {
        console.log(json)
        if (adm) {
            fillUsuarios(json)
        }else{
            fillUsuariosAnalistaTempoReal(json)
        }
    }))
}

const bodyTabelaPlcs = document.getElementById("tbody_plcs");

const fillUsuariosAnalistaTempoReal = (dados) => {
    let htmlString = "";
    dados.map((plc) => {
        htmlString += `<tr>
                        <td>${plc.id}</td>
                        <td>${plc.modelo}</td>
                        <td>${plc.ano}</td>
                        <td>${plc.capacidade_ram}</td>
                        <td>${plc.endereco_mac}</td>
                        <td>${plc.hostname}</td>
                        <td class="central_viz_rem">
                            <button class="btn-visualizar" data-id="${plc.id}" data-modelo="${plc.modelo}" data-ano="${plc.ano}" data-ram="${plc.capacidade_ram}" data-mac="${plc.endereco_mac}" data-host="${plc.hostname}">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                            </button>
                        </td>
                        
                    </tr>`;
});

bodyTabelaPlcs.innerHTML = htmlString;
setupModalEventListeners()
}

const fillUsuarios = (dados) => {
    let htmlString = "";
    
    dados.map((plc) => {
        htmlString += `<tr>
                        <td>${plc.id}</td>
                        <td>${plc.modelo}</td>
                        <td>${plc.ano}</td>
                        <td>${plc.capacidade_ram}</td>
                        <td>${plc.endereco_mac}</td>
                        <td>${plc.hostname}</td>
                        <td class="central_viz_rem">
                            <button class="btn-visualizar" data-id="${plc.id}" data-modelo="${plc.modelo}" data-ano="${plc.ano}" data-ram="${plc.capacidade_ram}" data-mac="${plc.endereco_mac}" data-host="${plc.hostname}">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                            </button>
                        </td>
                        <td class="central_viz_rem">
                            <button class="btn-remover" data-id="${plc.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                            </button>
                        </td>
                    </tr>`;
    });

    bodyTabelaPlcs.innerHTML = htmlString;
    
    setupModalEventListeners();
}

function setupModalEventListeners() {
    const modal = document.getElementById('modalVisualizar');
    const fecharModal = document.querySelector('.fecha');
    const btnFechar = document.querySelectorAll('.btn-fechar');
    const btnConfigurar = document.querySelector('.btn-configurar');
    const btnVisualizar = document.querySelectorAll('.btn-visualizar');
    let idDoPlc;

    btnVisualizar.forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            idDoPlc = id; 
            const modelo = this.getAttribute('data-modelo');
            const ano = this.getAttribute('data-ano');
            const ram = this.getAttribute('data-ram');
            const mac = this.getAttribute('data-mac');
            const host = this.getAttribute('data-host');
            sessionStorage.setItem('plcID', id);

            document.getElementById('detalheModelo').textContent = modelo;
            document.getElementById('detalheAno').textContent = ano;
            document.getElementById('detalheRAM').textContent = ram;
            document.getElementById('detalheEnderecoMAC').textContent = mac;
            document.getElementById('detalheHost').textContent = host;

            modal.style.display = 'flex';
        });
    });
    if (btnConfigurar && !adm) {
        btnConfigurar.addEventListener('click', function() {
            window.location.href = `.././plcs/${idDoPlc}/show`;
        });
    }

    if (btnConfigurar && adm) {
        btnConfigurar.addEventListener('click', function() {
            window.location.href = `./plcs/${idDoPlc}/show`;
        });
    }

    if (fecharModal) {
        fecharModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    if (btnFechar.length) {
        btnFechar.forEach(btn => {
            btn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        });
    }
    
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    listarUsuarios();
});