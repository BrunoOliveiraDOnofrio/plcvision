function cadastrar() {
    var empresa = select_empresa.value;
    var fabrica = input_fabrica.value;
    var qtdSetor = input_qtdSetor.value;
    // CADASTRO ENDERECO
    var logradouro = input_logradouro.value;
    var numero = input_numero.value;
    var bairro = input_bairro.value;
    var cidade = input_cidade.value;
    var estado = select_estado.value;
    var complemento = input_complemento.value;
    // CADASTRO ENDERECO

    if (
        empresa == null || empresa == "" ||
        fabrica == null || fabrica == "" ||
        qtdSetor == null || qtdSetor == "" ||
        logradouro == null || logradouro == "" ||
        numero == null || numero == "" ||
        bairro == null || bairro == "" ||
        cidade == null || cidade == "" ||
        estado == null || estado == "" ||
        complemento == null || complemento == ""
    ) {
        alert("Por favor, preencha todos os campos antes de cadastrar.");
        return;
    }


    // Enviando o valor da nova input
    fetch("/fabrica/cadastrar", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
    // crie um atributo que recebe o valor recuperado aqui
    // Agora vá para o arquivo routes/usuario.js
        empresaServer: empresa,
        fabricaServer: fabrica,
        qtdSetorServer: qtdSetor,
        // CADASTRO ENDERECO
        logradouroServer: logradouro,
        numeroServer: numero,
        bairroServer: bairro,
        cidadeServer: cidade,
        estadoServer: estado,
        complementoServer: complemento
        // CADASTRO ENDERECO
    }),
    })
    .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
        alert("Cadastro realizado com sucesso!");
        } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function voltar(){
    window.location.href = `./`;
}
