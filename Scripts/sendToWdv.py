import requests
import json
import time
url = "http://localhost:3000/monitoramento/0"

def enviar(colunas, dados, id_plc):
    dicionario = tratamento(colunas, dados)
    dicionario = {
        "maquina": id_plc,
        "dados": dicionario
    }
    json_data = json.dumps(dicionario)
    headers = {'Content-Type': 'application/json'}
    data = json_data
    response = requests.get(url, headers=headers, data=data)


def tratamento(colunas, dados):
    return dict(zip(colunas, dados))