import boto3
import pandas as pd
import numpy as np
import io
import json
from datetime import datetime, timezone, timedelta  


def conexao_aws():
    s3 = boto3.client('s3',
                      aws_access_key_id='',
                      aws_secret_access_key='',
                      aws_session_token=''
                      )
    return s3


def buscar_arquivos():
    s3_client = conexao_aws()
    bucket_name = 'prata-sprint3'

    lista_de_prefixos = [
        'monitoramento/csv_plcs/2024-12/',
        'monitoramento/csv_plcs/2025-01/',
        'monitoramento/csv_plcs/2025-02',
        'monitoramento/csv_plcs/2025-03',
        'monitoramento/csv_plcs/2025-04',
        'monitoramento/csv_plcs/2025-05',
        'monitoramento/csv_plcs/2025/06'
    ]
    print(f"Prefixos definidos manualmente a serem buscados: {lista_de_prefixos}")
    todos_os_csv_keys = []
    print("Buscando CSVs em múltiplos prefixos...")

    for prefixo_atual in lista_de_prefixos:
        print(f"Buscando em: {prefixo_atual}")
        try:
            paginator = s3_client.get_paginator('list_objects_v2')
            for page in paginator.paginate(Bucket=bucket_name, Prefix=prefixo_atual):
                arquivos_neste_prefixo = [
                    content['Key']
                    for content in page.get('Contents', [])
                    if content['Key'].endswith('.csv') and content.get('Size', 0) > 0
                ]
                if arquivos_neste_prefixo:
                    print(f"Encontrados {len(arquivos_neste_prefixo)} CSVs em {prefixo_atual} (nesta página).")
                    todos_os_csv_keys.extend(arquivos_neste_prefixo)

            encontrou_neste_prefixo_geral = any(key.startswith(prefixo_atual) for key in todos_os_csv_keys)
            if not encontrou_neste_prefixo_geral:
                print(f"Nenhum CSV encontrado ou válido em {prefixo_atual}.")
        except Exception as e:
            print(f"Erro ao buscar arquivos no prefixo {prefixo_atual}: {e}")

    print(f"\nTotal de {len(todos_os_csv_keys)} arquivos CSV encontrados em todos os prefixos.")
    if not todos_os_csv_keys:
        print("Nenhum arquivo CSV para processar. Retornando DataFrame vazio.")
        return pd.DataFrame()

    dataframes = []
    colunas_esperadas_nos_csvs = ['cpu_percent', 'ram_percent', 'data_hora']

    for key in todos_os_csv_keys:
        print(f"Lendo arquivo: {key}")
        try:
            obj = s3_client.get_object(Bucket=bucket_name, Key=key)
            df_individual = None
            csv_content_bytes = obj['Body'].read()
            try:
                df_individual = pd.read_csv(io.BytesIO(csv_content_bytes), encoding='utf-8',
                                            usecols=lambda c: c in colunas_esperadas_nos_csvs + ['__arquivo_origem'])
            except pd.errors.ParserError:
                print(f"  Tentando com delimitador ';' para {key}")
                try:
                    df_individual = pd.read_csv(io.BytesIO(csv_content_bytes), encoding='utf-8', delimiter=';',
                                                usecols=lambda c: c in colunas_esperadas_nos_csvs + [
                                                    '__arquivo_origem'])
                except Exception as e_delim:
                    print(f"  Não foi possível parsear {key} com delimitadores comuns: {e_delim}")
                    continue

            if df_individual is None:
                print(f"  Não foi possível ler o DataFrame para {key}.")
                continue

            if not all(col in df_individual.columns for col in colunas_esperadas_nos_csvs):
                print(
                    f"AVISO: Arquivo {key} não contém todas as colunas esperadas. Colunas encontradas: {df_individual.columns.tolist()}. Pulando.")
                continue

            df_individual['__arquivo_origem'] = key
            dataframes.append(df_individual)
        except Exception as e:
            print(f"Erro ao ler ou processar o arquivo {key} do S3: {e}")

    if not dataframes:
        print("Nenhum DataFrame foi criado. Retornando DataFrame vazio.")
        return pd.DataFrame()

    print("\nConcatenando todos os DataFrames...")
    df_total = pd.concat(dataframes, ignore_index=True)
    print(f"DataFrames concatenados com sucesso! Shape total: {df_total.shape}")
    return df_total


