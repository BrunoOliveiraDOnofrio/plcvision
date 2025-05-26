const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: process.env.AWS_REGION || 'us-east-1'
});

const BUCKET = process.env.S3_BUCKET_NAME;
const OBJECT_KEY = 'processos_simulados.json';

async function analisarProcessos({ setores = [], dataInicial, dataFinal }) {
    let simulacoes = [];
    try {
        // Busca o arquivo do S3
        const data = await s3.getObject({ Bucket: BUCKET, Key: OBJECT_KEY }).promise();
        const raw = data.Body.toString('utf-8');
        simulacoes = JSON.parse(raw);
    } catch (e) {
        throw new Error('Erro ao ler ou parsear o JSON do S3: ' + e.message);
    }

    // Filtra por setor e datas, se necessário
    let filtrado = simulacoes;
    if (setores.length > 0) {
        filtrado = filtrado.filter(sim => setores.includes(sim.setor));
    }
    if (dataInicial) {
        filtrado = filtrado.filter(sim => sim.dataHora >= dataInicial);
    }
    if (dataFinal) {
        filtrado = filtrado.filter(sim => sim.dataHora <= dataFinal);
    }

    // Conta processos mais frequentes
    const contagem = {};
    filtrado.forEach(sim => {
        (sim.processos || []).forEach(proc => {
            contagem[proc.nome] = (contagem[proc.nome] || 0) + 1;
        });
    });

    // Retorna os 3 mais frequentes
    return Object.entries(contagem)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([nome, ocorrencias]) => ({ nome, ocorrencias }));
}

module.exports = { analisarProcessos };