import boto3
from datetime import datetime,  timedelta, timezone
import pandas as pd
print("pandas importado com sucesso")

import io
# import pandas as pd
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
    nome_bucket = "sprint2-bronze"
    s3 = conexao_aws()
    s3.upload_file(caminho, nome_bucket, nome_arquivo_s3)
    print("Upload concluido...")

def buscar_arquivos():
    print("entrou na funcao")
    s3 = conexao_aws()
    bucket_name = 'prata-sprint3'
    prefix = 'monitoramento/csv_plcs/2024-12/'
    print("buscando csvs")
    response = s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix)
    print(response)
    csv_files = [
        content['Key']
        for content in response.get('Contents', [])
        if content['Key'].endswith('.csv')
    ]

    print(f"{len(csv_files)} arquivos encontrados.")
    
    # Lista para armazenar os DataFrames
    dataframes = []

    for key in csv_files:
        obj = s3.get_object(Bucket=bucket_name, Key=key)
        df = pd.read_csv(io.BytesIO(obj['Body'].read()))
        df['__arquivo_origem'] = key  # opcional: incluir o nome do arquivo como coluna
        dataframes.append(df)
        print(dataframes)
    # Concatenar todos em um único DataFrame
    df_total = pd.concat(dataframes, ignore_index=True)
    
    return df_total


def enviar_arquivo_processo(arquivo, arquivoOriginal):
    fuso_brasil = timezone(timedelta(hours=-3))
    data_hora_brasil = datetime.now(fuso_brasil).strftime('%Y-%m-%d')
    data_hora_brasil = data_hora_brasil.replace(" ", "_")
    data_hora_brasil = data_hora_brasil.replace(":", "-")
    caminho = "" + arquivo
    nome_arquivo_s3 = f"monitoramento_processos/{data_hora_brasil}/{arquivoOriginal}"
    nome_bucket = "sprint2-bronze"
    s3 = conexao_aws()
    s3.upload_file(caminho, nome_bucket, nome_arquivo_s3)
    print("Upload concluido...")



df = buscar_arquivos()
df.to_csv('dados_consolidados.csv', index=False, encoding='utf-8')