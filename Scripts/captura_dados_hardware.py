import mysql.connector as db # https://dev.mysql.com/doc/connector-python/en/connector-python-installation.html
import psutil # https://psutil.readthedocs.io/en/latest/
import time
import os
from datetime import datetime, timedelta, timezone
import csv
import aws
import sendToWdv
import selectsInfos
import cadastrar


id_plc = None # Colocar id_plc

fabrica_id = None

criacao_csv = True
insercao_mysql = True

def conexao_select():
    # configurar var de ambientes e criar conexao com o banco de dados

    conexao_db = db.connect(
        host='127.0.0.1',
        port=3306,
        user='laysa',
        password='Urubu@100',
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

    global id_plc
    global fabrica_id
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
        
        comando = "ip link show | grep 'link/ether' | awk '{print $2}'"
        saida = os.popen(comando).read().strip()
        endereco_mac = saida.split("\n")[0]


    plcCadastrado = selectsInfos.verificarPlcCadastrado(endereco_mac)
    if not plcCadastrado:
        print(f"PLC não cadastrado, siga as instruções para cadastrar novo PLC:\n")
        setor_id = None
        parceria_id = None
        alocacao_valida = False
        while not alocacao_valida:
            resposta = cadastrar.cadastrarPlc()
            if resposta:
                setor_id = resposta.get("setor_id")
                parceria_id = resposta.get("parceria_id")
                alocacao_valida = True
        dados_plc = {
            "modelo" : '001',
            "ano" : dt,
            "sistema_operacional" : so_str,
            "capacidade_ram" : capacidade_ram,
            "endereco_mac" : endereco_mac,
            "hostname" : hostname,
            "setor_fabrica_id" : setor_id,
            "parceria_id" : parceria_id
        }
        cadastro_ok = False
        while not cadastro_ok:
            cadastro_ok = selectsInfos.cadastrarPlc(dados_plc)

        
        id_plc = cadastro_ok.get('id')
        fabrica_id = cadastro_ok.get('fabrica_consumidor_id')
        
        
    else:
        print("PLC já cadastrado")
        id_plc = plcCadastrado.get('id')
        fabrica_id = plcCadastrado.get('fabrica_consumidor_id')
        
        


    
    # recebe quais valores irão ser monitorados e faz um loop infinito (controlado) onde ele verifica se pode monitorar, coleta a informação, guarda em um array e no final manda armazenar os dados novamente
    
    while True:
        conteudo_csv = []
        contador = 0
        
        informacoes_componentes = coletar_informacoes_componentes()
        while contador <= 100:
            #limpar_tela()
            
            print('Coletando Dados...')
            fuso_brasil = timezone(timedelta(hours=-3))
            
            
            
            colunas_inserir = []
            colunas_wdv = []
            valores_inserir = []
            campos_wdv = []
            config_ids_wdv = []
            for info in informacoes_componentes:
                

                try:
                    valor = eval(info.get('funcao_python')) # Pegando a função utilizada para capturar os dados e a execultando através do eval() e verificando se é válido com o Try
                    print(info)
                    campo_wdv = info.get('hardware') + " " + info.get('tipo_dado') + " " + info.get('unidade_dado')
                    if valor >= info.get('limite_critico'):
                        selectsInfos.inserirAlerta(info.get("config_id"), valor, f"{info.get("hardware")} {info.get("tipo_dado")}", 1)
                    elif valor >= info.get('limite_atencao'):
                        selectsInfos.inserirAlerta(info.get("config_id"), valor, f"{info.get("hardware")} {info.get("tipo_dado")}", 0)
                    
                    
                    campos_wdv.append(campo_wdv)
                    valores_inserir.append(valor)
                    colunas_inserir.append(info.get('coluna_captura'))
                    colunas_wdv.append(info.get('coluna_captura'))
                    config_ids_wdv.append(info.get('config_id'))
                except Exception as e:
                    print(e)
                    valor = None
                    
                finally:
                    if valor is None:
                        valor = -1
                    
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
            
            conteudo_csv.append(valores_inserir)
            print("MONITORAMENTO")
            print("+=========================================")
            
            


            # cursor_insert.execute(str_query)
            # insert_user.commit()

            # cursor_insert.close()
            data_hora_brasil = data_hora_brasil.replace(" ", "_")
            data_hora_brasil = data_hora_brasil.replace(":", "-")
            contador = contador +1
            nome_csv = f"{data_hora_brasil}_{id_plc}"

            sendToWdv.enviar(colunas_wdv,valores_inserir,campos_wdv , config_ids_wdv,id_plc)
            if contador == 100:
                with     open(f"Scripts/csvs/{nome_csv}.csv", 'w', newline='') as arquivo_csv:
                    escritor = csv.writer(arquivo_csv)
                    for linha in conteudo_csv:
                        escritor.writerow(linha)
                print("Gerando CSV...")
                time.sleep(1)
                print("Enviando Bucket...")
                # aws.enviar_arquivo(nome_csv)
            time.sleep(1)


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

def coletar_informacoes_componentes():
    print("coletando parametros")
    global id_plc
    informacoes_componentes_monitorar = selectsInfos.buscarConfiguracoes(id_plc)

    
    
    
    if len(informacoes_componentes_monitorar) == 0: # verificar se ele está vazio
        fabrica_habilitada = True
        if(selectsInfos.verificarSeFabricaTemConfiguracoes):
            print('''Este PLC ainda não foi configurado, por favor, escolha um destes itens abaixo para prosseguir com a configuração:\n
            [1] ▶ Configurar monitoramento padrão da fábrica alocada\n
            [2] ▶ Configurar monitoramento padrão (CPU e RAM)\n
            [3] ▶ Sair e configurar monitoramento na web''')
        else:
            fabrica_habilitada = False
            print('''Este PLC ainda não foi configurado, por favor, escolha um destes itens abaixo para prosseguir com a configuração:\n
            [1] ▶ Configurar monitoramento padrão da fábrica alocada (DESABILITADO)\n
            [2] ▶ Configurar monitoramento padrão (CPU e RAM)\n
            [3] ▶ Sair e configurar monitoramento na web''')
        opcao_selecionada = 0

        # le qual opcao o usuario deseja
        while(True):
            try:
                opcao_selecionada = int(input('   Escolha uma opção para prosseguir: '))

                if opcao_selecionada in [2,3]:
                    break
                elif opcao_selecionada == 1 and  fabrica_habilitada:
                    break

            except ValueError:
                opcao_selecionada = 0
                
            print('Opção inválida, tente novamente.')

        if opcao_selecionada == 1:
            configuracaoValida = False 
            while not configuracaoValida:
                configuracaoValida = selectsInfos.cadastrarConfiguracoesFabrica(id_plc, fabrica_id)
            
            return coletar_informacoes_componentes()
            # coletar_informacoes_componentes()

        elif opcao_selecionada == 2:
            configuracaoValida = False 

            while not configuracaoValida:
                configuracaoValida = selectsInfos.cadastrarConfiguracoesPadrao(id_plc)   
            # # coletar com perguntas oq o usuario deseja monitorar
            # coletar_infos_user()
            # coletar_informacoes_componentes()
            return coletar_informacoes_componentes()
        elif opcao_selecionada == 3:
            # sai da app
            sair()
            return 
    return informacoes_componentes_monitorar
    # main(informacoes_componentes_monitorar) # Atribuindo a variavel informacoes_componentes e Utilizando o fetchall para coletar os dados do select
    
if __name__ == '__main__':
    # quando o arquivo iniciar, configura o banco e inicia a aplicação
    
    
   
    # coletar_dados()
    # coletar_informacoes_componentes()
    main()