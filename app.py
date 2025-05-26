import os
import json
import boto3
import pymysql
from flask import Flask, jsonify, render_template, request
from dotenv import load_dotenv
from flask_cors import CORS # Importar o CORS

load_dotenv()

app = Flask(__name__)
# Permitir requisições do seu frontend (http://localhost:3000) para todos os endpoints /api/*
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Configurações AWS e S3 (do .env)
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_SESSION_TOKEN = os.getenv("AWS_SESSION_TOKEN")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")
S3_JSON_FILE_KEY = os.getenv("S3_JSON_FILE_KEY", "processos_simulados_enriquecido.json")

# Configurações do Banco de Dados (do .env)
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_DATABASE")
DB_PORT = int(os.getenv("DB_PORT", 3306))

# Dados de exemplo para filtros (ou busque do DB se preferir)
EMPRESAS_EXEMPLO_FABRICANTES = [{"id": "1", "nome": "PLC Solutions Ltda"}, {"id": "2", "nome": "Automação Global Inc."}]
FABRICAS_EXEMPLO = [{"id": "fab_alpha", "nome": "Linha Alpha de PLCs"}, {"id": "fab_beta", "nome": "Série Beta Industrial"}]
SETORES_DEFINIDOS = [
    "Logística", "Linha de Montagem", "Pintura Industrial", "Controle de Qualidade", "Estamparia", "Usinagem", 
    "Embalagem", "Armazenamento", "Expedição", "Manutenção", "Injeção Plástica", "Solda Robotizada", 
    "Tratamento Térmico", "Prensagem", "Fundição", "Galvanoplastia", "Corte e Dobra", "Ferramentaria", 
    "Laboratório", "Refrigeração", "Caldeiraria"
]

def get_db_connection():
    try:
        return pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD,
                               database=DB_NAME, port=DB_PORT,
                               cursorclass=pymysql.cursors.DictCursor,
                               connect_timeout=10) # Adicionado timeout
    except Exception as e:
        print(f"DB Connection Error: {e}")
        return None

def query_db(sql, params=None, fetchone=False):
    conn = get_db_connection()
    if not conn: return None
    try:
        with conn.cursor() as cursor:
            cursor.execute(sql, params or ())
            return cursor.fetchone() if fetchone else cursor.fetchall()
    finally:
        conn.close()

@app.route('/')
def index_route():
    return "API Flask para PlcVision Dashboard está rodando. Acesse seu frontend na porta 3000."

# --- Endpoints para Filtros ---
@app.route('/api/fabricantes') # Seu JS chama /api/fabricantes
def get_fabricantes():
    return jsonify(EMPRESAS_EXEMPLO_FABRICANTES)

@app.route('/api/fabricas')
def get_fabricas():
    return jsonify(FABRICAS_EXEMPLO)

@app.route('/api/setores')
def get_setores():
    setores_formatados = [{"id": setor.replace(" ", "_").lower(), "nome": setor} for setor in SETORES_DEFINIDOS]
    return jsonify(setores_formatados)

# --- Endpoint para lista inicial de modelos de PLC ---
@app.route('/api/fabricante/<int:empresa_id>/modelos')
def get_modelos_por_fabricante(empresa_id):
    conn = get_db_connection()
    if not conn: return jsonify({"erro": "DB Connection Error"}), 500
    try:
        with conn.cursor() as cursor:
            sql = """
                SELECT
                    p.modelo AS id,
                    p.modelo AS nome,
                    COUNT(DISTINCT a.id) AS quantidade_alertas
                FROM plc p
                JOIN parceria pa ON p.parceria_id = pa.id
                LEFT JOIN config_plc cp ON cp.plc_id = p.id
                LEFT JOIN alerta a ON a.config_plc_id = cp.id
                WHERE pa.empresa_fabricante_id = %s
                GROUP BY p.modelo
                ORDER BY quantidade_alertas DESC;
            """
            cursor.execute(sql, (empresa_id,))
            modelos = cursor.fetchall()
            return jsonify(modelos)
    except Exception as e:
        print(f"Erro API /modelos: {e}")
        return jsonify({"erro": str(e)}), 500
    finally:
        if conn: conn.close()

