# PARA QUE ESSE ARQUIVO FUNCIONE É NECESSARIO TER INSTALADO E CONFIGURADO O
# AWS CLI

# windows -> msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# AWS CONFIGURE
# AWS CONFIGURE SET aws_session_token {`token`}


import subprocess

def listar_buckets():
    resultado = subprocess.run("aws s3 ls", shell=True, capture_output=True, text=True)

    if resultado.returncode == 0:
        print("Buckets encontrados:")
        print(resultado.stdout)
    else:
        print("Erro ao listar buckets:")
        print(resultado.stderr)


def enviar_arquivo_bucket(arquivo, bucket):
    comando = f"aws s3 cp {arquivo} s3://{bucket}/"
    resultado = subprocess.run(comando, shell=True, capture_output=True, text=True)
    print(resultado.stdout)

listar_buckets()

caminho_arquivos = "Scripts/testebucket/"
arquivo = caminho_arquivos + "dados.csv"
bucket = "bucket-python-plcvision"

enviar_arquivo_bucket(arquivo, bucket)

