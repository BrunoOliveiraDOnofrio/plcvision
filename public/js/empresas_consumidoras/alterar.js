const form = document.querySelector('#form_alterar_empresa_consumidora')


const update = async () => {
    let url = window.location.href.split('/')
    const id = url[url.length - 2]
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
        const response = await fetch(`/consumidor/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            window.location.href = '../../consumidores';
        } else {
            console.log('Erro ao atualizar empresa consumidora:', response.statusText);
            const errorData = await response.json();
            console.error('Error data:', errorData);
            console.log(response.body)
            alert('Erro ao atualizar empresa consumidora');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
const getById = () => {
    let url = window.location.href.split('/')
    const id_empresa = url[url.length - 2]

    fetch(`/consumidor/${id_empresa}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            console.error('Erro ao buscar empresa consumidora:', response.statusText)
            alert('Erro ao buscar empresa consumidora')
        }
    }).then((data) => {
        console.log(data)
        fillForm(data.empresa)
    }).catch((error) => {
        console.error('Error:', error)
    })
}

const fillForm = (data) => {
    document.querySelector('#razaoSocial').value = data.razao_social    
    document.querySelector('#cnpj').value = data.cnpj
    document.querySelector('#qtdFabrica').value = data.qtdFabrica
    document.querySelector('#segmento').value = data.segmento
    document.querySelector('#endereco_id').value = data.enderecoId
    document.querySelector('#logradouro').value = data.logradouro
    document.querySelector('#bairro').value = data.bairro
    document.querySelector('#cidade').value = data.cidade
    document.querySelector('#numLogradouro').value = data.numLogradouro
    document.querySelector('#complemento').value = data.complemento
    let estados = document.querySelector('#estado')
    estados.querySelectorAll('option').forEach((option) => {
        if (option.value == data.estado) {
            option.selected = true
        } else {
            option.selected = false
        }
    })
}
getById()