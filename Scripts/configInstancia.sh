#!/bin/bash

# Comados ao abrir instancia:
# ssh -i token.pem ubuntu@dns/ip - conectar cm a instancia (local)
# mkdir producao/  -  criar pasta para guardar o zip q vamos enviar (nuvem)
# scp -i token.pem arquivo.zip ubuntu@dns/ip:producao/ - enviar o zip pra pasta (local)
# cd producao/ - entrar na pasta q criamos (nuvem)
# sudo apt-get install unzip - instalar lib para deszipar arquivo (nuvem)
# unzip arquivo.zip - deszipar o arquivo (nuvem)
# chmod 777 Scripts/configInstancia.sh - dar permissão ao script p rodar (nuvem)
# ./Scripts/configInstancia.sh - rodar o script e rezar muito pra funfar (nuvem)

# os q's são de quiet (silencio) para mostrar menos texto (por mais q monstre uma porrada ainda assim)
# e os y's são para não ficar fazendo perguntas no meio dos comandos

# Atualizar a máquina
echo "Atualizando Sistema..."
sudo apt update -qq -y
sudo apt upgrade -qq -y

# Instalar Node.js 
echo -e "\033[41;1;37m  Instalando NodeJS... \033[0m" # formatacao de texto vermelho pra deixar destacado
sudo apt install -qq -y nodejs npm

# Instalar pip do Python 
echo -e "\033[41;1;37m Instalando Python e Pip... \033[0m"
sudo apt install -qq -y python3-pip

# Instalar bibliotecas Python necessárias
echo -e "\033[41;1;37m Instalando bibliotecas Python... \033[0m"
pip install --quiet --no-input psutil==7.0.0 mysql-connector-python==9.2.0

# instalando mysql
echo -e "\033[41;1;37m Instalando MYSQL Server..."
sudo apt -qq -y install mysql-server
sudo systemctl start mysql.service
sudo systemctl enable mysql

# configurando MYSQL
echo -e "\033[41;1;37m Criando e estruturando BD PlcVision... \033[0m"
sudo mysql < src/database/modelagem.sql

echo -e "\033[41;1;37m Criando e dando permissões aos usuários... \033[0m"
CREATE USER 'plc_root'@'%' IDENTIFIED BY 'Urubu100';
GRANT ALL PRIVILEGES ON PlcVision.* TO 'plc_root'@'%';
FLUSH PRIVILEGES;

CREATE USER 'insert_user'@'%' IDENTIFIED BY 'Urubu100';
GRANT INSERT ON PlcVision.dados TO 'insert_user'@'%';
GRANT INSERT ON PlcVision.alertas TO 'insert_user'@'%';
FLUSH PRIVILEGES;

CREATE USER 'select_user'@'%' IDENTIFIED BY 'Urubu100#';
GRANT SELECT ON PlcVision.* TO 'select_user'@'%';
FLUSH PRIVILEGES;

# configurar e rodar projeto node
echo -e "\033[41;1;37m Configurando e inicializando web-data-viz... \033[0m"
npm i && npm start