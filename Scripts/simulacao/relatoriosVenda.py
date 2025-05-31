# Crawler notas fiscais de painel de vendas
import csv
import random
from datetime import datetime, timedelta
from faker import Faker
import os

# Json base
EMP = [
    "LENOVO TECNOLOGIA BRASIL LTDA",
    "VOLKSWAGEN BRASIL LTDA"
]
ENDERECO_EMP = [
    "Avenida Paulista, 1000 - São Paulo (SP)",
    "Rua XV de Novembro, 500 - Curitiba (PR)"
]

MODELOS_PLC = [
    "LOGO!", 
    "S7-200 SMART", 
    "S7-1200", 
    "ET 200SP", 
    "S7-1500",
    "S7-1200 F", 
    "S7-1500 PN", 
    "S7-1500 T", 
    "S7-1500 R/H", 
    "S7-400H"
]

PRECO_PLC = [
    1150.00, 
    1400.00, 
    3950.00, 
    5800.00, 
    8200.00, 
    6300.00,
    8200.00, 
    17500.00, 
    45000.00, 
    95000.00
]

MODELO_VALOR_MAP = {MODELOS_PLC[i]: PRECO_PLC[i] for i in range(len(MODELOS_PLC))}

DT_INICIO = datetime(2025, 5, 1)
DT_FINAL = datetime(2025, 6, 3)
PERIODO = (DT_FINAL - DT_INICIO).days

fake = Faker('pt_BR')



# Gerar csv 
def gerar_csv(num_registros=0, nome_arq=""):
    
    lista_registros = []
    cabecalho = ["TIPO", "EMPRESA", "MODELO", "QTD.", "VALOR_UN", "VALOR_TOTAL", "ENDERECO", "DATA_HORA"]
    lista_registros.append(cabecalho)

    
    emp_i = []
    for i, nome_emp in enumerate(EMP):
        emp_i.append({
            "nome": nome_emp,
            "endereco": ENDERECO_EMP[i]
        })
    random.shuffle(emp_i) 
    
    emp_faker = set()

    for _ in range(num_registros):
        
        dt_aleatoria = random.randint(0, PERIODO)
        dt_rand = DT_INICIO + timedelta(days=dt_aleatoria)
        hora_rand = random.randint(8, 18)
        min_rand = random.randint(0, 59)
        sec_rand = random.randint(0, 59)
        data_hora_obj = dt_rand.replace(hour=hora_rand, minute=min_rand, second=sec_rand)
        data_hora_str = data_hora_obj.strftime("%Y-%m-%d %H:%M:%S")


        prct_cancel = 0.03 
        if random.random() < prct_cancel:
            tipo_nota = "Cancelamento"
        else:
            tipo_nota = "Pedido"

    
        emp_select = None
        endereco_select = None

        if emp_i:
            info_emp_i = emp_i.pop(0)
            emp_select = info_emp_i["nome"]
            endereco_select = info_emp_i["endereco"]
        else: 
            while True:
                nome_emp_faker = fake.company()
                if nome_emp_faker not in emp_faker:
                    emp_select = nome_emp_faker
                    emp_faker.add(emp_select) 
                    endereco_select = fake.address().replace("\n", ", ")
                    break
        
        
        modelo_i = random.choice(MODELOS_PLC)
        preco_i = MODELO_VALOR_MAP[modelo_i]
        qtd = random.randint(8, 70)
        preco_tot = qtd * preco_i

        lista_registros.append([
            tipo_nota,
            emp_select,
            modelo_i,
            str(qtd),
            f"{preco_i:.2f}",
            f"{preco_tot:.2f}",
            endereco_select,
            data_hora_str
        ])

    dir_saida = "relatorios_venda"
    os.makedirs(dir_saida, exist_ok=True)
    file_path = os.path.join(dir_saida, nome_arq)

    with open(file_path, "w", newline="", encoding="utf-8") as arquivo_csv:
        csv_writter = csv.writer(arquivo_csv, delimiter=";")
        csv_writter.writerows(lista_registros)

    print(f"Arquivo '{file_path}' gerado com sucesso!")
    return file_path


if __name__ == "__main__":
    
    nomeArq = "teste3.csv"
    csv_gerado = gerar_csv(num_registros=50, nome_arq=nomeArq)
        
    


    