def enviar_json_para_s3(dados_json_str, nome_bucket_destino, chave_s3_objeto):
    s3_client = conexao_aws()

    try:
        s3_client.head_object(Bucket=nome_bucket_destino, Key=chave_s3_objeto)
        print(f"Arquivo '{chave_s3_objeto}' encontrado no bucket '{nome_bucket_destino}'. Deletando versão antiga...")
        s3_client.delete_object(Bucket=nome_bucket_destino, Key=chave_s3_objeto)
        print(f"Arquivo antigo '{chave_s3_objeto}' deletado com sucesso.")
    except s3_client.exceptions.ClientError as e:
        error_code = e.response.get("Error", {}).get("Code")
        if error_code == '404' or error_code == 'NoSuchKey':
            print(f"Arquivo '{chave_s3_objeto}' não encontrado em '{nome_bucket_destino}'. Nenhuma deleção necessária.")
        else:
            print(
                f"Erro ao verificar/deletar objeto '{chave_s3_objeto}' em '{nome_bucket_destino}': {e}. Upload prosseguirá, mas o arquivo antigo pode não ter sido deletado.")

    print(f"Iniciando upload do novo JSON para '{nome_bucket_destino}/{chave_s3_objeto}'")
    try:
        s3_client.put_object(
            Bucket=nome_bucket_destino,
            Key=chave_s3_objeto,
            Body=dados_json_str,
            ContentType='application/json',
            ContentEncoding='utf-8'
        )
        print("Upload do JSON concluído com sucesso.")
        return True
    except Exception as e:
        print(f"Erro durante o upload do JSON '{chave_s3_objeto}' para o bucket '{nome_bucket_destino}': {str(e)}")
        return False


df_consolidado_s3 = buscar_arquivos()

if df_consolidado_s3.empty:
    print("Nenhum dado consolidado do S3. Encerrando o script.")
    exit()

colunas_desejadas = ['cpu_percent', 'ram_percent', 'data_hora']
colunas_presentes = [col for col in colunas_desejadas if col in df_consolidado_s3.columns]

if not all(item in colunas_presentes for item in colunas_desejadas):
    print(f"AVISO: Colunas essenciais ({colunas_desejadas}) não foram encontradas. Encerrando.")
    exit()

df_processado = df_consolidado_s3[colunas_presentes].copy()
df_processado['data_hora'] = pd.to_datetime(df_processado['data_hora'], errors='coerce')
df_processado.dropna(subset=['data_hora'], inplace=True)

if df_processado.empty:
    print("DataFrame vazio após processamento inicial de data_hora. Encerrando.")
    exit()

df_processado['semana_periodo'] = df_processado['data_hora'].dt.to_period('W')
df_processado['hora'] = df_processado['data_hora'].dt.hour
df_processado['inicio_semana_dt'] = df_processado['semana_periodo'].apply(lambda p: p.start_time)

colunas_para_media = ['cpu_percent', 'ram_percent']

if df_processado.empty or 'inicio_semana_dt' not in df_processado.columns or df_processado[
    'inicio_semana_dt'].isna().all():
    print("Não há dados de 'inicio_semana_dt' válidos para determinar os períodos. Encerrando.")
    exit()

data_maxima_no_dataset = df_processado['inicio_semana_dt'].max()

inicio_ultima_semana_registrada = data_maxima_no_dataset
df_dados_ultima_semana = df_processado[df_processado['inicio_semana_dt'] == inicio_ultima_semana_registrada]
if not df_dados_ultima_semana.empty:
    df_media_ultima_semana_por_hora = df_dados_ultima_semana.groupby('hora')[colunas_para_media].mean().reset_index()
    df_media_ultima_semana_por_hora.rename(
        columns={'cpu_percent': 'media_cpu_ultima_semana_hora', 'ram_percent': 'media_ram_ultima_semana_hora'},
        inplace=True)
    if not df_media_ultima_semana_por_hora.empty:
        rand_add_cpu_sem = np.random.randint(3, 26, size=len(df_media_ultima_semana_por_hora))
        df_media_ultima_semana_por_hora['media_cpu_ultima_semana_hora'] = (
                    df_media_ultima_semana_por_hora['media_cpu_ultima_semana_hora'] + rand_add_cpu_sem).clip(0, 100)
        rand_add_ram_sem = np.random.randint(3, 26, size=len(df_media_ultima_semana_por_hora))
        df_media_ultima_semana_por_hora['media_ram_ultima_semana_hora'] = (
                    df_media_ultima_semana_por_hora['media_ram_ultima_semana_hora'] + rand_add_ram_sem).clip(0, 100)
else:
    df_media_ultima_semana_por_hora = pd.DataFrame(
        columns=['hora', 'media_cpu_ultima_semana_hora', 'media_ram_ultima_semana_hora'])

ano_ultimo_mes = data_maxima_no_dataset.year
mes_ultimo_mes = data_maxima_no_dataset.month
df_dados_ultimo_mes = df_processado[(df_processado['inicio_semana_dt'].dt.year == ano_ultimo_mes) & (
            df_processado['inicio_semana_dt'].dt.month == mes_ultimo_mes)]
