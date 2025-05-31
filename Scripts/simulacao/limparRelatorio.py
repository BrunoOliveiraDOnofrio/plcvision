import csv
import os

def limpar_csv():
    
    dir_og = "relatorios_venda"
    arq_og = "relatorioMaioJun.csv"
    path_og = os.path.join(dir_og, arq_og)
    dir_final = "relatorios_limpos"
    arq_limpo = arq_og.replace(".csv", "_limpo.csv")
    path_final = os.path.join(dir_final, arq_limpo)
    
    col_painel = ["TIPO", "EMPRESA", "MODELO", "QTD.", "DATA_HORA"]
    
    try:
        with open(path_og, mode='r', newline='', encoding='utf-8') as infile, \
             open(path_final, mode='w', newline='', encoding='utf-8') as outfile:

            csv_reader = csv.reader(infile, delimiter=';')
            csv_writer = csv.writer(outfile, delimiter=';')

            header_og = next(csv_reader)


            col_i = []
            new_header = []
            for nome_col in col_painel:
                try:
                    indice = header_og.index(nome_col)
                    col_i.append(indice)
                    new_header.append(nome_col)
                except ValueError:
                    print(f"Não encontrou '{nome_col}' ")
            
            if not new_header:
                print("Não encontrou as colunas")
                return

        
            csv_writer.writerow(new_header)

            for linha_og in csv_reader:
                
                nova_linha = [linha_og[i] for i in col_i]
                csv_writer.writerow(nova_linha)
            
            print(f"Limpou e jogou arquivo em: '{path_final}'")

    except Exception as e:
        print(f"Erro: {e}")

if __name__ == "__main__":
    
    limpar_csv() 
