function obterDadosFabrica() {
    let idFabrica = localStorage.getItem('id');
    console.log(idFabrica); // Verifique se o valor de 'idFabrica' está correto
    // Fazer a requisição para buscar os dados da fábrica
    fetch(`/fabrica/atualizarCampo/${idFabrica}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            // Preencher os campos com os dados retornados
            document.getElementById('input_fabrica').value = data.nome;
            document.getElementById('input_logradouro').value = data.logradouro;
            document.getElementById('input_numero').value = data.numLogradouro;
            document.getElementById('input_bairro').value = data.bairro;
            document.getElementById('input_cidade').value = data.cidade;
            document.getElementById('select_estado').value = data.estado;
            document.getElementById('input_complemento').value = data.complemento;
            document.getElementById('input_qtdSetor').value = data.qtdSetor;
        })
        .catch(error => {
            console.error('Erro ao buscar dados da fábrica:', error);
        });
    }
obterDadosFabrica()

function atualizar() {
    let idFabrica = localStorage.getItem('id');
    console.log(idFabrica);

    var fabrica = input_fabrica.value;
    var qtdSetor = input_qtdSetor.value;

    var logradouro = input_logradouro.value;
    var numero = input_numero.value;
    var bairro = input_bairro.value;
    var cidade = input_cidade.value;
    var estado = select_estado.value;
    var complemento = input_complemento.value;

    if (
        fabrica == null || fabrica == "" ||
        qtdSetor == null || qtdSetor == "" ||
        logradouro == null || logradouro == "" ||
        numero == null || numero == "" ||
        bairro == null || bairro == "" ||
        cidade == null || cidade == "" ||
        estado == null || estado == "" ||
        complemento == null || complemento == ""
    ) {
        alert("Por favor, preencha todos os campos antes de atualizar.");
        return;
    }

    fetch(`/fabrica/atualizar/${idFabrica}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fabricaServer: fabrica,
            qtdSetorServer: qtdSetor,
            logradouroServer: logradouro,
            numeroServer: numero,
            bairroServer: bairro,
            cidadeServer: cidade,
            estadoServer: estado,
            complementoServer: complemento
        }),
    })
    .then(function (resposta) {
        console.log("resposta: ", resposta);
        alert("Atualização realizada com sucesso!");
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function voltar(){
    window.location.href = `../`;
}