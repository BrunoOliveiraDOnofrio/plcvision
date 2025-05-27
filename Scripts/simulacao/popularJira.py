import random
import time
import json
import requests
import mysql.connector as db
import selectsInfos
from datetime import datetime, timedelta
import random

from datetime import datetime
from pytz import timezone
import csv 
import os

horariosComAlertasEConfig = []
plcs_csvs_gerados = []

def gerar_csv_plc(plc_id, config_id, data_base):
    """
    Gera um CSV com 1200 registros (50 por hora, 24 horas) para o PLC informado.
    Cada linha contém: timestamp, plc_id, config_id, valor_simulado

    horariosComAlertasEConfig.append({
                "horario" : horarioMysql,
                "config_id": config_id,
                "valor": valor,
                "coluna_captura": campo,
                "limite_critico": limite_critico,
                "limite_atencao": limite_atencao,
            })
    """
    mesAtual = data_base.strftime("%m")
    diaAtual = data_base.strftime("%d")
    #data_base = data_base.replace(month=int(mesAtual))
    while True:
        if f"{data_base.strftime('%Y-%m-%d')}_{plc_id}" in plcs_csvs_gerados:
            print(f"CSV para PLC {plc_id} já foi gerado.")
            return
        if data_base.strftime("%m") == "11":
            break
        registros = []
        colunas = ["dataHora", "maquinaId"]
        horarios = []
        for informacoes in horariosComAlertasEConfig:    
            colunas.append(informacoes["coluna_captura"])
            horarios.append(informacoes["horario"])
        for hora in range(24):
            for i in range(50):
                # Gera um timestamp para cada registro dentro da hora
                minuto = i * (60 // 50)
                segundo = (i * (60 // 50) * 60) % 60
                timestamp = data_base.replace(hour=hora, minute=minuto, second=segundo)
                registros.append([
                    timestamp.strftime("%Y-%m-%d %H:%M:%S"),
                    plc_id,
                ])
                
                valores_simulados = []
                for i, coluna in enumerate(colunas[2:]):
                    horaRegistro = horariosComAlertasEConfig[i]["horario"].split(" ")[1].split(":")[0]
                    
                    if hora >= int(horaRegistro) and hora <= int(horaRegistro) + 1: 
                        valor = random.uniform(0, int(horariosComAlertasEConfig[i]["limite_atencao"]))  # Simule o valor conforme sua lógica
                        
                    else:
                        valor = random.uniform(int(horariosComAlertasEConfig[i]['limite_atencao']), int(horariosComAlertasEConfig[i]["limite_critico"]))
                        
                    valores_simulados.append(valor)
                registros[-1].extend(valores_simulados)
                
                
                
        # Cria diretório se não existir
        os.makedirs(f"csv_plcs/{timestamp.strftime('%Y-%m')}", exist_ok=True)
        nome_arquivo = f"csv_plcs/{timestamp.strftime("%Y-%m")}/{timestamp.strftime("%Y-%m-%d")}_{plc_id}.csv"
        with open(nome_arquivo, "w", newline="") as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(colunas)
            writer.writerows(registros)
        plcs_csvs_gerados.append(f"{timestamp.strftime("%Y-%m-%d")}_{plc_id}")
        data_base = timestamp - timedelta(days=1)  # Decrementa um dia para o 
        print(f"{data_base.strftime('%Y-%m-%d')}_{plc_id}")
          
        




def gerar_datetimes_atrasados(qtd=100, atraso_min_horas=8):
    agora = datetime.now()
    datetimes = []
    for _ in range(qtd):
        # Gera um atraso aleatório entre 8 e 48 horas atrás
        atraso_horas = random.uniform(atraso_min_horas, 48)
        dt = agora - timedelta(hours=atraso_horas)
        datetimes.append(dt)
    return datetimes


foraDoPadrao = []
empresaGerandoAlertas = None
# Configurações de conexão com o banco
def conexao_select():
    # configurar var de ambientes e criar conexao com o banco de dados

    conexao_db = db.connect(
        host='127.0.0.1',
        port=3306,
        user='root',
        password='linkinpark',
        database='plcvision'
    )

    return conexao_db

URL = "http://localhost:3000/monitoramento/0"
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

def enviar_monitoramento(plc, rodadaDeAlerta, horario, horarioMysql):
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
        
        if True:
            valor = random.randint(limite_atencao + 1, limite_critico + 1)
            selectsInfos.inserirAlertaSimulado(horarioMysql,horario ,config_id, valor, f"{hardware} {tipo_dado}", 1, tipo_dado, unidade_dado, hardware, fabrica_id, id_plc)
            horariosComAlertasEConfig.append({
                "horario" : horarioMysql,
                "config_id": config_id,
                "valor": valor,
                "coluna_captura": campo,
                "limite_critico": limite_critico,
                "limite_atencao": limite_atencao,
            })
            alertas += 1
            if alertas == 1:
                rodadaDeAlerta = False
        else:
            valor = simular_valor(tipo_dado, limite_critico, limite_atencao)

        
        

def simular_monitoramento():
    global empresaGerandoAlertas
    plcs = obter_plcs_com_config()
    horarios = gerar_datetimes_atrasados(100, 8)
    for i, plc in enumerate(plcs) :
        enviar_monitoramento(plc, True, horarios[i].strftime("%Y-%m-%dT%H:%M:%S.000+0000"),horarios[i].strftime("%Y-%m-%d %H:%M:%S"))
        # gerar_csv_plc(plc["plc_id"], plc["configuracoes"], horarios[i])
        # horariosComAlertasEConfig.clear()
        
    

if __name__ == "__main__":
    simular_monitoramento()

horarios = gerar_datetimes_atrasados(100, 8)

for horario in horarios:
    print(horario.strftime("%Y-%m-%dT%H:%M:%S.000+0000"))