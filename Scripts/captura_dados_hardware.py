import mysql.connector as db # https://dev.mysql.com/doc/connector-python/en/connector-python-installation.html
import psutil # https://psutil.readthedocs.io/en/latest/
import time
import os
from datetime import datetime, timedelta, timezone
import csv
import aws
import sendToWdv


id_plc = 3 # Colocar id_plc

criacao_csv = True
insercao_mysql = True

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

def conexao_insert():
    # configurar var de ambientes e criar conexao com o banco de dados

    conexao_db = db.connect(
        host='127.0.0.1',
        port=3306,
        user='root',
        password='linkinpark',
        database='plcvision'
    )

    return conexao_db

def limpar_tela():
    # limpar o console
    print('\033[H\033[J')

def coletar_dados():

 
    try:
        so = os.uname().sysname
        print(f"Sistema Operacional: {so}")
        so_str = str(so)
    except Exception:
        so_str = os.environ['OS']

    if("Windows" in so_str):
        hostname = os.popen('hostname').read().strip()

        capacidade_ram = round(psutil.virtual_memory().total / (1024 ** 2),2)

        comando = 'powershell.exe systeminfo | findstr "Data da instalação original"'
        saida = os.popen(comando).read().strip()
        dt = "2023"
        # dt = saida.split("/")[3].strip().split(",")[0].strip()


        comando = 'powershell.exe ipconfig /all | findstr "Endereço Físico"'
        saida = os.popen(comando).read().strip()
        endereco_mac = saida.split(":")[12].strip().split(" ")[0].strip()
    else:
        hostname = os.popen('hostname').read().strip()

        capacidade_ram = round(psutil.virtual_memory().total / (1024 ** 2),2)

        dt = ''

        saida = os.popen('hostnamectl').read().strip()
        for line in saida.splitlines():
            if "Firmware Date" in line:
              firmware_date = line.split(":", 1)[1].strip()
              date_parts = firmware_date.split(" ")
              dt = date_parts[1]
              dt = dt.split("-")[0]
        print(dt)
        comando = "ip link show | grep 'link/ether' | awk '{print $2}'"
        saida = os.popen(comando).read().strip()
        endereco_mac = saida.split("\n")[0]


# Pegando todos enderecos mac
    select_mac = conexao_select()
    cursor_mac = select_mac.cursor()
    cursor_mac.execute(f"""SELECT endereco_mac FROM plc;""")

    fetchall_mac = cursor_mac.fetchall()

    cursor_mac.close()
