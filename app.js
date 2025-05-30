//var ambiente_processo = 'producao';
var ambiente_processo = 'producao';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({path: caminho_env});

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
const usuarioRouter = require("./src/routes/usuario");
const fabricanteRouter = require('./src/routes/fabricante')
const dashComponenteRouter = require('./src/routes/RotadashComponente')
const plcRouter = require('./src/routes/plc')
const fabricaRouter = require('./src/routes/fabrica')
const plcRegister = require('./src/routes/plc_register')
const consumidorRouter = require('./src/routes/consumidor')
const alertaRouter = require('./src/routes/alerta')
const componenteRouter = require('./src/routes/componente')
const anomaliaRoutes = require('./src/routes/anomalia')
const jiraRouter = require('./src/routes/jira')
const admRouter = require("./src/routes/adm");
const analistaRouter = require("./src/routes/analista");
const tempoReal = require("./src/routes/tempoReal");
const bucket = require("./src/routes/bucket")

const setorRegister = require("./src/routes/setor_register");
const s3Router = require('./src/routes/s3');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/bucket", bucket)
app.use("/dashComponente", dashComponenteRouter);
app.use("/usuario", usuarioRouter);
app.use("/fabricante", fabricanteRouter);
app.use("/plc",plcRouter);
app.use("/fabrica", fabricaRouter);
app.use("/plc/register", plcRegister);
app.use("/adm", admRouter);
app.use('/analista', analistaRouter);
app.use("/tempo_real", tempoReal);
app.use("/consumidor", consumidorRouter);
app.use("/alerta", alertaRouter);
app.use("/componente", componenteRouter);
app.use("/api", anomaliaRoutes);
app.use("/api", s3Router);
app.use("/jira", jiraRouter);
app.use("/setor",setorRegister);

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});