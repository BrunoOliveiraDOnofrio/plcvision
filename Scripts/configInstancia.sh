#!/bin/bash

# att a maquina 
sudo apt update && sudo apt upgrade -y

# instalar pip do python
sudo apt install python3-pip

# baixar as bibliotecas
pip install psutil==7.0.0
pip install mysql-connector-python==9.2.0

# instalando mysql
sudo apt install mysql-server
# a partir daq vou ter q testar na mão, por enquanto paro por aq