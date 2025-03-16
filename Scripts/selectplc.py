import mysql.connector as db
import time

# REFATORAR SCRIPT COM BASE NA NOVA MODELAGEM:
# - DICAS:
#   * Mudar tabelas e campos dos SELECT's
#   * Ficar atento com o valor vindo do banco de dados, todas as informações são FLOAT!!


def conectar_db():

    conexao_db = db.connect(
        host='localhost',
        user='select_user',
        port='3306',
        password='Urubu100#',
        database='PlcVision'
    )

    return conexao_db

def limpar_tela():
    # limpar o console
    print('\033[H\033[J')

def selecao_do_fk(coluna):
    limpar_tela()
    # Mapa de máquinas
    maquinas = {
        1: "Miguel",
        2: "Vitória",
        3: "Kaio",
        4: "Pedro",
        5: "Ranier",
        6: "Todas as Máquinas"
    }

    # Menu de seleção
    print('Selecione a máquina que deseja visualizar:')
    for key, value in maquinas.items():
        print(f'        [{key}] ▶ Máquina do {value}')
    print()

    # Validação da entrada
    while True:
        try:
            escolha = int(input('   Escolha uma opção para prosseguir: '))
            if escolha in maquinas:
                fkplc = escolha
                break
            print('Opção inválida! Escolha entre 1 e 5.')
        except ValueError:
            print('Entrada inválida! Digite um número.')

    cursor = banco.cursor()

    coluna_id = coluna[0]
    coluna_nome = coluna[1]
    
    if escolha == 6:
        try:

            # Execução da query
            cursor.execute(f"""
                SELECT 
                    (SELECT AVG(c.valor) 
                    FROM captura AS c
                    JOIN PLC ON fkPLC = idPLC
                    JOIN componente ON fkComponente = idComponente
                    WHERE fkComponente = {coluna_id}) AS atividade_da_cpu,
                    
                    (SELECT AVG(c.valor) 
                    FROM captura AS c
                    JOIN PLC ON fkPLC = idPLC
                    JOIN componente ON fkComponente = idComponente
                    WHERE fkComponente = {coluna_id}) AS ociosidade_da_cpu;
            """)
            
            # Exibição dos resultados
            for linha in cursor.fetchall():
                print("-"*76)
                print("|                                                                          |")
                print("|                                                                          |")
                print(f'|         Dados de {coluna_nome} da máquina {maquinas[fkplc]}:                     |')
                print(f'|                                    {linha[0]:.2f}                                 |')
                print("|                                                                          |")
                print("|                                                                          |")
                print("-"*76)
                
        finally:
            cursor.close()

    else: 
        try:
            # Execução da query
            cursor.execute(f"""
                	SELECT 
                        (SELECT AVG(c.valor) 
                        FROM captura AS c
                        JOIN PLC ON fkPLC = idPLC
                        JOIN componente ON fkComponente = idComponente
                        WHERE fkComponente = {coluna_id} AND fkPLC = {fkplc}) AS atividade_da_cpu,
                        
                        (SELECT AVG(c.valor) 
                        FROM captura AS c
                        JOIN PLC ON fkPLC = idPLC
                        JOIN componente ON fkComponente = idComponente
                        WHERE fkComponente = {coluna_id} AND fkPLC = {fkplc}) AS ociosidade_da_cpu;
            """)
            
            # Exibição dos resultados
            for linha in cursor.fetchall():
                print(f'            Dados de {coluna_id} da máquina {maquinas[fkplc]}:\n')
                print("-"*76)
                print("|                                                                          |")
                print("|                                                                          |")
                print(f'|                                                                          |')
                print(f'|                                    {linha[0]:.2f}                                 |')
                print("|                                                                          |")
                print("|                                                                          |")
                print("-"*76)
                
        finally:
            cursor.close()

    print('Aguarde 3 segundos para prosseguir.')
    time.sleep(3)
    main()
    

