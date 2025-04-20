let timeOutCep = null


const getEndereco = async (cepValue) => {
    if (timeOutCep) {
        clearTimeout(timeOutCep);
    }
    console.log(cepValue)
    timeOutCep = setTimeout(async () => {
        
        if (cepValue.length == 8) {
            const endereco = await fetchEndereco(cepValue);
            console.log(endereco)
            if (endereco) {
                document.querySelector('#logradouro').value = endereco.logradouro;
                document.querySelector('#bairro').value = endereco.bairro;
                document.querySelector('#cidade').value = endereco.localidade;
                let estados = document.querySelector('#estado')
                estados.querySelectorAll('option').forEach((option) => {
                    if (option.value == endereco.uf) {
                        option.selected = true
                    } else {
                        option.selected = false
                    }
                })
            } else {
                alert('CEP não encontrado');
            }
        } else {
            alert('CEP inválido');
        }
    }, 1000)
}
   
const fetchEndereco = async (cep) => {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            throw new Error('Erro ao buscar CEP');
        }
        const data = await response.json();
        if (data.erro) {
            return null;
        }
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
