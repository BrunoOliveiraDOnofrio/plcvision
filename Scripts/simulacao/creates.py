from faker import Faker
import random
from datetime import datetime

faker = Faker('pt_BR')

# IDs iniciais
fabricante_id = 1
componentes_ids = list(range(1, 13))
empresa_consumidor_id = 3
endereco_id = 5
parceria_id = 3
fabrica_id = 3
setor_id = 3
plc_id = 4

script = ""

for _ in range(4):  # 4 empresas consumidoras
    logradouro = faker.street_name()
    numero = faker.building_number()
    cidade = faker.city()
    estado = faker.estado_sigla()
    bairro = faker.bairro()
    complemento = f"Bloco {random.randint(1,3)}"
    script += f"INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES\n('{logradouro}', {numero}, '{cidade}', '{estado}', '{bairro}', '{complemento}');\n"

    razao_social = faker.last_name()
    segmento = faker.random_element(elements=('Têxtil', 'Alimentos', 'Farmacêutico'))
    cnpj = faker.cnpj()
    token = f"token_empresa_{empresa_consumidor_id}"
    script += f"INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES\n('{razao_social}', '{segmento}', '{cnpj}', {endereco_id}, 1, '{token}');\n\n"

    data = faker.date_time_between(start_date='-2y', end_date='now')
    script += f"INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES\n({empresa_consumidor_id}, {fabricante_id}, '{data.strftime('%Y-%m-%d %H:%M:%S')}', 10);\n\n"

    nome_fabrica = f"Fábrica {faker.city()}"
    script += f"INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES\n('{nome_fabrica}', {empresa_consumidor_id}, {endereco_id}, 2);\n"

    for i in range(2):
        nome_setor = f"Setor {faker.word().capitalize()}"
        script += f"INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES\n('{nome_setor}', {fabrica_id}, 5);\n"

        for _ in range(5):
            modelo = faker.random_element(elements=('Siemens s7-1500', 'Schneider M340', 'Siemens XRL8'))
            ano = random.randint(2018, 2024)
            so = faker.random_element(elements=('Linux', 'Windows CE', 'VxWorks'))
            ram = faker.random_element(elements=('2GB', '4GB', '8GB'))
            mac = faker.mac_address()
            hostname = f"plc-{faker.word()}-{plc_id:02d}"
            script += f"INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES\n('{modelo}', {ano}, {parceria_id}, {setor_id}, '{so}', '{ram}', '{mac}', '{hostname}');\n"

            for _ in range(random.randint(2, 4)):
                componente_id = random.choice(componentes_ids)
                limite_atencao = round(random.uniform(50, 8000), 2)
                limite_critico = round(limite_atencao + random.uniform(5, 500), 2)
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
