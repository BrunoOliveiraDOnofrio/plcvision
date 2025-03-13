import mysql.connector as db # https://dev.mysql.com/doc/connector-python/en/connector-python-installation.html
import psutil # https://psutil.readthedocs.io/en/latest/
import time
import os

select_user = None
insert_user = None
id_plc = 1 # Colocar id_plc 

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
        user='select_user',
        password='Urubu100#',
        database='PlcVision'
    )

    return conexao_db

def limpar_tela():
    # limpar o console
    print('\033[H\033[J')

def armazenar_dados(dados): # funcão inativa por enquanto
    # organiza os dados em uma query para serem inseridos no banco de dados
    colunas = ''
    valores = ''

    for dado in dados:
        colunas += f"{dado['nome_coluna']},"
        valores += f"{dado['dado']},"
    
    executor = banco.cursor() 

    print(f'Inserindo dados: {valores[:-1]}.')
    query = f'INSERT INTO dado(fkPLC,{colunas[:-1]}) VALUES ({id_plc}, {valores[:-1]});'

    executor.execute(query)
    banco.commit()
    executor.close()

def coletar_dados():
    # recebe quais valores irão ser monitorados e faz um loop infinito (controlado) onde ele verifica se pode monitorar, coleta a informação, guarda em um array e no final manda armazenar os dados novamente
    while True:
        limpar_tela()
        print('Coletando Dados...')

        cursor_insert = insert_user.cursor()

        for info in informacoes_componentes:
        
            try:
                valor = eval(info[1]) # Pegando a função utilizada para capturar os dados e a execultando através do eval() e verificando se é válido com o Try
            except:  
                valor = None
            finally:
                if valor is None:
                    valor = -1
                query = f"INSERT INTO captura (fkPLC, fkComponente, valor) VALUES ({id_plc}, {info[0]}, {valor})"# Atribuindo o Insert na querry

                cursor_insert.execute(query)
                insert_user.commit()
        cursor_insert.close()
        

        time.sleep(5)

def coletar_infos_user():
    limpar_tela()
    print('Responda as perguntas com 0 (Não) e 1 (Sim) de acordo com o que deseja coletar')

    nomes_metrica = [
        'Temperatura CPU', 'Uso CPU', 'Ociosidade CPU', 'Tempo de atividade CPU',
        'Uso RAM', 'Memória RAM livre', 'Quantidade de bateria', 'Tempo restante de bateria', 'Se tem Alimentação'
    ]

    selecao = []
    for nome in nomes_metrica:
        while True:
            try:
                escolha = int(input(f'Gostaria de coletar informação sobre {nome}?: '))
                if escolha in [0, 1]:
                    selecao.append(bool(escolha))
                    break
            except ValueError:
                pass

    coletar_dados()

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
       [1] ▶ Continuar com o monitoramento padrão\n
       [2] ▶ Personalizar o monitoramento\n
       [3] ▶ Sair"""
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
        # padrao monitora tudo
        coletar_dados() 
    elif opcao_selecionada == 2:
        # coletar com perguntas oq o usuario deseja monitorar
        coletar_infos_user()
    elif opcao_selecionada == 3:
        # sai da app
        sair()

if __name__ == '__main__':
    # quando o arquivo iniciar, configura o banco e inicia a aplicação
    select_user = conexao_select()
    insert_user = conexao_insert()

    cursor_select = select_user.cursor() # Criando um cursor para executar o SELECT 

    cursor_select.execute(f"""SELECT co.idComponente, co.funcaoPython,co.medicao, co.limiteAtencao, co.limiteCritico from captura as ca 
                   join PLC as p on fkPLC = idPLC 
                   join componente as co on fkComponente = idComponente 
                   where idPLC = {id_plc} 
                   group by idComponente ;""") # executando o SELECT
    
    informacoes_componentes = cursor_select.fetchall() # Atribuindo a variavel informacoes_componentes e Utilizando o fetchall para coletar os dados do select

    main()