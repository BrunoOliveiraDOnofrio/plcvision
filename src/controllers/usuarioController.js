var usuarioModel = require("../models/usuarioModel");



function get(req, res){
    usuarioModel.get().then(response => {
        res.json(response)
    }).catch(e => {
        console.log(e)
        res.json(e)
    })
}

function getById(req, res) {
    const id = req.params.id;

    usuarioModel.getById(id)
        .then(usuario => {
            if (usuario) {
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ error: "Usuário não encontrado." });
            }
        })
        .catch(error => {
            console.error("Erro ao buscar usuário:", error);
            res.status(500).json({ error: "Erro ao buscar usuário." });
        });
}

function update(req, res){
    const {nivel, cargo, nome, telCelular, setor, email} = req.body
    
    const id = req.params.id

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

function deleteUsuario(req, res) {
    const id = req.params.id;

    usuarioModel.deleteUsuario(id)
        .then(() => {
            res.status(200).json({ message: "Usuário removido com sucesso!" });
        })
        .catch(error => {
            console.error("Erro ao remover usuário:", error);
            res.status(500).json({ error: "Erro ao remover usuário." });
        });
}

async function autenticar(req, res) {
    const { emailServer, senhaServer } = req.body;

    if (!emailServer || !senhaServer) {
        return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    try {
        const resultado = await usuarioModel.autenticar(emailServer, senhaServer);

        if (resultado.length === 1) {
            const usuario = resultado[0];
            res.status(200).json({
                id: usuario.idUsuario,
                nome: usuario.nome,
                email: usuario.email,
                nivel: usuario.nivel
            });
        } else if (resultado.length === 0) {
            res.status(401).send("E-mail ou senha inválidos.");
        } else {
            res.status(500).send("Erro: múltiplos usuários encontrados com as mesmas credenciais.");
        }
    } catch (error) {
        console.error("Erro ao autenticar usuário:", error);
        res.status(500).json({ error: "Erro ao autenticar usuário." });
    }
}

function store(req, res) {
    console.log("Dados recebidos no corpo da requisição:", req.body);

    const { nome, email, celular, nivel, setor, cargo, senha, fkFabricante } = req.body;

    if (!nome || !email || !celular || !nivel || !setor || !cargo || !senha || !fkFabricante) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const dados = {
        nome: nome,
        email: email,
        celular: celular,
        nivel: nivel,
        setor: setor,
        cargo: cargo,
        senha: senha,
        fkFabricante: fkFabricante
    };

    usuarioModel.cadastrar(dados)
        .then(response => {
            console.log("Usuário cadastrado:", response);
            res.status(201).json({ message: "Usuário cadastrado com sucesso!", response });
        })
        .catch(error => {
            console.error("Erro ao cadastrar usuário:", error);
            res.status(500).json({ error: "Erro ao cadastrar usuário." });
        });
}

function validarCadastro(res, nome, telCelular, nivel, setor, cargo, fkEmpresa){
    // nome completo
    nome = nome.split(" ");
    
    if (nome == undefined || nome == '' || nome.length < 2) {
        res.status(400).send("Nome completo inválido!");
        return false;
    } 
    
    // tel de DDD+numeros (13 digitos numericos)
    if ((telCelular == undefined || telCelular == '') || telCelular.length != 11) {
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
        res.status(400).send("Tamanho do email é inválido!");
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
    store,
    get,
    update,
    getById,
    delete: deleteUsuario
}