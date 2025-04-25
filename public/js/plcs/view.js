const modalAdicionar = document.querySelector('#dialog_adicionar')
const modalDesativar = document.querySelector('#dialog_desativar')
let url = window.location.href
const urlParts = url.split('/')
const plcID = urlParts[urlParts.length - 2]

const getConfigs = () => {
    
    fetch('/plc/register/config/' + plcID).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Erro ao obter as configurações do PLC')
        }
    }
)   .then(configs => {
        configs = configs.configs
        const configsContainer = document.querySelector('#div_list_configs')
        let html_text = ""

        configs.forEach(config => {
            html_text += `<div class="item-table">
                        <div class="span">
                            <p>${config.hardware}</p>
                        </div>
                        <div class="span">
                            <p>${config.unidade_dado}</p>
                        </div>
                        <div class="span">
                            <p>Atenção: ${config.limite_atencao}, Crítico: ${config.limite_critico}</p>
                        </div>
                        <div class="span">
                            <i onclick="abrirModalDesativar()" class='bx bx-error-alt'></i>
                        </div>
                        
                    </div>`
        })
        configsContainer.innerHTML += html_text
    }).catch(error => {
        console.error('Erro ao obter as configurações do PLC:', error)
    }
    )
}

const abrirModalDesativar = () => modalDesativar.showModal()
const fecharModalDesativar = () => modalDesativar.close()

const abrirModalAdicionar = () => {
    modalAdicionar.showModal()
}

const fecharModalAdicionar = () => modalAdicionar.close()

// função de listar somente oque estiver com o id no session storage
function listaPorId(){
    

    fetch(`/plc/${plcID}`)
        .then(response => response.json())
        .then(plc => {
            console.log('Dados recebidos do servidor:', plc); // Para verificar o que está vindo do servidor
            
            document.getElementById('span_nome').textContent = plc.modelo || 'N/A';
            document.getElementById('span_ano').textContent = plc.ano || 'N/A';
            document.getElementById('span_ram').textContent = plc.capacidade_ram || 'N/A';
            document.getElementById('span_mac').textContent = plc.endereco_mac || 'N/A';
            document.getElementById('span_so').textContent = plc.sistema_operacional || 'N/A';
            document.getElementById('span_hostname').textContent = plc.hostname || 'N/A';
            
        })
        .catch(error => {
            console.error('Erro ao obter dados do PLC:', error);
        });
}

window.onload = function() {
    listaPorId();
    getConfigs();
};