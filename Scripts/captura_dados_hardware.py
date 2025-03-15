import mysql.connector as db # https://dev.mysql.com/doc/connector-python/en/connector-python-installation.html
import psutil # https://psutil.readthedocs.io/en/latest/
import time
import os
from datetime import datetime, timedelta, timezone

id_plc = 19 # Colocar id_plc

def conexao_select():
    # configurar var de ambientes e criar conexao com o banco de dados

    conexao_db = db.connect(
        host='127.0.0.1',
        port=3306,
        user='insert_user',
        password='Urubu100#',
        database='PlcVision'
    )

    return conexao_db

def conexao_insert():
    # configurar var de ambientes e criar conexao com o banco de dados

    conexao_db = db.connect(
        host='127.0.0.1',
        port=3306,
        user='insert_user',
        password='Urubu100#',
        database='PlcVision'
    )

    return conexao_db

def limpar_tela():
    # limpar o console
    print('\033[H\033[J')

def coletar_dados(informacoes_componentes):
    # recebe quais valores irão ser monitorados e faz um loop infinito (controlado) onde ele verifica se pode monitorar, coleta a informação, guarda em um array e no final manda armazenar os dados novamente
    while True:
        limpar_tela()
        print('Coletando Dados...')

        fuso_brasil = timezone(timedelta(hours=-3))

        insert_user = conexao_insert()
        cursor_insert = insert_user.cursor()

        for info in informacoes_componentes:
        
            try:
                valor = eval(info[1]) # Pegando a função utilizada para capturar os dados e a execultando através do eval() e verificando se é válido com o Try
            except:  
                valor = None
            finally:
                if valor is None:
                    valor = -1

                data_hora_brasil = datetime.now(fuso_brasil).strftime('%Y-%m-%d %H:%M:%S')

                query = f"INSERT INTO captura (fkPLC, fkComponente, valor, dataHora) VALUES ({id_plc}, {info[0]}, {valor}, '{data_hora_brasil}')"# Atribuindo o Insert na querry

                cursor_insert.execute(query)
                insert_user.commit()
        cursor_insert.close()

        time.sleep(500)

def coletar_infos_user():
    limpar_tela()
    print('Responda as perguntas com 0 (Não) e 1 (Sim) de acordo com o que deseja coletar')

    select_user = conexao_select()
    cursor_select = select_user.cursor()
    cursor_select.execute(f"""SELECT co.idComponente, co.medicao, co.metrica, co.hardware from componente as co;""")

    metricas_componentes = cursor_select.fetchall()
    cursor_select.close()

    for metrica in metricas_componentes:
        while True:
            try:
                aparecer_metrica = f'em {metrica[2]}' if metrica[2] != '' else ''
                escolha = int(input(f'Gostaria de coletar informação sobre {metrica[1]} do(a) {metrica[3]} {aparecer_metrica}?: '))
                if escolha in [0,1]:
                    insert_user = conexao_insert()
                    cursor_insert = insert_user.cursor()

                    fuso_brasil = timezone(timedelta(hours=-3))
                    data_hora_brasil = datetime.now(fuso_brasil).strftime('%Y-%m-%d %H:%M:%S')

                    query = f'INSERT INTO captura (fkPLC, fkComponente, valor, dataHora) VALUES ({id_plc}, {metrica[0]}, 0, "{data_hora_brasil}");'# Atribuindo o Insert na query

                    cursor_insert.execute(query)
                    insert_user.commit()
                    cursor_insert.close()
                    break
            except ValueError:
                pass

def sair():
    limpar_tela()
    # sair do app
    exit()

def main(informacoes_componentes):
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
        coletar_dados(informacoes_componentes) 
    else:
        # sai da app
        sair()

def coletar_informacoes_componentes():
    select_user = conexao_select()
    cursor_select = select_user.cursor() # Criando um cursor para executar o SELECT 

    query_verificar_componentes = f"""SELECT co.idComponente, co.funcaoPython,co.medicao, co.limiteAtencao, co.limiteCritico from captura as ca 
                   join PLC as p on fkPLC = idPLC 
                   join componente as co on fkComponente = idComponente 
                   where idPLC = {id_plc} 
                   group by idComponente;"""

    cursor_select.execute(query_verificar_componentes) # executando o SELECT
    informacoes_componentes_monitorar = cursor_select.fetchall() # Atribuindo a variavel informacoes_componentes e Utilizando o fetchall para coletar os dados do select
    cursor_select.close()

    if len(informacoes_componentes_monitorar) == 0: # verificar se ele está vazio
        print('''Este PLC ainda não foi configurado, por favor, escolha um destes itens abaixo para prosseguir com a configuração:\n
        [1] ▶ Configurar monitoramento padrão (CPU, RAM, Bateria)\n
        [2] ▶ Configurar monitoramento personalizado\n
        [3] ▶ Sair''')

        opcao_selecionada = 0

        # le qual opcao o usuario deseja
        while(opcao_selecionada < 1 or opcao_selecionada > 3):
            try:
                opcao_selecionada = int(input('   Escolha uma opção para prosseguir: '))

                if opcao_selecionada in [1,2,3]:
                    break

            except ValueError:
                opcao_selecionada = 0
                
            print('Opção inválida, tente novamente.')

        if opcao_selecionada == 1:
            # settar monitoracao padrao de 5 elementos
            insert_user = conexao_insert()
            cursor_insert = insert_user.cursor()

            fuso_brasil = timezone(timedelta(hours=-3))
            data_hora_brasil = datetime.now(fuso_brasil).strftime('%Y-%m-%d %H:%M:%S')

            query = f'''INSERT INTO captura (fkPLC, fkComponente, valor, dataHora) VALUES
                            ({id_plc}, 1, 0, "{data_hora_brasil}"),
                            ({id_plc}, 2, 0, "{data_hora_brasil}"),
                            ({id_plc}, 3, 0, "{data_hora_brasil}"),
                            ({id_plc}, 4, 0, "{data_hora_brasil}"),
                            ({id_plc}, 5, 0, "{data_hora_brasil}");
                        '''# Atribuindo o Insert na query

            cursor_insert.execute(query)
            insert_user.commit()
            cursor_insert.close()

            print("Sincronizando com Banco de Dados...")
            time.sleep(2)
            
            confirmacao = []
            while(len(confirmacao) == 0):
                select_user = conexao_select()
                cursor_select = select_user.cursor()
                cursor_select.execute(query_verificar_componentes) 
                confirmacao = cursor_select.fetchall() 
                cursor_select.close()
            
            coletar_informacoes_componentes()

        elif opcao_selecionada == 2:
            # coletar com perguntas oq o usuario deseja monitorar
            coletar_infos_user()
            coletar_informacoes_componentes()
        elif opcao_selecionada == 3:
            # sai da app
            sair()
    main(informacoes_componentes_monitorar) # Atribuindo a variavel informacoes_componentes e Utilizando o fetchall para coletar os dados do select
    
if __name__ == '__main__':
    # quando o arquivo iniciar, configura o banco e inicia a aplicação
    select_user = conexao_select()
    insert_user = conexao_insert()
  
    coletar_informacoes_componentes()