def tratar_ram():
    limpar_tela()
    # Mapa de máquinas
    maquinas = {
        1: "Miguel",
        2: "Vitória",
        3: "Kaio",
        4: "Pedro",
        5: "Ranier",
        6: "Todas as Máquinas"
    }

    # Menu de seleção
    print('Selecione a máquina que deseja visualizar:')
    for key, value in maquinas.items():
        print(f'        [{key}] ▶ Máquina do {value}')
    print()

    # Validação da entrada
    while True:
        try:
            escolha = int(input('   Escolha uma opção para prosseguir: '))
            if escolha in maquinas:
                fkplc = escolha
                break
            print('Opção inválida! Escolha entre 1 e 5.')
        except ValueError:
            print('Entrada inválida! Digite um número.')

    dados = {
        1: "GiB",
        2: "Porcentagem"
    }

    print('Selecione a maneira que deseja visualizar os dados:')
    for key, value, in dados.items():
        print(f'   [{key}] ▶ Tipo de dado {value}')
    print()

    while True:
        try:
            tipo_de_dados = int(input('  Escolha uma opção para prosseguir: '))
            if tipo_de_dados:
                break
            print('Opção inválida! Escolha entre 1 e 2.') 
        except ValueError:
            print('Entrada inválida! Digite um número.')

    # Conexão com o banco
    cursor = banco.cursor()

    if escolha == 6:
        try:
            cursor.execute(f"""
                SELECT 
                    (SELECT AVG(c.valor) 
                    FROM captura AS c
                    JOIN PLC ON fkPLC = idPLC
                    JOIN componente ON fkComponente = idComponente
                    WHERE fkComponente = 5) AS media_uso_ram,
                    
                    (SELECT AVG(c.valor) 
                    FROM captura AS c
                    JOIN PLC ON fkPLC = idPLC
                    JOIN componente ON fkComponente = idComponente
                    WHERE fkComponente = 6) AS media_ram_livre;
                """)
            
                
            print(f'\n Dados das usoMemoriaRam, memoriaLivre da máquina {maquinas[fkplc]}')
            for linha in cursor.fetchall():
                
                ramPercent = linha[0] 
                ramLivre = linha[1]

                ramTotal = (ramLivre * 100) / ramPercent
                porcentagemLivre =  100 - ramPercent 

                if tipo_de_dados == 1:
                    print("-"*76)
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print(f'|          Sua quantidade de RAM livre (em GiB): {ramLivre:.0f}                         |')
                    print(f'|          Seu total de RAM em GiB: {ramTotal:.0f}                                      |')
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print("-"*76)

                elif tipo_de_dados == 2:
                    print("-"*76)
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print(f'|         Porcentagem de uso da memória RAM: {ramPercent}%                        |')
                    print(f'|         Porcentagem da memória RAM livre: {porcentagemLivre}%                         |')
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print("-"*76)

        finally:
            cursor.close()
        
    else:
        try:
            cursor.execute(f"""
                SELECT 
                    (SELECT AVG(c.valor) 
                    FROM captura AS c
                    JOIN PLC ON fkPLC = idPLC
                    JOIN componente ON fkComponente = idComponente
                    WHERE fkComponente = 5 AND fkPLC = {fkplc}) AS media_uso_ram,
                    
                    (SELECT AVG(c.valor) 
                    FROM captura AS c
                    JOIN PLC ON fkPLC = idPLC
                    JOIN componente ON fkComponente = idComponente
                    WHERE fkComponente = 6 AND fkPLC = {fkplc}) AS media_ram_livre;
                """)
            
                
            print(f'\n Dados das usoMemoriaRam, memoriaLivre da máquina {maquinas[fkplc]}')
            for linha in cursor.fetchall():
                ramPercent = linha[0] 
                ramLivre = linha[1]  

                ramTotal = (ramLivre * 100) / ramPercent
                porcentagemLivre =  100 - ramPercent 

                if tipo_de_dados == 1:
                    print("-"*76)
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print(f'|        Sua quantidade de RAM livre (em GiB): {ramLivre:.0f}                           |')
                    print(f'|        Seu total de RAM em GiB: {ramTotal:.0f}                                        |')
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print("-"*76) 
                elif tipo_de_dados == 2:
                    print("-"*76)
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print(f'|        Porcentagem de uso da memória RAM: {ramPercent}%                          |')
                    print(f'|        Porcentagem da memória RAM livre: {porcentagemLivre}%                           |')
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print("-"*76)

        finally:
            cursor.close()

    print('Aguarde 3 segundos para prosseguir.')
    time.sleep(3)
    main()

