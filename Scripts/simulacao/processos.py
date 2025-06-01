import os
import json
import random
import pymysql
import boto3
from dotenv import load_dotenv
from datetime import datetime
import time

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = int(os.getenv("DB_PORT"))
DB_NAME = os.getenv("DB_DATABASE")

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_SESSION_TOKEN = os.getenv("AWS_SESSION_TOKEN")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

SETORES_E_PROCESSOS = {
    "Logística": [
        "Movimentacao_Materiais", "Controle_Estoque", "Separacao_Pedidos",
        "Entrada_Mercadorias", "Expedicao_Produtos"
    ],
    "Linha de Montagem": [
        "Montagem_Componentes", "Teste_Qualidade", "Ajuste_Automatico",
        "Controle_Velocidade", "Medicao_Precisao"
    ],
    "Pintura Industrial": [
        "Preparacao_Superficie", "Aplicacao_Primer", "Pintura_Base",
        "Secagem_Controlada", "Acabamento_Final"
    ],
    "Controle de Qualidade": [
        "Inspecao_Visual", "Teste_Dimensional", "Analise_Materiais",
        "Verificacao_Defeitos", "Controle_Parametros"
    ],
    "Estamparia": [
        "Corte_Chapas", "Conformacao_Metal", "Dobra_Automatica",
        "Perfuracao_Precisao", "Acabamento_Pecas"
    ],
    "Usinagem": [
        "Torneamento_CNC", "Fresagem_Automatica", "Retifica_Precisao",
        "Furacao_Controle", "Medicao_3D"
    ],
    "Embalagem": [
        "Selagem_Automatica", "Rotulagem_Produtos", "Encaixotamento",
        "Paletizacao", "Conferencia_Final"
    ],
    "Armazenamento": [
        "Controle_Temperatura", "Gestao_Estoque", "Separacao_Itens",
        "Organizacao_Espacial", "Inventario_Automatico"
    ],
    "Expedição": [
        "Separacao_Pedidos", "Conferencia_Cargas", "Etiquetagem",
        "Rastreamento_Produtos", "Controle_Saida"
    ],
    "Manutenção": [
        "Manutencao_Preventiva", "Diagnostico_Falhas", "Calibracao_Equipamentos",
        "Monitoramento_Sensores", "Controle_Temperatura"
    ],
    "Injeção Plástica": [
        "Injecao_Materiais", "Controle_Pressao", "Resfriamento_Pecas",
        "Extracao_Automatica", "Controle_Qualidade"
    ],
    "Solda Robotizada": [
        "Solda_Ponto", "Solda_MIG", "Solda_TIG", "Inspecao_Cordao",
        "Controle_Parametros"
    ],
    "Tratamento Térmico": [
        "Aquecimento_Controlado", "Resfriamento_Gradual", "Tempera_Metais",
        "Revenimento", "Normalizacao"
    ],
    "Prensagem": [
        "Prensagem_Hidraulica", "Conformacao_Metal", "Estampagem_Precisao",
        "Controle_Pressao", "Medicao_Forca"
    ],
    "Fundição": [
        "Fusao_Metais", "Vazamento_Controlado", "Resfriamento_Pecas",
        "Desmoldagem", "Acabamento_Fundicao"
    ],
    "Galvanoplastia": [
        "Banho_Quimico", "Eletrodeposicao", "Controle_pH", "Lavagem_Tecnica",
        "Secagem_Controlada"
    ],
    "Corte e Dobra": [
        "Corte_Laser", "Dobra_CNC", "Medicao_Precisao", "Acabamento_Bordas",
        "Controle_Dimensional"
    ],
    "Ferramentaria": [
        "Fabricacao_Moldes", "Usinagem_Ferramentas", "Afiacao_Precisao",
        "Manutencao_Ferramental", "Controle_Desgaste"
    ],
    "Laboratório": [
        "Analise_Materiais", "Teste_Resistencia", "Medicao_Precisao",
        "Controle_Qualidade", "Calibracao_Instrumentos"
    ],
    "Refrigeração": [
        "Controle_Temperatura", "Monitoramento_Umidade", "Manutencao_Sistemas",
        "Regulagem_Automatica", "Eficiencia_Energetica"
    ],
    "Caldeiraria": [
        "Fabricacao_Caldeiras", "Soldagem_Industrial", "Conformacao_Chapas",
        "Montagem_Estrutural", "Teste_Pressao"
    ]
}

def buscar_alertas():
    conexao = None
    try:
        conexao = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            port=DB_PORT,
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )

        with conexao.cursor() as cursor:
            sql_query = """
                SELECT
                    a.id AS alerta_id,
                    a.dataHora,
                    sf.nome AS setor_nome,
                    ec.id AS empresa_consumidor_id,
                    cp.fabrica_consumidor_id AS fabrica_id,
                    fc.nome AS fabrica_nome,
                    p.id AS plc_id,
                    p.modelo AS plc_modelo,
                    a.tipo_valor AS tipo_alerta_valor
                FROM alerta a
                JOIN config_plc cp ON a.config_plc_id = cp.id
                JOIN plc p ON cp.plc_id = p.id
                JOIN setor_fabrica sf ON p.setor_fabrica_id = sf.id
                JOIN parceria pa ON p.parceria_id = pa.id
                JOIN empresa_consumidor ec ON pa.empresa_consumidor_id = ec.id
                JOIN fabrica_consumidor fc ON fc.id = cp.fabrica_consumidor_id;
                """
            cursor.execute(sql_query)
            linhas = cursor.fetchall()
            
            alertas_formatados = []
            for linha_dict in linhas:
                data_hora_alerta = linha_dict["dataHora"]
                data_hora_str = data_hora_alerta.strftime("%Y-%m-%d %H:%M:%S") if isinstance(data_hora_alerta, datetime) else str(data_hora_alerta)
                
                alerta = {
                    "id_alerta": linha_dict["alerta_id"],
                    "dataHora": data_hora_str,
                    "setor": linha_dict["setor_nome"],
                    "empresa_consumidor_id": linha_dict["empresa_consumidor_id"],
                    "fabrica_id": linha_dict["fabrica_id"],
                    "fabrica_nome": linha_dict["fabrica_nome"],
                    "plc_id": linha_dict["plc_id"],
                    "modelo_plc": linha_dict["plc_modelo"],
                    "tipo_alerta_valor": linha_dict["tipo_alerta_valor"]
                }
                
                alertas_formatados.append(alerta)
            
            return alertas_formatados
    
    except Exception as e:
        print(f"Erro ao buscar alertas: {e}")
        return []
    
    finally:
        if conexao:
            conexao.close()