# --- Endpoints para Detalhes de um Modelo ---
# Idealmente, estes também receberiam empresa_id para segurança/escopo
@app.route('/api/modelo/<path:modelo_id>/alertas') # modelo_id aqui é o nome do modelo (string)
def get_alertas_por_modelo(modelo_id):
    empresa_id_param = request.args.get('empresa_id') # Tenta pegar empresa_id se o JS enviar
    conn = get_db_connection()
    if not conn: return jsonify({"erro": "DB Connection Error"}), 500
    try:
        with conn.cursor() as cursor:
            # Se empresa_id_param for fornecido, adicione ao WHERE
            # Ex: AND pa.empresa_fabricante_id = %s
            # Por simplicidade, omitindo por agora, mas é importante para dados corretos.
            sql = """
                SELECT a.*, cp.plc_id, p.lote as lote_plc, p.modelo as modelo_plc
                FROM alerta a
                JOIN config_plc cp ON a.config_plc_id = cp.id
                JOIN plc p ON cp.plc_id = p.id
                WHERE p.modelo = %s
                ORDER BY a.dataHora DESC;
            """
            cursor.execute(sql, (modelo_id,))
            alertas = cursor.fetchall()
            return jsonify(alertas)
    except Exception as e:
        print(f"Erro API /alertas: {e}")
        return jsonify({"erro": str(e)}), 500
    finally:
        if conn: conn.close()

@app.route('/api/modelo/<path:modelo_id>/processos') # modelo_id aqui é o nome do modelo (string)
def get_processos_simulados_por_modelo(modelo_id):
    empresa_id_param = request.args.get('empresa_id') # Tenta pegar empresa_id se o JS enviar
    if not all([AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET_NAME, S3_JSON_FILE_KEY]):
        return jsonify({"erro": "Config AWS incompleta"}), 500
    try:
        s3_client_args = {'service_name': 's3', 'aws_access_key_id': AWS_ACCESS_KEY_ID, 'aws_secret_access_key': AWS_SECRET_ACCESS_KEY}
        if AWS_SESSION_TOKEN: s3_client_args['aws_session_token'] = AWS_SESSION_TOKEN
        s3 = boto3.client(**s3_client_args)
        
        s3_object = s3.get_object(Bucket=S3_BUCKET_NAME, Key=S3_JSON_FILE_KEY)
        file_content = s3_object['Body'].read().decode('utf-8')
        todas_simulacoes = json.loads(file_content)

        # Filtra pelo nome do modelo. Adicionar filtro por empresa_id_param se ele vier e existir no JSON do S3.
        # Ex: if sim.get('empresa_fabricante_id') == int(empresa_id_param)
        simulacoes_filtradas = [sim for sim in todas_simulacoes if sim.get('modelo_plc') == modelo_id]
        return jsonify(simulacoes_filtradas)
    except Exception as e:
        print(f"Erro API /processos S3: {e}")
        return jsonify({"erro": f"Falha S3: {str(e)}"}), 500

@app.route('/api/modelo/<path:modelo_id>/lotes') # modelo_id aqui é o nome do modelo (string)
def get_lotes_por_modelo(modelo_id):
    empresa_id_param = request.args.get('empresa_id') # Tenta pegar empresa_id se o JS enviar
    conn = get_db_connection()
    if not conn: return jsonify({"erro": "DB Connection Error"}), 500
    try:
        with conn.cursor() as cursor:
            # Adicionar WHERE para empresa_id_param se necessário
            sql = """
                SELECT p.lote, COUNT(DISTINCT a.id) as quantidade_alertas 
                FROM plc p
                LEFT JOIN config_plc cp ON p.id = cp.plc_id
                LEFT JOIN alerta a ON cp.id = a.config_plc_id
                WHERE p.modelo = %s AND p.lote IS NOT NULL
                GROUP BY p.lote ORDER BY quantidade_alertas DESC;
            """
            cursor.execute(sql, (modelo_id,))
            lotes = cursor.fetchall()
            return jsonify(lotes)
    except Exception as e:
        print(f"Erro API /lotes: {e}")
        return jsonify({"erro": str(e)}), 500
    finally:
        if conn: conn.close()

