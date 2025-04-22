import boto3
from datetime import datetime,  timedelta, timezone
def conexao_aws():
    s3 = boto3.client('s3',
        aws_access_key_id='',
        aws_secret_access_key='',
        aws_session_token =''
        )
    
    return s3


def enviar_arquivo(arquivo):
    fuso_brasil = timezone(timedelta(hours=-3))
    data_hora_brasil = datetime.now(fuso_brasil).strftime('%Y-%m-%d')
    data_hora_brasil = data_hora_brasil.replace(" ", "_")
    data_hora_brasil = data_hora_brasil.replace(":", "-")
    caminho = "Scripts/csvs/" + arquivo + ".csv"
    nome_arquivo_s3 = f"monitoramento/{data_hora_brasil}/{arquivo}.csv"
    nome_bucket = "plcvision-raw"
    s3 = conexao_aws()
    s3.upload_file(caminho, nome_bucket, nome_arquivo_s3)
    print("Upload concluido...")