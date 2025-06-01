var dashComponenteModel = require('../models/dashComponenteModel')
// controller: require('dotenv').config();
// const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
// const s3 = new S3Client({
//     region: 'us-east-1',
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//         sessionToken: process.env.AWS_SESSION_TOKEN
//     }
// });

// async function getJsonFromS3(req, res) {
//     try {
//         const params = {
//             Bucket: process.env.S3_BUCKET_NAME,
//             Key: process.env.S3_JSON_FILE_KEY
//         };
//         const data = await s3.send(new GetObjectCommand(params));
//         let body = '';
//         for await (const chunk of data.Body) {
//             body += chunk;
//         }
//         res.json(JSON.parse(body));
//     } catch (e) {
//         res.status(500).json({ erro: 'Erro ao buscar JSON do S3', details: e.message });
//     }
// }

function obterAlertasPorHorario(req,res){
    var data = req.params.data

    dashComponenteModel
    .obterAlertasPorHorario(data)
    .then(function(resultado){
        console.log(resultado)
        if(resultado.length > 0){
            res.status(200).json(resultado)
        }else{
            res.status(204).send('Nenhum alerta encontrado!')
        }
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
        console.log(erro)
    })
}

function obterAlertasEspecificos(req,res){
    var data = req.params.data

    dashComponenteModel
    .obterAlertasEspecificos(data)
    .then(function(resultado){
        console.log(resultado)
        if(resultado.length > 0){
            res.status(200).json(resultado)
        }else{
            res.status(204).send('Nenhum alerta encontrado!')
        }
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
        console.log(erro)
    })
}

function obterAlertasPorHorarioRam(req,res){
    var data = req.params.data

    dashComponenteModel
    .obterAlertasPorHorarioRam(data)
    .then(function(resultado){
        console.log(resultado)
        if(resultado.length > 0){
            res.status(200).json(resultado)
        }else{
            res.status(204).send('Nenhum alerta encontrado!')
        }
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
        console.log(erro)
    })
}



function obterMaiorHorario(req,res){
    var data = req.params.data

    dashComponenteModel
    .obterMaiorHorario(data)
    .then(function(resultado){
        console.log(resultado)
        if(resultado.length > 0){
            res.status(200).json(resultado)
        }else{
            res.status(204).send('Nenhum alerta encontrado!')
        }
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
        console.log(erro)
    })

}

module.exports = {
    obterAlertasPorHorarioRam,
    obterAlertasPorHorario,
    obterMaiorHorario,
    obterAlertasEspecificos
    // getJsonFromS3
}