def simular_processos(setor):
    if setor not in SETORES_E_PROCESSOS:
        print(f"Aviso: Setor '{setor}' não encontrado no dicionário SETORES_E_PROCESSOS. Nenhum processo será simulado para ele.")
        return []
    
    processos_do_setor = SETORES_E_PROCESSOS[setor]
    if not processos_do_setor: 
        print(f"Aviso: Setor '{setor}' não possui processos definidos em SETORES_E_PROCESSOS.")
        return []

    quantidade = random.randint(min(2, len(processos_do_setor)), min(6, len(processos_do_setor))) 
    num_processos_a_selecionar = quantidade
    
    processos_selecionados = random.sample(
        processos_do_setor,
        num_processos_a_selecionar
    )

    simulados = []
    for nome in processos_selecionados:
        processo = {
            "nome": nome,
            "cpu": round(random.uniform(5.0, 60.0), 1),
            "ram": round(random.uniform(2.0, 50.0), 1)
        }
        simulados.append(processo)
    return simulados

def registrar_processos(alertas):
    simulacoes = []
    
    for alerta_data in alertas:
        processos = simular_processos(alerta_data["setor"])
        
        simulacao = {
            "id_alerta": alerta_data["id_alerta"],
            "dataHora": alerta_data["dataHora"],
            "setor": alerta_data["setor"],
            "empresa_consumidor_id": alerta_data.get("empresa_consumidor_id"),
            "fabrica_id": alerta_data.get("fabrica_id"),
            "plc_id": alerta_data.get("plc_id"),
            "modelo_plc": alerta_data.get("modelo_plc"),
            "tipo_alerta_valor": alerta_data.get("tipo_alerta_valor"),
            "fabrica_nome": alerta_data.get("fabrica_nome"),
            "processos": processos
        }
        simulacoes.append(simulacao)
            
    return simulacoes

# def salvar_simulacoes(simulacoes, nome_arquivo="processos_simulados.json"):
#     try:
#         with open(nome_arquivo, "w", encoding='utf-8') as arquivo:
#             json.dump(simulacoes, arquivo, indent=4, ensure_ascii=False)
#         print(f"Simulações salvas em {nome_arquivo}")
#     except Exception as e:
#         print(f"Erro ao salvar simulações: {e}")

def enviar_para_s3(nome_arquivo, bucket=S3_BUCKET_NAME):
    if not all([AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, bucket]):
        print("Erro: Credenciais AWS ou nome do bucket não configurados para envio ao S3.")
        return

    try:
        s3_client_args = {
            'service_name': 's3',
            'aws_access_key_id': AWS_ACCESS_KEY_ID,
            'aws_secret_access_key': AWS_SECRET_ACCESS_KEY,
        }
        if AWS_SESSION_TOKEN:
            s3_client_args['aws_session_token'] = AWS_SESSION_TOKEN
        
        s3 = boto3.client(**s3_client_args)

        s3.upload_file(nome_arquivo, bucket, os.path.basename(nome_arquivo))
        print(f"Arquivo {nome_arquivo} enviado para o bucket {bucket} no S3 como {os.path.basename(nome_arquivo)}")
    except Exception as e:
        print(f"Erro ao enviar para S3: {e}")

def main_loop():
    print("Iniciando o monitoramento e simulação contínua de processos...")
    intervalo_verificacao = 30

    while True:
        print(f"\n--- {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} --- Iniciando novo ciclo de verificação ---")
        try:
            print("Buscando alertas do banco de dados...")
            alertas_do_banco = buscar_alertas()
            
            if not alertas_do_banco:
                print("Nenhum alerta encontrado neste ciclo ou erro ao buscar alertas.")
            else:
                print(f"Encontrados {len(alertas_do_banco)} alertas válidos.")
                
                print("Simulando processos para os alertas encontrados...")
                simulacoes_com_processos = registrar_processos(alertas_do_banco)

                if simulacoes_com_processos:
                    nome_do_arquivo_json = "processos_simulados.json"
                    # salvar_simulacoes(simulacoes_com_processos, nome_do_arquivo_json)

                    print("Enviando arquivo de simulações para o S3...")
                    enviar_para_s3(nome_do_arquivo_json)
                else:
                    print("Nenhuma simulação foi gerada (possivelmente nenhum processo definido para os setores encontrados ou nenhum alerta válido).")

            print("--- Ciclo de verificação concluído ---")

        except Exception as e:
            print(f"Erro inesperado no ciclo principal: {e}")
        
        print(f"Aguardando {intervalo_verificacao} segundos para o próximo ciclo...")
        time.sleep(intervalo_verificacao)

if __name__ == "__main__":
    main_loop()