def tratar_cpu():
    limpar_tela()
    # Mapa de máquinas
    maquinas = {
        1: "Miguel",
        2: "Vitória",
        3: "Kaio",
        4: "Pedro",
        5: "Ranier",
        6: "Todas as Máquinas"
    }

    # Menu de seleção
    print('Selecione a máquina que deseja visualizar:')
    for key, value in maquinas.items():
        print(f'        [{key}] ▶ Máquina do {value}')
    print()

    # Validação da entrada
    while True:
        try:
            escolha = int(input('   Escolha uma opção para prosseguir: '))
            if escolha in maquinas:
                fkplc = escolha
                break
            print('Opção inválida! Escolha entre 1 e 5.')
        except ValueError:
            print('Entrada inválida! Digite um número.')

    dados = {
        1: "Minutos",
        2: "Porcentagem"
    }

    print('Selecione a maneira que deseja visualizar os dados:')
    for key, value, in dados.items():
        print(f'   [{key}] ▶ Tipo de dado {value}')
    print()

    while True:
        try:
            tipo_de_dados = int(input('  Escolha uma opção para prosseguir: '))
            if tipo_de_dados:
                break
            print('Opção inválida! Escolha entre 1 e 2.') 
        except ValueError:
            print('Entrada inválida! Digite um número.')

    # Conexão com o banco
    cursor = banco.cursor()

    if escolha == 6:
        try:
            cursor.execute(f"""
                SELECT 
                    (SELECT AVG(c.valor) 
                    FROM captura AS c
                    JOIN PLC ON fkPLC = idPLC
                    JOIN componente ON fkComponente = idComponente
                    WHERE fkComponente = 3) AS atividade_da_cpu,
                    
                    (SELECT AVG(c.valor) 
                    FROM captura AS c
                    JOIN PLC ON fkPLC = idPLC
                    JOIN componente ON fkComponente = idComponente
                    WHERE fkComponente = 4) AS ociosidade_da_cpu;
                """)
            
                
            print(f'\n Dados das ociosidadeCpu, atividadeCpu da máquina {maquinas[fkplc]}')
            for linha in cursor.fetchall():
                ociosidadeMinute = linha[0] 
                atividadeMinute = linha[1]  

                porcentagem_ociosa = (ociosidadeMinute / atividadeMinute) * 100
                porcentagemL_atividade =  100 - porcentagem_ociosa 

                if tipo_de_dados == 1:
                    print("-"*76)
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print(f'|       Tempo de Ociosidade em (em minutos): {ociosidadeMinute:.0f}                            |')
                    print(f'|       Tempo de atividade em minutos: {atividadeMinute:.0f}                                  |')
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print("-"*76) 
                elif tipo_de_dados == 2:
                    print("-"*76)
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print(f'|      Porcentagem da ociosidade da CPU: {porcentagem_ociosa:.2f}%                            |')
                    print(f'|      Porcentagem do tempo de atividade da CPU: {porcentagemL_atividade:.2f}%                    |')
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print("-"*76)

        finally:
            cursor.close()
    
    else:
        try:
            cursor.execute(f"""
                SELECT 
                    (SELECT AVG(c.valor) 
                    FROM captura AS c
                    JOIN PLC ON fkPLC = idPLC
                    JOIN componente ON fkComponente = idComponente
                    WHERE fkComponente = 3 AND fkPLC = {fkplc}) AS atividade_da_cpu,
                    
                    (SELECT AVG(c.valor) 
                    FROM captura AS c
                    JOIN PLC ON fkPLC = idPLC
                    JOIN componente ON fkComponente = idComponente
                    WHERE fkComponente = 4 AND fkPLC = {fkplc}) AS ociosidade_da_cpu;
                """)
            
                
            print(f'\n Dados das ociosidadeCpu, atividadeCpu da máquina {maquinas[fkplc]}')
            for linha in cursor.fetchall():
                ociosidadeMinute = linha[0] 
                atividadeMinute = linha[1]  

                porcentagem_ociosa = (ociosidadeMinute / atividadeMinute) * 100
                porcentagemL_atividade =  100 - porcentagem_ociosa 

                if tipo_de_dados == 1:
                    print("-"*76)
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print(f'|         Tempo de Ociosidade em (em minutos): {ociosidadeMinute:.0f}                          |')
                    print(f'|         Tempo de atividade em minutos: {atividadeMinute:.0f}                                |')
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print("-"*76) 
                elif tipo_de_dados == 2:
                    print("-"*76)
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print(f'|     Porcentagem da ociosidade da CPU: {porcentagem_ociosa:.2f}%                             |')
                    print(f'|     Porcentagem do tempo de atividade da CPU: {porcentagemL_atividade:.2f}%                     |')
                    print("|                                                                          |")
                    print("|                                                                          |")
                    print("-"*76)

        finally:
            cursor.close()

    time.sleep(3)
    print('Aguarde 3 segundos para prosseguir.')
    main()

