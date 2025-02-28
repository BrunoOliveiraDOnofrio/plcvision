import mysql.connector as db # https://dev.mysql.com/doc/connector-python/en/connector-python-installation.html
import psutil # https://psutil.readthedocs.io/en/latest/
import time
import os

banco = None
id_plc = 5 # Colocar id_plc 
limites = { # dados sem pesquisa
    'temperatura_cpu': 90,
    'uso_cpu': 90,
    'ociosidade_cpu': 10, # temos que ver se vamos usar % ou minutos
    'atividade_ram': 80, # temos que ver se vamos usar % ou minutos
    'uso_ram': 80,
    'memoria_livre': 2,
    'quantidade_bateria':10,
    'tempo_bateria': 300,
    'alimentacao': False
}

def configuracao_db():
    # configurar var de ambientes e criar conexao com o banco de dados

    conexao_db = db.connect(
        host='10.18.32.61',
        port=3306,
        user='insert_user',
        password='Urubu100',
        database='PlcVision'
    )

    return conexao_db

def limpar_tela():
    # limpar o console
    print('\033[H\033[J')

def armazenar_dados(dados):
    # organiza os dados em uma query para serem inseridos no banco de dados
    colunas = ''
    valores = ''

    for dado in dados:
        colunas += f"{dado['nome_coluna']},"
        valores += f"{dado['dado']},"
    
    executor = banco.cursor() 

    print(f'Inserindo dados: {valores[:-1]}.')
    query = f'INSERT INTO dados(fkPLC,{colunas[:-1]}) VALUES ({id_plc}, {valores[:-1]});'

    executor.execute(query)
    banco.commit()
    executor.close()

def coletar_dados(is_temperatura_cpu, is_uso_cpu, is_ociosidade_cpu, is_tempo_atividade_cpu, is_uso_ram, is_ram_livre, is_qtd_bateria, is_tempo_bateria, is_alimentacao):
    # recebe quais valores irão ser monitorados e faz um loop infinito (controlado) onde ele verifica se pode monitorar, coleta a informação, guarda em um array e no final manda armazenar os dados novamente
    while True:
        limpar_tela()
        print('Coletando Dados...')
        dados = []

        if is_temperatura_cpu and os.name != 'nt':
            temperaturas = psutil.sensors_temperatures().get("coretemp", [])
            temperatura = temperaturas[0].current if temperaturas else None
            dados.append({'nome_coluna': 'temperaturaCpu', 'dado': temperatura})

        if is_uso_cpu:
            uso = psutil.cpu_percent(interval=None, percpu=False)
            dados.append({'nome_coluna': 'usoCPU', 'dado': uso})

        if is_ociosidade_cpu:
            ociosidade = int(psutil.cpu_times().idle / (60 * 60 * 24))
            # percentual_ocioso = int((ociosidade / atividade) * 100)
            dados.append({'nome_coluna': 'ociosidadeCPU', 'dado': ociosidade})

        if is_tempo_atividade_cpu:
            atividade = int(psutil.boot_time() / (60 * 60 * 24))
            dados.append({'nome_coluna': 'atividadeCPU', 'dado': atividade})

        ram = psutil.virtual_memory()

        if is_uso_ram:
            uso = ram.percent
            dados.append({'nome_coluna': 'usoMemoriaRam', 'dado': uso})

        if is_ram_livre:
            livre = int(ram.free / (1024 ** 3))
            dados.append({'nome_coluna': 'memoriaLivre', 'dado': livre})

        bateria = psutil.sensors_battery()

        if is_qtd_bateria and bateria:
            qtd = int(bateria.percent)
            dados.append({'nome_coluna': 'qtdBateria', 'dado': qtd})

        if is_tempo_bateria and bateria:
            tempo = int(bateria.secsleft / 60)
            dados.append({'nome_coluna': 'tempoBateriaRestante', 'dado': tempo})

        if is_alimentacao and bateria:
            alimentacao = bateria.power_plugged
            dados.append({'nome_coluna': 'isAlimentacao', 'dado': 1 if alimentacao else 0})

        armazenar_dados(dados)
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

    coletar_dados(*selecao)

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
        coletar_dados(*[True] * 9) 
    elif opcao_selecionada == 2:
        # coletar com perguntas oq o usuario deseja monitorar
        coletar_infos_user()
    elif opcao_selecionada == 3:
        # sai da app
        sair()

if __name__ == '__main__':
    # quando o arquivo iniciar, configura o banco e inicia a aplicação
    banco = configuracao_db()
    main()