require('dotenv').config();
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

async function getJsonFromS3(req, res) {
    console.log('Buscando dados do S3...');

    if (!process.env.S3_BUCKET_NAME || !process.env.S3_JSON_FILE_KEY) {
        console.log('S3 não configurado');
        return res.json([]);
    }

    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: process.env.S3_JSON_FILE_KEY
        };

        console.log('Carregando do S3:', params.Bucket, '/', params.Key);

        const data = await s3.send(new GetObjectCommand(params));

        let body = '';
        for await (const chunk of data.Body) {
            body += chunk;
        }

        const dados = JSON.parse(body);
        console.log(`Carregados ${dados.length} registros do S3`);

        res.json(dados);

    } catch (error) {
        console.error('Erro ao buscar dados do S3:', error.message);
        res.json([]);
    }
}

module.exports = { getJsonFromS3 };