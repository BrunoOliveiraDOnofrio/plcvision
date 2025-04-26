function cadastrar() {
    var fabrica_id = select_fabrica.value;
    var nome = ipt_nome_setor.value;

    if (!fabrica_id || !nome) {
        alert("Por favor, preencha todos os campos antes de cadastrar.");
        return;
    }

    fetch("/setor/cadastrarSetor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fabrica_id: fabrica_id,
            nome: nome
        }),
    })
    .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = './';
        } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}


function voltar(){
    window.location.href = "./";
}