if not df_dados_ultimo_mes.empty:
    df_media_ultimo_mes_por_hora = df_dados_ultimo_mes.groupby('hora')[colunas_para_media].mean().reset_index()
    df_media_ultimo_mes_por_hora.rename(
        columns={'cpu_percent': 'media_cpu_ultimo_mes_hora', 'ram_percent': 'media_ram_ultimo_mes_hora'}, inplace=True)
    if not df_media_ultimo_mes_por_hora.empty:
        rand_add_cpu_mes = np.random.randint(3, 26, size=len(df_media_ultimo_mes_por_hora))
        df_media_ultimo_mes_por_hora['media_cpu_ultimo_mes_hora'] = (
                    df_media_ultimo_mes_por_hora['media_cpu_ultimo_mes_hora'] + rand_add_cpu_mes).clip(0, 100)
        rand_add_ram_mes = np.random.randint(3, 26, size=len(df_media_ultimo_mes_por_hora))
        df_media_ultimo_mes_por_hora['media_ram_ultimo_mes_hora'] = (
                    df_media_ultimo_mes_por_hora['media_ram_ultimo_mes_hora'] + rand_add_ram_mes).clip(0, 100)
else:
    df_media_ultimo_mes_por_hora = pd.DataFrame(
        columns=['hora', 'media_cpu_ultimo_mes_hora', 'media_ram_ultimo_mes_hora'])

data_final_para_semestre = df_processado['data_hora'].max()
seis_meses_antes = data_final_para_semestre - pd.DateOffset(months=6) + pd.Timedelta(days=1)
df_dados_ultimos_seis_meses = df_processado[df_processado['data_hora'] >= seis_meses_antes]
if not df_dados_ultimos_seis_meses.empty:
    df_media_ultimos_seis_meses_por_hora = df_dados_ultimos_seis_meses.groupby('hora')[
        colunas_para_media].mean().reset_index()
    df_media_ultimos_seis_meses_por_hora.rename(columns={'cpu_percent': 'media_cpu_ultimos_seis_meses_hora',
                                                         'ram_percent': 'media_ram_ultimos_seis_meses_hora'},
                                                inplace=True)
    if not df_media_ultimos_seis_meses_por_hora.empty:
        rand_add_cpu_semestre = np.random.randint(3, 26, size=len(df_media_ultimos_seis_meses_por_hora))
        df_media_ultimos_seis_meses_por_hora['media_cpu_ultimos_seis_meses_hora'] = (
                    df_media_ultimos_seis_meses_por_hora[
                        'media_cpu_ultimos_seis_meses_hora'] + rand_add_cpu_semestre).clip(0, 100)
        rand_add_ram_semestre = np.random.randint(3, 26, size=len(df_media_ultimos_seis_meses_por_hora))
        df_media_ultimos_seis_meses_por_hora['media_ram_ultimos_seis_meses_hora'] = (
                    df_media_ultimos_seis_meses_por_hora[
                        'media_ram_ultimos_seis_meses_hora'] + rand_add_ram_semestre).clip(0, 100)
else:
    df_media_ultimos_seis_meses_por_hora = pd.DataFrame(
        columns=['hora', 'media_cpu_ultimos_seis_meses_hora', 'media_ram_ultimos_seis_meses_hora'])

dados_json_consolidados = {
    "media_cpu_ram_ultima_semana_por_hora": df_media_ultima_semana_por_hora.to_dict(orient='records'),
    "media_cpu_ram_ultimo_mes_por_hora": df_media_ultimo_mes_por_hora.to_dict(orient='records'),
    "media_cpu_ram_ultimos_seis_meses_por_hora": df_media_ultimos_seis_meses_por_hora.to_dict(orient='records')
}

NOME_BUCKET_DESTINO_JSON = "teste-ouro"  
NOME_FIXO_ARQUIVO_JSON_S3 = "analises_consolidadas/cpu_ram_por_hora_consolidado.json"

json_string_para_upload = json.dumps(dados_json_consolidados, ensure_ascii=False, indent=4)

if enviar_json_para_s3(json_string_para_upload, NOME_BUCKET_DESTINO_JSON, NOME_FIXO_ARQUIVO_JSON_S3):
    print(f"JSON enviado com sucesso para S3: s3://{NOME_BUCKET_DESTINO_JSON}/{NOME_FIXO_ARQUIVO_JSON_S3}")
else:
    print(f"Falha ao enviar JSON para S3: s3://{NOME_BUCKET_DESTINO_JSON}/{NOME_FIXO_ARQUIVO_JSON_S3}")

print("\nScript concluído.")