# --- Endpoint Novo para /api/fabricante/${empresaId}/plcs ---
@app.route('/api/fabricante/<int:empresa_id>/plcs')
def get_plcs_por_fabricante(empresa_id):
    conn = get_db_connection()
    if not conn: return jsonify({"erro": "DB Connection Error"}), 500
    try:
        with conn.cursor() as cursor:
            sql = """
                SELECT p.id, p.modelo, p.hostname, p.lote, sf.nome as setor_nome
                FROM plc p
                JOIN parceria pa ON p.parceria_id = pa.id
                LEFT JOIN setor_fabrica sf ON p.setor_fabrica_id = sf.id
                WHERE pa.empresa_fabricante_id = %s
                ORDER BY p.modelo, p.hostname;
            """
            cursor.execute(sql, (empresa_id,))
            plcs = cursor.fetchall()
            return jsonify(plcs)
    except Exception as e:
        print(f"Erro API /plcs: {e}")
        return jsonify({"erro": str(e)}), 500
    finally:
        if conn: conn.close()

@app.route('/api/fabricante/<int:empresa_id>/modelos_com_detalhes_agregados')
def get_modelos_com_agregados(empresa_id):
    fabrica_id = request.args.get('fabrica_id')  # Passe isso do front!
    sql = """
        SELECT
            p.modelo AS nome_modelo,
            COUNT(DISTINCT a.id) AS total_alertas_modelo,
            GROUP_CONCAT(DISTINCT CAST(a.id AS CHAR)) AS ids_alertas_do_modelo_concat
        FROM plc p
        JOIN parceria pa ON p.parceria_id = pa.id
        LEFT JOIN config_plc cp ON cp.plc_id = p.id
        LEFT JOIN alerta a ON a.config_plc_id = cp.id
        WHERE pa.empresa_fabricante_id = %s
        GROUP BY p.modelo
        ORDER BY total_alertas_modelo DESC;
    """
    modelos = query_db(sql, (empresa_id,))
    lista_final = []
    for m in modelos:
        ids = [int(i) for i in m['ids_alertas_do_plc'].split(',')] if m['ids_alertas_do_plc'] else []
        sql_lotes = """
            SELECT p_lote.lote AS nome_lote, COUNT(DISTINCT a_lote.id) AS alertas_no_lote
            FROM plc p_lote
            JOIN parceria pa_lote ON p_lote.parceria_id = pa_lote.id
            LEFT JOIN config_plc cp_lote ON cp_lote.plc_id = p_lote.id
            LEFT JOIN alerta a_lote ON a_lote.config_plc_id = cp_lote.id
            WHERE pa_lote.empresa_fabricante_id = %s AND p_lote.modelo = %s AND p_lote.lote IS NOT NULL
            GROUP BY p_lote.lote
            HAVING COUNT(DISTINCT a_lote.id) > 0
            ORDER BY alertas_no_lote DESC;
        """
        lotes = query_db(sql_lotes, (empresa_id, m['nome_modelo']))
        lista_final.append({
            "nome_modelo": m['nome_modelo'],
            "total_alertas_modelo": m['total_alertas_modelo'],
            "ids_alertas_do_modelo": ids,
            "lotes_com_alertas": lotes
        })
    return jsonify(lista_final)

# Certifique-se de que o resto do seu app.py (outras rotas, get_db_connection, etc.) está lá.
# E a inicialização do Flask:
# if __name__ == '__main__':
#     app.run(debug=True, port=5001)

if __name__ == '__main__':
    app.run(debug=True, port=5001)