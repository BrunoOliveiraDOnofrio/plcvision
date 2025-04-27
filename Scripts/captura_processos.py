import psutil
from collections import defaultdict

import mysql.connector as db # https://dev.mysql.com/doc/connector-python/en/connector-python-installation.html
import psutil # https://psutil.readthedocs.io/en/latest/
import time
from datetime import datetime, timedelta, timezone
import csv
import aws
import selectsInfos

id_plc = None # Colocar id_plc

fabrica_id = None

criacao_csv = True
insercao_mysql = True

def conexao_select():
    # configurar var de ambientes e criar conexao com o banco de dados

    conexao_db = db.connect(
        host='127.0.0.1',
        port=3306,
        user='root',
        password='Afmarolive1!',
        database='plcvision'
    )

    return conexao_db

def limpar_tela():
    # limpar o console
    print('\033[H\033[J')

def coletar_dados():
    global endereco_mac
    global id_plc
    global fabrica_id

    interfaces = psutil.net_if_addrs()

    if "Ethernet" in interfaces:
            for endereco in interfaces["Ethernet"]:
                if endereco.family == psutil.AF_LINK:
                    endereco_mac = endereco.address

    plcCadastrado = selectsInfos.verificarPlcCadastrado(endereco_mac)
    id_plc = plcCadastrado.get('id')
    fabrica_id = plcCadastrado.get('fabrica_consumidor_id')

    while(True):
        data = defaultdict(list)

        for processo in psutil.process_iter(['pid', 'name']):

            processos = psutil.Process(processo.info['pid'])
            
            fuso_brasil = timezone(timedelta(hours=-3))
            data_agora = datetime.now(fuso_brasil).strftime('%Y-%m-%d %H:%M:%S')
            data_agora = data_agora.replace(" ", "_")
            data_agora = data_agora.replace(":", "-")
            cpu = processos.cpu_percent(interval=0.01)
            print(processos.cpu_percent(interval=0.01))
            memoria = processos.memory_percent()
            rede = processo.net_connections(kind='inet')
            status_list = [conn.status for conn in rede]
            data['nomes'].append(processo.name())
            data['cpu'].append(cpu)
            data['memoria'].append(memoria)
            data['status'].append(status_list)
            data['dataHora'].append(data_agora)

        agrupamento = {}

        for i, nome in enumerate(data['nomes']):
            if nome not in agrupamento:
                agrupamento[nome] = {
                    'indices': [],
                    'nome':[],
                    'cpu': [],
                    'memoria': [],
                    'status': [],
                    'dataHora': []
                }

            agrupamento[nome]['indices'].append(i)
            agrupamento[nome]['nome'].append(data['nomes'][i])
            agrupamento[nome]['cpu'].append(data['cpu'][i])
            agrupamento[nome]['memoria'].append(data['memoria'][i])
            agrupamento[nome]['dataHora'].append(data['dataHora'][i])
            if not agrupamento[nome]['status']:
                agrupamento[nome]['status'].append(data['status'][i][0] if data['status'][i] else 'NONE')

        processos = {}

        for nome, valores in agrupamento.items():
            cpu = round(sum(valores['cpu']), 2)
            memoria = round(sum(valores['memoria']), 2)
            processos[nome] = {
            'nome': valores['nome'][0] or "SEM_NOME",
            'cpu%': cpu,
            'ram%': memoria,
            'status': valores['status'][0],
            'dataHora': valores['dataHora'][0]
            }
            
        agrupamento = {}

        primeiro_item = list(processos.values())[0]
        headers = primeiro_item.keys()

        nome_csv = f"processo_{data_agora}_{id_plc}.csv"

        with open(nome_csv, 'w', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=headers)
            writer.writeheader()
            print("Gerando CSV...")
            time.sleep(1)
            writer.writerows(processos.values())
            time.sleep(1)
            print("Enviando Bucket...")
            aws.enviar_arquivo_processo(nome_csv)


def sair():
    limpar_tela()
    # sair do app
    exit()

def main():
    # printa o menu com o efeito de escrita
    # ASCII Text Art
    palavras = [
        """
    ╠════════════════════════════════════════════════════════════════════════════════╣
    ╠  ███╗░░░███╗░█████╗░███╗░░██╗██╗████████╗░█████╗░██████╗░██╗███╗░░██╗░██████╗░ ╣
    ╠  ████╗░████║██╔══██╗████╗░██║██║╚══██╔══╝██╔══██╗██╔══██╗██║████╗░██║██╔════╝░ ╣
    ╠  ██╔████╔██║██║░░██║██╔██╗██║██║░░░██║░░░██║░░██║██████╔╝██║██╔██╗██║██║░░██╗░ ╣
    ╠  ██║╚██╔╝██║██║░░██║██║╚████║██║░░░██║░░░██║░░██║██╔══██╗██║██║╚████║██║░░╚██╗ ╣
    ╠  ██║░╚═╝░██║╚█████╔╝██║░╚███║██║░░░██║░░░╚█████╔╝██║░░██║██║██║░╚███║╚██████╔╝ ╣
    ╠  ╚═╝░░░░░╚═╝░╚════╝░╚═╝░░╚══╝╚═╝░░░╚═╝░░░░╚════╝░╚═╝░░╚═╝╚═╝╚═╝░░╚══╝░╚═════╝░ ╣
    ╠                                                                                ╣
    ╠            ░██████╗██╗░░░██╗░██████╗████████╗███████╗███╗░░░███╗               ╣
    ╠            ██╔════╝╚██╗░██╔╝██╔════╝╚══██╔══╝██╔════╝████╗░████║               ╣
    ╠            ╚█████╗░░╚████╔╝░╚█████╗░░░░██║░░░█████╗░░██╔████╔██║               ╣
    ╠            ░╚═══██╗░░╚██╔╝░░░╚═══██╗░░░██║░░░██╔══╝░░██║╚██╔╝██║               ╣ 
    ╠            ██████╔╝░░░██║░░░██████╔╝░░░██║░░░███████╗██║░╚═╝░██║               ╣
    ╠            ╚═════╝░░░░╚═╝░░░╚═════╝░░░░╚═╝░░░╚══════╝╚═╝░░░░░╚═╝               ╣""",
    """
    ╠════════════════════════════════════════════════════════════════════════════════╣
    ║                     SISTEMA DE MONITORAMENTO DA PLCVISION                      ║
    ╠════════════════════════════════════════════════════════════════════════════════╣""",
    """ 
       [1] ▶ Iniciar Monitoramento\n
       [2] ▶ Sair"""
    ]
    
    for palavra in palavras:
        print(palavra)

    opcao_selecionada = 0

    # le qual opcao o usuario deseja
    while(opcao_selecionada < 1 or opcao_selecionada > 3):
        try:
            opcao_selecionada = int(input('   Escolha uma opção para prosseguir: '))

            if opcao_selecionada >=1 and opcao_selecionada <= 3:
                break

        except ValueError:
            opcao_selecionada = 0
            
        print('Opção inválida, tente novamente.')

    # realiza uma acao baseado em uma opcao
    if opcao_selecionada == 1:
        # monitora
        coletar_dados() 
    else:
        # sai da app
        sair()
    
if __name__ == '__main__':
    # quando o arquivo iniciar, configura o banco e inicia a aplicação
    
    select_user = conexao_select()
   
    # coletar_dados()
    # coletar_informacoes_componentes()
    main()