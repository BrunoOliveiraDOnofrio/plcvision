import requests
import json
import time
url = "http://localhost:3000/monitoramento/0"

def enviar(colunas, dados,campos, config_ids,id_plc, empresa_id, foraDoPadrao):
    dicionario = tratamento(colunas, dados, campos, config_ids, foraDoPadrao)
    dicionario = {
        "empresa": empresa_id,
        "maquina": id_plc,
        "dados": dicionario
    }
    dicionario2 = {
        "empresa": empresa_id,
        "maquina": 2,
        "dados": dicionario
    }
    json_data = json.dumps(dicionario)
    json_data2 = json.dumps(dicionario2)
    headers = {'Content-Type': 'application/json'}
    data = json_data
    response = requests.get(url, headers=headers, data=data)
    response = requests.get(url, headers=headers, data=json_data2)


def tratamento(colunas, dados, campos, config_ids, foraDoPadrao):
    dicts = []
    for index, coluna in enumerate(colunas):

        if index > len(campos) - 1:
            dicionario = {
                
                    "valor": dados[index],
                    "campo": "none"
                
            }
        else:
            dicionario = {

                    "valor": dados[index],
                    "campo": campos[index],
                    "config_id": config_ids[index],
                    "foraPadrao" : foraDoPadrao[index]
                
            }
        dicts.append(dicionario)
    
    print(dicts)
    
    return dicts    