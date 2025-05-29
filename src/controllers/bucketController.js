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
    try {
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
        console.log('Conteúdo bruto do S3:', body);
        // Retorna o JSON para o frontend
        res.json(JSON.parse(body));
    } catch (e) {
        console.error('Erro ao buscar JSON do S3:', e);
        res.status(500).json({ erro: 'Erro ao buscar JSON do S3', details: e.message });
    }
}

module.exports = { getJsonFromS3 };