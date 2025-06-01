import csv
import json 
import mysql.connector
from mysql.connector import Error
import os


DB_CONFIG = {
    'host': 'db',
    'user': 'plc_manager',
    'password': 'plc_password',
    'database': 'plcvision'
}

COLUNAS_CSV = ["tipo", "empresa", "modelo", "qtd", "dtHora"]

def transformar_csv():
    
    pasta_arq = "relatorios_limpos"
    nome_arq = "relatorioMaioJun_limpo.csv" 
    csv_path = os.path.join(pasta_arq, nome_arq)
    
    dados = []
    
    try:
        
        with open(csv_path, mode='r', newline='', encoding='utf-8') as csvfile:
            leitor_csv = csv.DictReader(csvfile, delimiter=';')
            
            for linha in leitor_csv:
                dados.append(dict(linha))
        
        return dados
   
    except Exception as e:
        print(f"Erro: {e}")
        return None
    
    

def inserir_dados(json):
 
    if not json:
        print("Nenhum dado para inserir.")
        return

    conn = None
    cursor = None
    count_linha = 0
    
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        if conn.is_connected():
            print("Conectou no mysql!")

            cursor = conn.cursor()
            
            sql_insert = f"""
                INSERT INTO painel_vendas (tipo, empresa, modelo, qtd, dtHora)
                VALUES (%s, %s, %s, %s, %s)
            """
            
            for json_i in json:
                
                try:
                    tipo = json_i.get("tipo")
                    empresa = json_i.get("empresa")
                    modelo = json_i.get("modelo")
                    qtd = json_i.get("qtd")
                    dtHora = json_i.get("dtHora")
                    
                    qtd_int = int(qtd)

                    header = (tipo, empresa, modelo, qtd_int, dtHora)
                    cursor.execute(sql_insert, header)
                    count_linha +=1
                    
                    
                except Exception as e:
                    print(f"Erro ao inserir na tabela {json_i}: {e}")


            conn.commit()
            print(f"Inseriu {count_linha}!")

    except Error as e:
        print(f"Erro: {e}")
        
    finally:
        
        if cursor:
            cursor.close()
            
        if conn and conn.is_connected():
            conn.close()
            print("Fechou conexão!")
            


if __name__ == "__main__":
    
    json = transformar_csv()
    
    inserir_dados(json)