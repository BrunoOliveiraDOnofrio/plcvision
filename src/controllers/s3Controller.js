const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

async function buscarJsonS3(req, res) {
    try {
        console.log('Iniciando busca no S3...');
        
        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: process.env.S3_JSON_FILE_KEY_2
        });

        const response = await s3Client.send(command);
        const streamToString = await response.Body.transformToString();
        const conteudoJson = JSON.parse(streamToString);
        
        console.log('Dados do S3 obtidos com sucesso');
        res.json(conteudoJson);
    } catch (erro) {
        console.error('Erro ao buscar arquivo do S3:', erro);
        res.status(500).json({
            erro: 'Erro ao buscar dados do S3',
            detalhes: erro.message
        });
    }
}

module.exports = {
    buscarJsonS3
};