var usuarioModel = require("../models/usuarioModel");



function get(req, res){
    usuarioModel.get().then(response => {
        res.json(response)
    }).catch(e => {
        console.log(e)
        res.json(e)
    })
}

function update(req, res){
    const nome = req.body.nome
    const email = req.body.email
    const nivel = req.body.nivel
    const cargo = req.body.cargo
    const setor = req.body.setor
    const telCelular = req.body.telCelular
    const senha = req.body.senha
    
    const id = req.params.id

    const response = []
    if(senha){
        // chama a outra, adiciona numa variavel que armazena a resposta
    }

    // validacoes

    // chamada

    const dados = {
        nivel: nivel, 
        cargo: cargo,
        nome: nome, 
        telCelular: telCelular,
        setor: setor,
        email: email
    }

    

    usuarioModel.update(dados, id).then(resposta => {
        res.json(resposta)
    }).catch(e => {
        res.json(e)
    })
}



function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    console.log("Estou no autenticar controller");
    
    if(!validarCredenciais(res, email, senha)){
        return;
    }

    usuarioModel.autenticar(email, senha)
    .then(
        function (resultadoAutenticar) {
            console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
            console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

            if (resultadoAutenticar.length == 1) {
                console.log(resultadoAutenticar);

                res.json({
                    id: resultadoAutenticar[0].idUsuario,
                    nome: resultadoAutenticar[0].nome,
                    nivel: resultadoAutenticar[0].nivel,
                    fkEmpresa: resultadoAutenticar[0].fkEmpresa 
                });
                        
            } else if (resultadoAutenticar.length == 0) {
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                res.status(403).send("Mais de um usuário com o mesmo login e senha!");
            }
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var telCelular = req.body.telCelularServer;
    var nivel = req.body.nivelServer;
    var setor = req.body.setorServer;
    var cargo = req.body.cargoServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.idEmpresaVincularServer;
    
    // Faça as validações dos valores
    if (!validarCredenciais(res, email, senha)) {
        return;
    }
    
    if(!validarCadastro(res, nome, telCelular, nivel, setor, cargo, fkEmpresa)){
        return;
    }

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrar(nome, email, telCelular, senha, nivel, setor, cargo, fkEmpresa)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function validarCadastro(res, nome, telCelular, nivel, setor, cargo, fkEmpresa){
    // nome completo
    nome = nome.split(" ");
    
    if (nome == undefined || nome == '' || nome.length < 2) {
        res.status(400).send("Nome completo inválido!");
        return false;
    } 
    
    // tel de DDD+numeros (13 digitos numericos)
    if ((telCelular == undefined || telCelular == '') || telCelular.length != 13) {
        res.status(400).send("Telefone Celular inválido!");
        return false;
    } 
    
    // 0 ou 1 ou 2
    if ((nivel == undefined || nivel == '') || (nivel != 0 && nivel != 1 && nivel != 2)) {
        res.status(400).send("Nível de acesso inválido!");
        return false;
    } 

    // nada específico
    if(setor == undefined || setor == ''){ 
        res.status(400).send("Setor não definido!");
        return false;
    }

    // nada específico
    if (cargo == undefined || cargo == '') {   
        res.status(400).send("Cargo não definido!");
        return false;
    }
    
    // nada específico tbm
    if (fkEmpresa == undefined || fkEmpresa == '') {
        res.status(400).send("Empresa não definida!");
        return false;
    }

    return true;
}

function validarCredenciais(res, email, senha){
    // aql validação de @ e final de email
    var tamEmail = email.length;

    var isEnd = email.endsWith('.com') || email.endsWith('.br') || email.endsWith('.gov');

    // Encontrar o menor índice válido para '.com', '.br' ou '.gov'
    var indices = [email.indexOf('.com'), email.indexOf('.br'), email.indexOf('.gov')].filter(i => i >= 0);
    var indiceEnd = indices.length > 0 ? Math.min(...indices) : -1;

    var indiceArroba = email.indexOf('@');
    var isArroba = indiceArroba !== -1 && indiceArroba < indiceEnd;

    var CARACTERES_ESPECIAIS = /[^A-Za-z0-9]/;
// const CARACTERES_CEP = /^[0-9]{8}$/;

    if (email == undefined || email == '') {
        res.status(400).send("Valor do email indefinido!");
        return false;
    }

    if (tamEmail < 8) {
        res.status(400).send("Tamnho do email é inválido!");
        return false;
    }

    if(!isEnd || !isArroba){
        res.status(400).send("Email inválido!");
        return false;
    }

    var tamSenha = senha.length;
    var isEspecial = CARACTERES_ESPECIAIS.test(senha);

    var isMinuscula = false;
    var isMaiuscula = false;
    var isNum = false;        

    // pd usar um forEach ou find
    for(var i = 0; i < tamSenha; i++){
        if(senha[i] == senha[i].toUpperCase()){
            isMaiuscula = true;
        }

        if(senha[i] == senha[i].toLowerCase()){
            isMinuscula = true;
        }

        if(Number(parseFloat(senha[i])) == senha[i]){
            isNum = true;
        }
    }

    if(tamSenha < 8 || !isMinuscula || !isMaiuscula || !isEspecial || !isNum || senha == ''){
        res.status(400).send("Senha inválida!");
        return false;
    }

    return true;
}

module.exports = {
    autenticar,
    cadastrar,
    get,
    update
}