def visualizar_dados_cpu():
    limpar_tela()
    # Mapeamento de colunas
    metricas = {
        1: (1, 'Temperatura', 'Temperatura da CPU'),
        2: (2, 'Uso', 'Uso da CPU'),
        3: ('Ociosidade', 'Ociosidade da CPU'),
        4: ('Atividade', 'Tempo de Atividade da CPU')
    }

    # Menu de seleção
    print('Selecione o tipo de dados que deseja visualizar: ')
    for key, value in metricas.items():
        print(f'        [{key}] ▶ {value[1]}')
    print()

    # Validação da entrada
    while True:
        try:
            escolha = int(input('   Escolha uma opção para prosseguir: '))
            if escolha in metricas:
                coluna = metricas[escolha]
                break
            print('Opção inválida! Escolha entre 1 e 4.')
        except ValueError:
            print('Entrada inválida! Digite um número.')

    if escolha == 3 or escolha == 4:
        return tratar_cpu()

    selecao_do_fk(coluna)

def visualizar_dados_ram():
    limpar_tela()

    metricas = {
        1: ('Uso', 'Uso da memória Ram'),
        2: ('Memória Livre', 'Memória livre')
    }

    print("Selecione o tipo de dados que deseja visualizar")
    for key, value in metricas.items():
        print(f'  [{key}] ▶ {value[1]}')
    print()

    while True:
        try:
            escolha = int(input('    Escolha uma opção para prosseguir: '))
            if escolha in metricas:
                coluna = metricas[escolha][0]
                break
            print('Opção inválida! Escolha entre 1 e 2')
        except ValueError:
            print('Entrada inválida! Digite um número')

    tratar_ram()
    

def visualizar_dados_bateria():
    limpar_tela()

    metricas = {
        1: (8, 'Status', 'Se está conectado na fonte de alimentação'),
        2: (7, 'Quantidade', 'Porcentagem de bateria'),
        3: (10, 'Tempo Restante', 'Tempo restante de bateria')
    }

    print("Selecione o tipo de dados que deseja visualizar")
    for key, value in metricas.items():
        print(f'  [{key} ▶ {value[1]}')
    print()

    while True:
        try:
            escolha = int(input('   Escolha uma opção para prosseguir: '))
            if escolha in metricas:
                coluna = metricas[escolha]
                break
            print('Opção inválida! Escolha entre 1 e 2')
        except ValueError:
            print('Entrada inválida! Digite um número')

    selecao_do_fk(coluna)
    

def sair():
    limpar_tela()
    # sair do app
    exit()

def main():
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
       [1] ▶ Visualizar os dados da Cpu\n
       [2] ▶ Visualizar os dados da Ram\n
       [3] ▶ Visualizar os dados Bateria\n
       [4] ▶ Sair"""
    ]

    for palavra in palavras:
        print(palavra)

    opcao_selecionada = 0

    # le qual opcao o usuario deseja
    while(opcao_selecionada < 1 or opcao_selecionada > 4):
        try:
            opcao_selecionada = int(input('   Escolha uma opção para prosseguir: '))

            if opcao_selecionada >=1 and opcao_selecionada <= 4:
                break

        except ValueError:
            opcao_selecionada = 0
            
        print('Opção inválida, tente novamente.')

    # realiza uma acao baseado em uma opcao
    if opcao_selecionada == 1:
        visualizar_dados_cpu()
    elif opcao_selecionada == 2:
        visualizar_dados_ram()
    elif opcao_selecionada == 3:
        visualizar_dados_bateria()
    elif opcao_selecionada == 4:
        sair()

if __name__ == '__main__':
    # quando o arquivo iniciar, configura o banco e inicia a aplicação
    banco = conectar_db()
    main()