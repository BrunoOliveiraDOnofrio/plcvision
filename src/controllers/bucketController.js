require('dotenv').config();
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

async function getJsonFromS3(req, res) {
    try {
        // Caminho para o arquivo na raiz do projeto
        const localFilePath = path.join(__dirname, '..', '..', 'processos_simulados.json');

        console.log('Tentando ler arquivo:', localFilePath);

        if (fs.existsSync(localFilePath)) {
            console.log('Arquivo encontrado! Lendo...');
            const dados = JSON.parse(fs.readFileSync(localFilePath, 'utf8'));
            console.log('Total de registros:', dados.length);
            return res.json(dados);
        }

        console.log('Arquivo local não encontrado, tentando S3...');

        // Se não tem arquivo local, verifica se tem configuração S3
        if (!process.env.S3_BUCKET_NAME || !process.env.S3_JSON_FILE_KEY) {
            console.log('S3 não configurado, retornando array vazio');
            return res.json([]);
        }

        // Tenta buscar do S3
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: process.env.S3_JSON_FILE_KEY
        };

        console.log('Tentando buscar do S3:', params);
        const data = await s3.send(new GetObjectCommand(params));
        let body = '';
        for await (const chunk of data.Body) {
            body += chunk;
        }

        res.json(JSON.parse(body));

    } catch (e) {
        console.error('Erro ao buscar dados:', e);
        res.json([]);
    }
}

module.exports = { getJsonFromS3 };