import requests
import json
from datetime import timezone, timedelta, datetime
API_URL = "http://localhost:3000/plc/register"


def inserirAlerta(config_id, valor_capturado, tipo_valor, criticidade):

    print("INSERINDO ALERTA DE " + tipo_valor)
    fuso_brasil = timezone(timedelta(hours=-3))
    data_hora_brasil = datetime.now(fuso_brasil).strftime('%Y-%m-%d %H:%M:%S')
    dicionario = {
        "dataHora" : data_hora_brasil,
        "criticidade" : criticidade,
        "tipo_valor" : tipo_valor,
        "config_plc_id" : config_id,
        "valor_capturado":valor_capturado
    }

    json_data = json.dumps(dicionario)
    headers = {'Content-Type': 'application/json'}
    url = API_URL + "/alerta"
    response = requests.post(url, headers=headers, data=json_data)
    response_json = response.json()

    if(response_json.get('error')):
        print(response_json.get('error'))
        return
    
    print(response_json.get('message'))




def buscarConfiguracoes(id_plc):
    url = API_URL + f"/config/{id_plc}"
    response = requests.get(url)
    response_json = response.json()
    
    if(response_json.get('error')):
        print(response_json.get('error'))
        return False
    return response_json.get('configs')

def cadastrarConfiguracoesFabrica(id_plc, fabrica_id):
    url = API_URL + f"/config/fabrica/{id_plc}"
    dicionario = {
        "fabrica_id" : fabrica_id
    }

    dados_json = json.dumps(dicionario)
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, headers=headers, data=dados_json)
    response_json = response.json()
    if(response_json.get('error')):
        print(response_json.get('error'))
        return False
    print(response_json.get('message'))
    return True


def cadastrarPlc(dados):
    url = API_URL + "/plc"
    dados_json = json.dumps(dados)
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, headers=headers, data=dados_json)
    response_json = response.json()    
    if(response_json.get("error")):
        print(response_json.get("error"))
        return False
    return response_json.get("plc")

def verificarPlcCadastrado(mac):
    url = API_URL + f"/plc/{mac}"
    headers = {'Content-Type' : 'aplication/json'}
    response = requests.get(url, headers=headers)
    response_json = response.json()
    if(response_json.get('status')):
        return False
    return response_json.get('plc')

def cadastrarConfiguracoesPadrao(id_plc):
    url = API_URL + f"/config/{id_plc}"
    headers = {'Content-Type' : 'aplication/json'}
    response = requests.post(url, headers=headers)
    response_json = response.json()
    if(response_json.get('error')):
        print(response_json.get('error'))
        return False
    print(response_json.get('message'))
    return True


def verificarSeFabricaTemConfiguracoes(fabrica_id):
    url = API_URL + f"/config/fabrica/check/{fabrica_id}"
    headers = {'Content-Type' : 'aplication/json'}
    response = requests.get(url, headers=headers)
    response_json = response.json()

    if(response_json.get('status') == 1):
        return True
    return False