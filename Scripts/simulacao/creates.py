from faker import Faker
import random
from datetime import datetime

faker = Faker('pt_BR')

# IDs iniciais
fabricante_id = 1
componentes_ids = list(range(1, 13))
componentes_possiveis = [id for id in componentes_ids if id not in (3, 4) and id not in (2, 5, 11,12,13,14,15)]

empresa_consumidor_id = 1
endereco_id = 5
parceria_id = 1
fabrica_id = 1
setor_id = 1
plc_id = 1

razoes_socias = [
    'Volkswagen do Brasil Indústria de Veículos Ltda',
    'Lenovo Tecnologia Ltda',
]


limites_gerados = {
  1: (68.29, 72.84),        # CPU Temperatura (°C)
  2: (72.49, 74.41),        # CPU Uso (%)
  3: (313.3, 369.57),       # CPU Atividade (dias)
  4: (360.26, 449.44),      # CPU Ociosidade (dias)
  5: (72.42, 83.08),        # RAM Uso (%)
  6: (3006428475.37, 3463255523.6),    # RAM Memória Livre (Bytes)
  7: (33.55, 45.59),        # Bateria Quantidade (%)
  8: (1190.38, 1362.68),    # CPU Frequência (MHz)
  9: (2768805512.99, 3244864382.44),   # RAM Uso em Bytes
  10: (48.73, 53.45),       # Bateria Tempo Restante (minutos)
  11: (24605.64, 30687.03), # REDE Pacote Recebido
  12: (3589.77, 28083.92),  # REDE Pacote Mandado
  13: (900000, 1000000),  # REDE Pacote erros recebido
  14: (900000, 1000000),  # REDE Pacote erros enviado
  15: (500, 600) # Rede conexões abertas
}


script = ""

SETORES_INDUSTRIAIS = [
    "Logística",
    "Linha de Montagem",
    "Pintura Industrial",
    "Controle de Qualidade",
    "Estamparia",
    "Usinagem",
    "Embalagem",
    "Armazenamento",
    "Expedição",
    "Manutenção",
    "Injeção Plástica",
    "Solda Robotizada",
    "Tratamento Térmico",
    "Prensagem",
    "Fundição",
    "Galvanoplastia",
    "Corte e Dobra",
    "Ferramentaria",
    "Laboratório",
    "Refrigeração",
    "Caldeiraria"
]

for _ in range(2):  # 2 empresas consumidoras
    logradouro = faker.street_name()
    numero = faker.building_number()
    cidade = faker.city()
    estado = faker.estado_sigla()
    bairro = faker.bairro()
    complemento = f"Bloco {random.randint(1,3)}"
    script += f"INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES\n('{logradouro}', {numero}, '{cidade}', '{estado}', '{bairro}', '{complemento}');\n"

    razao_social = razoes_socias[_]
    segmento = faker.random_element(elements=('Têxtil', 'Alimentos', 'Farmacêutico'))
    cnpj = faker.cnpj()
    token = f"token_empresa_{empresa_consumidor_id}"
    script += f"INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES\n('{razao_social}', '{segmento}', '{cnpj}', {endereco_id}, 1, '{token}');\n\n"

    data = faker.date_time_between(start_date='-2y', end_date='now')
    script += f"INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES\n({empresa_consumidor_id}, {fabricante_id}, '{data.strftime('%Y-%m-%d %H:%M:%S')}', 10);\n\n"

    nome_fabrica = f"Fábrica {faker.city()}"
    script += f"INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES\n('{nome_fabrica}', {empresa_consumidor_id}, {endereco_id}, 2);\n"

    for i in range(2):
        nome_setor = random.choice(SETORES_INDUSTRIAIS)
        script += f"INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES\n('{nome_setor}', {fabrica_id}, 5);\n"

        for _ in range(10):
            modelo = faker.random_element(elements=(
                    'LOGO!',
                    'S7-200 SMART',
                    'S7-1200',
                    'ET 200SP',
                    'S7-1500',
                    'S7-1200 F',
                    'S7-1500 PN',
                    'S7-1500 T',
                    'S7-1500 R/H',
                    'S7-400H',
                  ))
            ano = random.randint(2018, 2024)
            so = faker.random_element(elements=('Linux', 'Windows CE', 'VxWorks'))
            ram = faker.random_element(elements=('2GB', '4GB', '8GB'))
            mac = faker.mac_address()
            hostname = f"plc-{faker.word()}-{plc_id:02d}"
            num_plc = random.randint(1, 15)
         
            script += f"INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES\n('{modelo}', {ano}, {parceria_id}, {setor_id}, '{so}', '{ram}', '{mac}', 'PLC_{nome_setor}_{num_plc}');\n"



            for componente_id in [2, 5,11,12,13,14,15]:
                limite_atencao, limite_critico = limites_gerados[componente_id]
                script += f"INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES\n({componente_id}, {plc_id}, {limite_atencao}, {limite_critico}, {fabrica_id});\n"
            outros_componentes = random.sample(componentes_possiveis, k=random.randint(0, 2))
            for componente_id in outros_componentes:
                limite_atencao, limite_critico = limites_gerados[componente_id]
                script += f"INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES\n({componente_id}, {plc_id}, {limite_atencao}, {limite_critico}, {fabrica_id});\n"
            plc_id += 1
        setor_id += 1
    endereco_id += 1
    empresa_consumidor_id += 1
    parceria_id += 1
    fabrica_id += 1

# Salvar em um arquivo se quiser
with open("inserts_simulados.sql", "w", encoding="utf-8") as file:
    file.write(script)

print("Script gerado com sucesso!")
