import requests
import json
from tabulate import tabulate


API_URL = "http://52.2.47.7:3000/plc/register"
empresa_id = None

parceria_id = None

setor_id = None

empresa_consumidora = None

fabrica_consumidor = None

user = None


def login():
    global parceria_id
    global empresa_id
    global user
    email = input(f"Digite seu email:\n")
    senha = input(f"Digite sua senha:\n")
    
    dicionario = {
        "email" : email,
        "senha" : senha
    }

    json_up = json.dumps(dicionario)
    
    headers = {'Content-Type': 'application/json'}
    url = API_URL + "/login"
    response = requests.post(url, headers=headers, data=json_up)
    response_json = response.json()

    if(response_json.get('status')):
        print("Senha incorreta")
        return False
    
    empresa_id = response_json.get("empresa_id")
    user = response_json
    
    
    return user, empresa_id


def validarParceria():
    global user
    global empresa_id
    global empresa_consumidora
    global parceria_id

    token = input(f"Digite o token da empresa parceira:\n")

    dicionario = {
        "token" : token
    }

    json_data = json.dumps(dicionario)

    headers = {'Content-Type': 'application/json'}
    print(user, "AQUI ESTA O USER")
    usuario_id = user.get("id")
    
    url = API_URL + f"/empresas/{usuario_id}"

    response = requests.get(url, headers=headers, data=json_data)

    response_json = response.json()

    if(response_json.get("error")):
        print(response_json.get("error"))
        return False
    
    empresa_consumidora = response_json.get("empresa")
    parceria_id = empresa_consumidora.get('parceriaId')
    return True

def listarSetores():
    
    global fabrica_consumidor
    global setor_id
    tabela = []

    fabrica_id = fabrica_consumidor.get("fabrica_id")
    print(fabrica_consumidor, "AQUI ESTA O ID")
    url = API_URL + f"/setores/{fabrica_id}"

    headers = {'Content-Type': 'application/json'}

    response = requests.get(url, headers=headers)
    response_json = response.json()
    
    if(response_json.get("error")):
        print(response_json.get("error"))
        return False 
        #Aqui tem que matar o cadastro
    
    setores = response_json.get("setores")

    for setor in setores:
        linha = []
        linha.append(setor.get("id"))
        linha.append(setor.get("nome"))
        
        tabela.append(linha)

    
    cabecalhos = [
            'ID',
            'Nome',
            
            
    ]

    print(tabulate(tabela, headers=cabecalhos, tablefmt="grid"))

    decisaoValida = False

    while not decisaoValida:
        setor_id_selecionado = int(input(f"Escolha uma fábrica para alocar o PLC:\n"))

        for setor in setores:
            if setor_id_selecionado == setor.get("id"):
                decisaoValida = True
                setor_id = setor.get("id")
    return True                


def listarFabricas():
    global empresa_consumidora
    global fabrica_consumidor
    tabela = []

    empresa_id = empresa_consumidora.get("id")

    url = API_URL + f"/fabricas/{empresa_id}"

    headers = {'Content-Type': 'application/json'}

    response = requests.get(url, headers=headers)
    response_json = response.json()
    
    if(response_json.get("error")):
        print(response_json.get("error"))
        return False 
        #Aqui tem que matar o cadastro
    
    fabricas = response_json.get("fabricas")

    for fabrica in fabricas:
        linha = []
        linha.append(fabrica.get("fabrica_id"))
        linha.append(fabrica.get("nome"))
        linha.append(fabrica.get("estado"))
        linha.append(fabrica.get("cidade"))
        linha.append(fabrica.get("bairro"))
        linha.append(fabrica.get("logradouro"))
        linha.append(fabrica.get("numLogradouro"))
        tabela.append(linha)

    print(tabela, " assdasdasdasd")
    cabecalhos = [
            'ID',
            'Nome',
            'Estado',
            'Cidade',
            'Bairro',
            'Logradouro',
            'Número do Logradouro'
            
    ]

    print(tabulate(tabela, headers=cabecalhos, tablefmt="grid"))

    decisaoValida = False

    while not decisaoValida:
        fabrica_id_selecionado = int(input(f"Escolha uma fábrica para alocar o PLC:\n"))

        for fabrica in fabricas:
            if fabrica_id_selecionado == fabrica.get("fabrica_id"):
                decisaoValida = True
                fabrica_consumidor = fabrica
    return True                




def cadastrarPlc():
    global parceria_id
    global setor_id

    login_valido = False
    while not login_valido:
        login_valido = login()
    
    parceria_valida = False 
    while not parceria_valida:
        parceria_valida = validarParceria()
    
    
    if not listarFabricas():
        return False
    if not listarSetores():
        return False
    
    return {
        "setor_id" : setor_id,
        "parceria_id" : parceria_id
    }

    