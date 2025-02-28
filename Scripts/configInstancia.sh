#!/bin/bash

# att a maquina 
echo "Atualizar Sistema"
sudo apt update && sudo apt upgrade

# instalar node 
echo "Instalando NodeJS"
sudo apt -qq install nodejs

# instalar pip do python
echo "Instalando Pip"
sudo apt -qq install python3-pip 

# baixar as bibliotecas
echo "Instalando bibliotecas python necessárias"
pip install psutil==7.0.0 --quiet
pip install mysql-connector-python==9.2.0 --quiet

# instalando mysql
echo "Instalando MYSQL Server"
sudo apt -qq install mysql-server
# TODO configurar e criar usuários necessários para rodar o banco

# configurar projeto node
echo "Configurando e inicializando web-data-viz"
npm i && npm start

# iniciar script python 
echo "Inicializando script de captura"
python3 ./Scripts/captura_dados.py

# a partir daq vou ter q testar na mão, por enquanto paro por aq