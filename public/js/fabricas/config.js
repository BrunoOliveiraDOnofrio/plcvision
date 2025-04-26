let adm = false



let url = window.location.href.split('/')
url.forEach((item, index) => {
    if (item == "adm") {
        adm = true
    }
})


const modalAdicionar = document.querySelector('#dialog_adicionar')
const modalDesativar = document.querySelector('#dialog_desativar')
url = window.location.href
const urlParts = url.split('/')
const fabricaId = urlParts[urlParts.length - 2]
const select_componentes = document.querySelector('#select_componente')

const adicionarConfiguracao = () => {
    //montando o formulario 
    const json = {
        configuracoes: []
    }
    const form = document.querySelector('#form_adicionar_config')
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data['fabrica_consumidor_id'] = fabricaId
    
    json.configuracoes.push(data)
    
    //fetch
    fetch("/plc/config/" + fabricaId, {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
    }).then(res => res.json().then(res =>{
     
            console.log("Configuração adicionada com sucesso")
            window.location.reload()
        
    })).catch(e => {
        console.log("Erro ao adicionari configuração", e)
    })


}

const getComponentes = () => {
    fetch('/componente').then(res => res.json().then(res => {
        let html_text = ""
        res.forEach(componente => {
            html_text += `<option value="${componente.id}">
            ${componente.hardware} ${componente.tipo_dado} ${componente.unidade_dado}</option>`
        })
        select_componentes.innerHTML = html_text
    })).catch(e => {
        console.log("Erro ao buscar componentes", e)
    })
}

getComponentes()


const getConfigs = () => {
    
    fetch('/plc/config/' + fabricaId).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Erro ao obter as configurações do PLC')
        }
    }
)   .then(configs => {
        configs = configs
        const configsContainer = document.querySelector('#div_list_configs')
        let html_text = ""
        if(adm){
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
                            <i onclick="abrirModalDesativar(${config.config_id})" class='bx bx-error-alt'></i>
                        </div>
                        
                    </div>`
        })
        }else{
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
                            
                            
                        </div>`
            })
        }
        configsContainer.innerHTML += html_text
    }).catch(error => {
        console.error('Erro ao obter as configurações do PLC:', error)
    }
    )
}
const desativarConfig = () => {
    const btn = document.querySelector('#btn_desativar')
    const id = btn.getAttribute('data-id') 
    console.log("ID DO BOTÃO", id)
    console.log(id)
    fetch('/plc/config/' + id, {
        method: 'PUT'
    })
        .then(response => {
            if (response.ok) {
                console.log('Configuração desativada com sucesso!')
                window.location.reload()
            } else {
                console.error('Erro ao desativar a configuração:', response.statusText)
            }
        })
        .catch(error => {
            console.error('Erro ao desativar a configuração:', error)
        })
}

const abrirModalDesativar = (id) => {
    const btn = document.querySelector('#btn_desativar')
    btn.setAttribute('data-id', id) 
    console.log(btn.getAttribute('data-id'), "ID NO BOTÃO")
    console.log(id, "ID NO DESATIVAR")
    modalDesativar.showModal()
}

const fecharModalDesativar = () => modalDesativar.close()

const abrirModalAdicionar = () => {
    modalAdicionar.showModal()
}

const fecharModalAdicionar = () => modalAdicionar.close()

// função de listar somente oque estiver com o id no session storage


window.onload = function() {
    
    getConfigs();
};