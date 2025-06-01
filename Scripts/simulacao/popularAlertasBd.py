import random
import time
import json
import requests
import mysql.connector as db
import selectsInfos
from datetime import datetime, timedelta
import csv
import os
import aws

# This will store all alerts generated for a specific PLC on a specific day, to be included in its daily CSV
# We'll clear this for each PLC before processing
horariosComAlertasEConfig_for_plc_csv = [] 
plcs_csvs_gerados = [] # Tracks which PLC CSVs have already been generated for a given day

qtdAlertasGerados = 0  # This will now track alerts per company per day

def gerar_csv_plc_diario(plc_id, config_details, data_base, alerts_for_this_plc_day):
    """
    Gera um CSV diário com 800 registros para o PLC informado.
    Cada linha contém: timestamp, plc_id, valor_simulado para cada coluna de captura configurada.
    """
    date_str = data_base.strftime('%Y-%m-%d')
    # Use plc_id in the check to ensure we only generate once per PLC per day
    if f"{date_str}_{plc_id}" in plcs_csvs_gerados:
        print(f"CSV para PLC {plc_id} em {date_str} já foi gerado.")
        return

    registros = []
    
    # Dynamically collect all unique column names (campo) from this PLC's configurations
    all_capture_columns = set()
    for config in config_details:
        all_capture_columns.add(config[4]) # config[4] is 'coluna_captura'

    colunas = ["dataHora", "maquinaId"]
    colunas.extend(sorted(list(all_capture_columns))) # Add and sort for consistent column order

    for hora in range(24):
        for i in range(34):  # 800 records / 24 hours = approx 33.33 records per hour, rounding up to 34 to ensure 800+
            minuto = i * (60 // 34)
            segundo = (i * (60 // 34) * 60) % 60
            timestamp = data_base.replace(hour=hora, minute=minuto, second=segundo, microsecond=0) # Clear microseconds

            row_data = [
                timestamp.strftime("%Y-%m-%d %H:%M:%S"),
                plc_id,
            ]
            
            # Initialize values for all dynamic columns as None
            simulated_values_for_row = [None] * (len(colunas) - 2) 

            for config in config_details:
                config_id, hardware, tipo_dado, unidade_dado, campo, limite_critico, limite_atencao = config
                limite_atencao = int(limite_atencao)
                limite_critico = int(limite_critico)

                value_to_add = None
                alert_found = False

                # Check if an alert was generated for this specific timestamp and PLC/config
                for alert in alerts_for_this_plc_day:
                    alert_time = datetime.strptime(alert["horario"], "%Y-%m-%d %H:%M:%S")
                    # Check if the CSV timestamp falls within the alert window for this specific alert
                    if (alert["config_id"] == config_id and
                        timestamp >= alert_time - timedelta(minutes=5) and # Example: +/- 5 minutes window
                        timestamp <= alert_time + timedelta(minutes=5)):
                        value_to_add = alert["valor"]
                        alert_found = True
                        break # Found an alert for this config at this time, no need to check others

                if not alert_found:
                    # Simulate a normal value if no alert was found for this specific timestamp and config
                    value_to_add = simular_valor(tipo_dado, limite_critico, limite_atencao)
                
                try:
                    col_index = colunas.index(campo)
                    simulated_values_for_row[col_index - 2] = value_to_add
                except ValueError:
                    print(f"Error: Column '{campo}' not found in CSV columns for dynamic assignment. This should not happen if `all_capture_columns` is built correctly.")
                    
            row_data.extend(simulated_values_for_row)
            registros.append(row_data)

    os.makedirs(f"csv_plcs/{data_base.strftime('%Y-%m')}", exist_ok=True)
    nome_arquivo = f"csv_plcs/{data_base.strftime('%Y-%m')}/{date_str}_plc_{plc_id}.csv"
    
    # with open(nome_arquivo, "w", newline="") as csvfile:
    #     writer = csv.writer(csvfile)
    #     writer.writerow(colunas)
    #     writer.writerows(registros)
    plcs_csvs_gerados.append(f"{date_str}_{plc_id}") # Mark this PLC's CSV as generated for this day
    print(f"CSV diário gerado para PLC {plc_id}: {nome_arquivo}")
    
    print(f"Enviando para AWS...")
    # aws.enviar_arquivo_csvs(nome_arquivo)

def gerar_datetimes_atrasados(qtd=100, atraso_min_horas=8):
    agora = datetime.now()
    datetimes = []
    for _ in range(qtd):
        atraso_horas = random.uniform(atraso_min_horas, 168)
        dt = agora - timedelta(hours=atraso_horas)
        datetimes.append(dt)
    return datetimes

def conexao_select():
    conexao_db = db.connect(
        host='127.0.0.1',
        port=3306,
        user='laysa',
        password='Urubu@100',
        database='plcvision'
    )
    return conexao_db

def simular_valor(tipo_dado, limite_critico, limite_atencao):
    if tipo_dado == "Temperatura":
        return round(random.uniform(30, limite_atencao - 1), 2)  # ensure below attention
    elif tipo_dado == "Uso":
        return round(random.uniform(10, limite_atencao - 1), 2)
    elif tipo_dado == "Atividade":
        return random.randint(0, limite_atencao - 1)
    elif tipo_dado == "Ociosidade":
        return random.randint(0, limite_atencao - 1)
    elif tipo_dado == "Memoria Livre":
        return random.randint(0, limite_atencao - 1)
    elif tipo_dado == "Quantidade":
        return random.randint(20, limite_atencao - 1)
    elif tipo_dado == "Frequência":
        return round(random.uniform(0, limite_atencao - 1), 2)
    elif tipo_dado == "Uso em Bytes":
        return random.randint(0, limite_atencao - 1)
    elif tipo_dado == "Tempo Restante":
        return random.randint(10, 300)  # This one is harder to set a normal range without context
    elif tipo_dado in ["Pacote Recebido", "Pacote Mandado"]:
        return random.randint(0, limite_atencao - 1)
    else:
        return random.randint(1, 100)

def obter_plcs_com_config(id):
    con = conexao_select()
    cursor = con.cursor()
    cursor.execute(f"""
        SELECT plc.id, p.empresa_consumidor_id, fc.id as fabricaId
        FROM plc
        JOIN parceria p ON plc.parceria_id = p.id
        JOIN setor_fabrica sf ON sf.id = plc.setor_fabrica_id
        JOIN fabrica_consumidor fc ON sf.fabrica_consumidor_id = fc.id
        WHERE fc.empresa_consumidor_id = {id}
        ORDER BY RAND();
    """)
    plcs = cursor.fetchall()

    resultado = []
    for plc_id, empresa_id, fabricaId in plcs:
        cursor.execute("""
            SELECT c.id, comp.hardware, comp.tipo_dado, comp.unidade_dado, comp.coluna_captura, c.limite_critico, c.limite_atencao
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

def enviar_monitoramento_e_coletar_alertas(plc, current_day_datetime, maxAlertsPerDay):
    global qtdAlertasGerados
    
    alerts_for_this_plc_day = [] # New list to store alerts specific to this PLC for CSV generation

    id_plc = plc["plc_id"]
    empresa_id = plc["empresa_id"]
    fabrica_id = plc["fabrica_id"]

    for config in plc["configuracoes"]:
        # Check if global alert limit for the company for the day is reached
        if qtdAlertasGerados >= maxAlertsPerDay:
            break 

        config_id, hardware, tipo_dado, unidade_dado, campo, limite_critico, limite_atencao = config

        limite_atencao = int(limite_atencao)
        limite_critico = int(limite_critico)
        
        # Decide whether to generate an alert for this config, considering the remaining alert budget
        # We'll make it less likely to generate an alert as we get closer to the max daily alerts
        # This is a heuristic, adjust as needed.
        if random.random() < (maxAlertsPerDay - qtdAlertasGerados) / (len(plc["configuracoes"]) * 5): # Multiplying by 5 to make it less frequent
            valor = random.randint(limite_atencao + 1, limite_critico + 1)
            horarioMysql = current_day_datetime.strftime("%Y-%m-%d %H:%M:%S")
            horarioISO = current_day_datetime.strftime("%Y-%m-%dT%H:%M:%S.000+0000")

            selectsInfos.inserirAlertaSimulado(horarioMysql, horarioISO, config_id, valor, f"{hardware} {tipo_dado}", 1, tipo_dado, unidade_dado, hardware, fabrica_id, id_plc)
            print(f"  --> Alerta gerado para PLC {id_plc}, Config {config_id}, Valor: {valor} em {horarioMysql}")
            
            # Add alert details to a list that will be used for CSV generation for this specific PLC
            alerts_for_this_plc_day.append({
                "horario": horarioMysql,
                "config_id": config_id,
                "valor": valor,
                "coluna_captura": campo,
                "limite_critico": limite_critico,
                "limite_atencao": limite_atencao,
                "plc_id": id_plc 
            })
            qtdAlertasGerados += 1
    
    return alerts_for_this_plc_day # Return alerts specific to this PLC for its CSV

def simular_monitoramento():
    global qtdAlertasGerados
    global horariosComAlertasEConfig_for_plc_csv

    end_date = datetime.now() + timedelta(days = 5)
    start_date = end_date - timedelta(days=6 * 30) # Approx 6 months
    # start_date = end_date - timedelta(days=37)

    current_date = start_date
    while current_date <= end_date:
        print(f"\n--- Gerando dados para {current_date.strftime('%Y-%m-%d')} ---")

        # Define daily alert range for all companies combined for this day
        daily_min_alerts_company = 10 
        daily_max_alerts_company = 15
        
        # Distribute alerts between companies.
        num_alerts_today_company1 = random.randint(daily_min_alerts_company // 2, daily_max_alerts_company // 2)
        num_alerts_today_company2 = random.randint(daily_min_alerts_company // 2, daily_max_alerts_company // 2)

        companies_to_simulate = [
            {"id": 1, "max_alerts": num_alerts_today_company1},
            {"id": 2, "max_alerts": num_alerts_today_company2}
        ]

        random.shuffle(companies_to_simulate)

        for company_info in companies_to_simulate:
            company_id = company_info["id"]
            max_alerts_for_this_company_today = company_info["max_alerts"]
            
            qtdAlertasGerados = 0  # Reset alert counter for each company for the current day

            plcs_for_company = obter_plcs_com_config(company_id)

            # Generate a consistent timestamp for alerts for this company for the current day
            current_day_datetime = current_date.replace(
                hour=random.randint(0,23),
                minute=random.randint(0,59),
                second=random.randint(0,59)
            )

            print(f"Processando empresa {company_id} para {current_date.strftime('%Y-%m-%d')}")
            
            # Iterate through PLCs to generate alerts and then their respective CSVs
            for plc in plcs_for_company:
                print(f"  Processando PLC {plc['plc_id']} para empresa {company_id}")
                
                # Step 1: Generate alerts for this PLC and collect them
                alerts_for_this_plc_day = enviar_monitoramento_e_coletar_alertas(
                    plc,
                    current_day_datetime,
                    max_alerts_for_this_company_today
                )

                # Step 2: Generate the daily CSV for THIS PLC using the collected alerts
                gerar_csv_plc_diario(
                    plc["plc_id"], 
                    plc["configuracoes"], 
                    current_date, 
                    alerts_for_this_plc_day # Pass only alerts relevant to this PLC
                )
                print() # Add a newline for better readability between PLCs

        current_date += timedelta(days=1)

if __name__ == "__main__":
    # Ensure `selectsInfos.py` exists and `inserirAlertaSimulado` is defined within it.
    # If it's a placeholder, uncomment the lines below for testing purposes
    # class MockSelectsInfos:
    #     def inserirAlertaSimulado(self, *args, **kwargs):
    #         print(f"Mocking alert insertion: {args}")
    # selectsInfos = MockSelectsInfos()

    # class MockAWS:
    #     def enviar_arquivo_csvs(self, *args):
    #         print(f"Mocking AWS upload: {args}")
    # aws = MockAWS()

    simular_monitoramento()