# Pegando todos enderecos mac

    print(fetchall_mac)
    nao_tem = True
    for mac in fetchall_mac:
        print(mac[0])
        if(endereco_mac in mac[0]):
            nao_tem = False
    
    if (nao_tem):
        insert_plc = conexao_insert()
        cursor_plc = insert_plc.cursor()
        str_query_plc = f'INSERT INTO plc (modelo, ano, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES (001, "{dt}", "{so_str}", "{capacidade_ram}", "{endereco_mac}", "{hostname}")'
        cursor_plc.execute(str_query_plc)
        insert_plc.commit()
        cursor_plc.close()
    else:
        print("PLC já cadastrado")




    
    # recebe quais valores irão ser monitorados e faz um loop infinito (controlado) onde ele verifica se pode monitorar, coleta a informação, guarda em um array e no final manda armazenar os dados novamente
    while True:
        conteudo_csv = []
        contador = 0
        
        while contador <= 10:
            #limpar_tela()
            
            print('Coletando Dados...')
            informacoes_componentes = coletar_informacoes_componentes()
            fuso_brasil = timezone(timedelta(hours=-3))
            
            # insert_user = conexao_insert()
            # cursor_insert = insert_user.cursor()
            str_query = f"INSERT INTO captura_{id_plc} ("
            colunas_inserir = []
            colunas_wdv = []
            valores_inserir = []
            for info in informacoes_componentes:
                print(info)

                try:
                    valor = eval(info[1]) # Pegando a função utilizada para capturar os dados e a execultando através do eval() e verificando se é válido com o Try
                    valores_inserir.append(valor)
                    colunas_inserir.append(info[6])
                    colunas_wdv.append(info[6])
                except Exception as e:
                    print(e)
                    valor = None
                    print("Vish", info[6])
                finally:
                    if valor is None:
                        valor = -1
                    print(valor)
            print("==========================================")

            if len(conteudo_csv) == 0:
                colunas_inserir.append('dataHora')
                colunas_inserir.append('maquinaId')
                conteudo_csv.append(colunas_inserir)
            fuso_brasil = timezone(timedelta(hours=-3))
            data_hora_brasil = datetime.now(fuso_brasil).strftime('%Y-%m-%d %H:%M:%S')
            valores_inserir.append(data_hora_brasil)
            valores_inserir.append(id_plc)
            colunas_wdv.append('dataHora')
            colunas_wdv.append('maquinaId')
            conteudo_csv.append(valores_inserir)
            print(conteudo_csv)
            print("+=========================================")
            
            


            # cursor_insert.execute(str_query)
            # insert_user.commit()

            # cursor_insert.close()
            data_hora_brasil = data_hora_brasil.replace(" ", "_")
            data_hora_brasil = data_hora_brasil.replace(":", "-")
            contador = contador +1
            nome_csv = f"{data_hora_brasil}_{id_plc}"

            sendToWdv.enviar(colunas_inserir,valores_inserir, id_plc)
            if contador == 10:
                # with     open(f"Scripts/csvs/{nome_csv}.csv", 'w', newline='') as arquivo_csv:
                #     escritor = csv.writer(arquivo_csv)
                #     for linha in conteudo_csv:
                #         escritor.writerow(linha)
                print("Gerando CSV...")
                time.sleep(5)
                print("Enviando Bucket...")
                # aws.enviar_arquivo(nome_csv)
            time.sleep(1)

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

    query_verificar_componentes = f"""SELECT co.id, co.funcao_python,co.tipo_dado, conf.limite_atencao, conf.limite_critico, co.hardware, co.coluna_captura from componente as co 
                   join config_plc as conf on conf.componente_id = co.id 
                   join plc as p on p.id = conf.plc_id 
                   where conf.plc_id = {id_plc}
                   """

    cursor_select.execute(query_verificar_componentes) # executando o SELECT
    informacoes_componentes_monitorar = cursor_select.fetchall() # Atribuindo a variavel informacoes_componentes e Utilizando o fetchall para coletar os dados do select
    cursor_select.close()
    print(informacoes_componentes_monitorar)
    
    
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
            # insert_user = conexao_insert()
            # cursor_insert = insert_user.cursor()

            # fuso_brasil = timezone(timedelta(hours=-3))
            # data_hora_brasil = datetime.now(fuso_brasil).strftime('%Y-%m-%d %H:%M:%S')

            # query = f'''INSERT INTO captura (fkPLC, fkComponente, valor, dataHora) VALUES
            #                 ({id_plc}, 1, 0, "{data_hora_brasil}"),
            #                 ({id_plc}, 2, 0, "{data_hora_brasil}"),
            #                 ({id_plc}, 3, 0, "{data_hora_brasil}"),
            #                 ({id_plc}, 4, 0, "{data_hora_brasil}"),
            #                 ({id_plc}, 5, 0, "{data_hora_brasil}");
            #             '''# Atribuindo o Insert na query

            # cursor_insert.execute(query)
            # insert_user.commit()
            # cursor_insert.close()

            # print("Sincronizando com Banco de Dados...")
            # time.sleep(2)
            
            # confirmacao = []
            # while(len(confirmacao) == 0):
            #     select_user = conexao_select()
            #     cursor_select = select_user.cursor()
            #     cursor_select.execute(query_verificar_componentes) 
            #     confirmacao = cursor_select.fetchall() 
            #     cursor_select.close()
            print("vai ter que programar a padrão")
            # coletar_informacoes_componentes()

        elif opcao_selecionada == 2:
            # # coletar com perguntas oq o usuario deseja monitorar
            # coletar_infos_user()
            # coletar_informacoes_componentes()
            print("vai ter que programar")
        elif opcao_selecionada == 3:
            # sai da app
            sair()
    return informacoes_componentes_monitorar
    # main(informacoes_componentes_monitorar) # Atribuindo a variavel informacoes_componentes e Utilizando o fetchall para coletar os dados do select
    
if __name__ == '__main__':
    # quando o arquivo iniciar, configura o banco e inicia a aplicação
    
    select_user = conexao_select()
    insert_user = conexao_insert()
   
    coletar_dados()
    coletar_informacoes_componentes()