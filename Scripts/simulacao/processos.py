import os
import json
import random
import pymysql
import boto3
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

# Configurações do banco de dados
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = int(os.getenv("DB_PORT"))
DB_NAME = os.getenv("DB_DATABASE")

# Configurações AWS
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
        "Monitoramento_Sensores", "Controle_Temperatura" # Nota: "Controle_Temperatura" também está em "Refrigeração"
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
        )

        cursor = conexao.cursor()
        sql_query = """
            SELECT
                a.id,
                a.dataHora,
                sf.nome AS setor,
                ec.id AS empresa_consumidor_id
            FROM alerta a
            JOIN config_plc cp ON a.config_plc_id = cp.id
            JOIN plc p ON cp.plc_id = p.id
            JOIN setor_fabrica sf ON p.setor_fabrica_id = sf.id
            JOIN parceria pa ON p.parceria_id = pa.id
            JOIN empresa_consumidor ec ON pa.empresa_consumidor_id = ec.id;
            """
        cursor.execute(sql_query)
        linhas = cursor.fetchall()
        
        alertas = []
        for linha in linhas:
            data_hora_alerta = linha[1]
            data_hora_str = data_hora_alerta.strftime("%Y-%m-%d %H:%M:%S") if isinstance(data_hora_alerta, datetime) else None
            
            alerta = {
                "id": linha[0],
                "dataHora": data_hora_str,
                "setor": linha[2],
                "empresa_consumidor_id": linha[3]  # <-- Adicione esta linha!
            }
            if alerta["setor"]:
                 alertas.append(alerta)
        
        return alertas
    
    except Exception as e:
        print(f"Erro ao buscar alertas: {e}")
        return []
    
    finally:
        if conexao and conexao.open:
            conexao.close()

def simular_processos(setor):
    if setor not in SETORES_E_PROCESSOS:
        print(f"Aviso: Setor '{setor}' não encontrado no dicionário SETORES_E_PROCESSOS. Nenhum processo será simulado para ele.")
        return []
    
    quantidade = random.randint(2, 6)
    processos_do_setor = SETORES_E_PROCESSOS[setor]
    num_processos_a_selecionar = min(quantidade, len(processos_do_setor))
    
    if num_processos_a_selecionar == 0 and len(processos_do_setor) > 0:
         num_processos_a_selecionar = 1


    if not processos_do_setor:
        print(f"Aviso: Setor '{setor}' não possui processos definidos em SETORES_E_PROCESSOS.")
        return []

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
    """Registra processos para cada alerta"""
    simulacoes = []
    
    for alerta in alertas:
        if alerta.get("setor"):
            processos = simular_processos(alerta["setor"])
            simulacao = {
                "id_alerta": alerta["id"],
                "dataHora": alerta["dataHora"],
                "setor": alerta["setor"],
                "processos": processos
            }
            simulacoes.append(simulacao)
        else:
            print(f"Aviso: Alerta ID {alerta.get('id')} não possui setor definido ou o setor não foi encontrado. Processos não simulados para este alerta.")
            
    return simulacoes

def salvar_simulacoes(simulacoes, nome_arquivo="processos_simulados.json"):
    try:
        with open(nome_arquivo, "w", encoding='utf-8') as arquivo:
            json.dump(simulacoes, arquivo, indent=4, ensure_ascii=False)
        print(f"Simulações salvas em {nome_arquivo}")
    except Exception as e:
        print(f"Erro ao salvar simulações: {e}")

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

        s3.upload_file(nome_arquivo, bucket, os.path.basename(nome_arquivo)) # Usa os.path.basename para o object key
        print(f"Arquivo {nome_arquivo} enviado para o bucket {bucket} no S3 como {os.path.basename(nome_arquivo)}")
    except Exception as e:
        print(f"Erro ao enviar para S3: {e}")

def main():
    print("Iniciando simulação de processos...")
    
    print("Buscando alertas do banco de dados...")
    alertas = buscar_alertas()
    
    if not alertas:
        print("Nenhum alerta encontrado ou erro ao buscar alertas. Encerrando.")
        return

    print(f"Encontrados {len(alertas)} alertas com setor associado.")
    
    if len(alertas) > 0:
        print("Simulando processos para os alertas encontrados...")
        simulacoes = registrar_processos(alertas)

        if simulacoes:
            print("Salvando simulações em arquivo local...")
            nome_do_arquivo_json = "processos_simulados.json"
            salvar_simulacoes(simulacoes, nome_do_arquivo_json)

            print("Enviando arquivo de simulações para o S3...")
            enviar_para_s3(nome_do_arquivo_json)
        else:
            print("Nenhuma simulação foi gerada (possivelmente nenhum setor encontrado nos alertas ou nenhum processo definido para os setores encontrados).")
    else:
        print("Nenhum alerta com setor associado foi encontrado para simulação.")


    print("Processo de simulação concluído!")

if __name__ == "__main__":
    main()