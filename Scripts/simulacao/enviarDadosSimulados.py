import random
import time
import json
import requests
import mysql.connector as db
import selectsInfos

from datetime import datetime
from pytz import timezone

foraDoPadrao = []
empresaGerandoAlertas = None
# Configurações de conexão com o banco
def conexao_select():
    # configurar var de ambientes e criar conexao com o banco de dados

    conexao_db = db.connect(
        host='db',
        port=3306,
        user='plc_manager',
        password='plc_password',
        database='plcvision'
    )

    return conexao_db

URL = "http://52.200.168.178/monitoramento/0"
HEADERS = {'Content-Type': 'application/json'}

def simular_valor(tipo_dado, limite_critico, limite_atencao):
    print(limite_atencao)
    if tipo_dado == "Temperatura":
        return round(random.uniform(30, limite_atencao), 2)
    elif tipo_dado == "Uso":
        return round(random.uniform(10, limite_atencao), 2)
    elif tipo_dado == "Atividade":
        return random.randint(0, limite_atencao)
    elif tipo_dado == "Ociosidade":
        return random.randint(0, limite_atencao)
    elif tipo_dado == "Memoria Livre":
        return random.randint(0, limite_atencao)
    elif tipo_dado == "Quantidade":
        return random.randint(20, limite_atencao)
    elif tipo_dado == "Frequência":
        return round(random.uniform(0, limite_atencao), 2)
    elif tipo_dado == "Uso em Bytes":
        return random.randint(0, limite_atencao)
    elif tipo_dado == "Tempo Restante":
        return random.randint(10, 300)
    elif tipo_dado in ["Pacote Recebido", "Pacote Mandado"]:
        return random.randint(0, limite_atencao)
    else:
        return random.randint(1, 100)

def obter_plcs_com_config():
    con = conexao_select()

    cursor = con.cursor()
    cursor.execute("""
        SELECT plc.id,  p.empresa_consumidor_id, fc.id as fabricaId
        FROM plc
        JOIN parceria p ON plc.parceria_id = p.id
        JOIN setor_fabrica sf 
        ON sf.id = plc.setor_fabrica_id
        JOIN fabrica_consumidor fc
        ON sf.fabrica_consumidor_id = fc.id
                   ORDER BY RAND();
    """)
    plcs = cursor.fetchall()

    resultado = []
    for plc_id,  empresa_id, fabricaId in plcs:
        cursor.execute("""
            SELECT c.id, comp.hardware, comp.tipo_dado, comp.unidade_dado,comp.coluna_captura, c.limite_critico, c.limite_atencao
            FROM config_plc c
            JOIN componente comp ON c.componente_id = comp.id
            WHERE c.plc_id = %s;
        """, (plc_id,))
        configuracoes = cursor.fetchall()
        resultado.append({
            "plc_id": plc_id,
            "empresa_id": empresa_id,
            "fabrica_id" : fabricaId,
            "configuracoes": configuracoes
        })

    cursor.close()
    con.close()
    return resultado

def enviar_monitoramento(plc, rodadaDeAlerta):
    global empresaGerandoAlertas
    global foraDoPadrao 
    id_plc = plc["plc_id"]
    empresa_id = plc["empresa_id"]
    fabrica_id = plc["fabrica_id"]
    if not empresaGerandoAlertas and rodadaDeAlerta:
        empresaGerandoAlertas = empresa_id
    alertas = 0
    dados = []
    for config in plc["configuracoes"]:
        config_id, hardware, tipo_dado, unidade_dado, campo, limite_critico, limite_atencao = config
        
        
        limite_atencao = int(limite_atencao)
        limite_critico = int(limite_critico)

        valor = None
        
        if rodadaDeAlerta and empresa_id == empresaGerandoAlertas:
            valor = random.randint(limite_atencao + 1, limite_critico + 1)
            # selectsInfos.inserirAlerta(config_id, valor, f"{hardware} {tipo_dado}", 1, tipo_dado, unidade_dado, hardware, fabrica_id, id_plc)
            alertas += 1
            if alertas == 1:
                rodadaDeAlerta = False
        else:
            valor = simular_valor(tipo_dado, limite_critico, limite_atencao)

        fora_padrao = 0

        if valor:
            if valor >= limite_critico:
           
                fora_padrao = 3
            elif valor >= limite_atencao:
                fora_padrao = 2
            elif valor >= (limite_atencao * 0.8):
                fora_padrao = 1
           
            dados.append({
                "valor": valor,
                "campo": f"{hardware} {tipo_dado}",
                "config_id": config_id,
                "foraPadrao": fora_padrao
            })

        payload = {
            "empresa": empresa_id,
            "maquina": id_plc,
            "dados": dados
        }

        try:
            response = requests.get(URL, headers=HEADERS, data=json.dumps(payload))
            print(f"[{datetime.now()}] Enviado dados para PLC {id_plc} - Status: {response.status_code}")
        except Exception as e:
            print(f"Erro ao enviar para API: {e}")

def simular_monitoramento():
    global empresaGerandoAlertas
    plcs = obter_plcs_com_config()
    while True:
        empresaGerandoAlertas =None
        rodadaDeAlerta = random.randint(0, 10) > 3
        if rodadaDeAlerta:
            print('RODADA DE ALERTAS')
        random.shuffle(plcs)
        for plc in plcs:
            enviar_monitoramento(plc, True)
        time.sleep(1)

simular_monitoramento()
