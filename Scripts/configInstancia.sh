#!/bin/bash

# att a maquina 
echo "Atualizar Sistema"
sudo apt -y update && sudo apt -y upgrade

# instalar node 
echo "Instalando NodeJS"
sudo apt -qq -y install nodejs

# instalar pip do python
echo "Instalando Pip"
sudo apt -qq -y install python3-pip

# baixar as bibliotecas
echo "Instalando bibliotecas python necessárias"
pip install psutil==7.0.0 --quiet
pip install mysql-connector-python==9.2.0 --quiet

# instalando mysql
echo "Instalando MYSQL Server"
sudo apt -qq -y install mysql-server

sudo systemctl start mysql.service

sudo mysql src/database/modelagem.sql

CREATE USER 'plc_root'@'%' IDENTIFIED BY 'Urubu100';
GRANT ALL PRIVILEGES ON PlcVision.* TO 'username'@'host';
FLUSH PRIVILEGES;

CREATE USER 'insert_user'@'%' IDENTIFIED BY 'Urubu100';
GRANT INSERT PRIVILEGE ON PlcVision.dados TO 'insert_user'@'%';
GRANT INSERT PRIVILEGE ON PlcVision.alertas TO 'insert_user'@'%';
FLUSH PRIVILEGES;

CREATE USER 'select_user'@'%' IDENTIFIED BY 'Urubu100#';
GRANT PRIVILEGE ON PlcVision.* TO 'select_user'@'%';
FLUSH PRIVILEGES;

# configurar projeto node
echo "Configurando e inicializando web-data-viz"
npm i && npm start

# iniciar script python 
echo "Inicializando script de captura"
python3 ./Scripts/captura_dados.py

# TODO a partir daq vou ter q testar na mão, por enquanto paro por aq