import requests
import json
import time
url = "http://localhost:3000/monitoramento/0"

def enviar(colunas, dados,campos, config_ids,id_plc):
    dicionario = tratamento(colunas, dados, campos, config_ids)
    dicionario = {
        "maquina": id_plc,
        "dados": dicionario
    }
    json_data = json.dumps(dicionario)
    headers = {'Content-Type': 'application/json'}
    data = json_data
    response = requests.get(url, headers=headers, data=data)


def tratamento(colunas, dados, campos, config_ids):
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
                    "config_id": config_ids[index]
                
            }
        dicts.append(dicionario)
    
    print(dicts)
    
    return dicts    