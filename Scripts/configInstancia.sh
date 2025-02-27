#!/bin/bash

# att a maquina 
sudo apt update && sudo apt upgrade -y

# instalar pip do python
sudo apt install python3-pip

# baixar as bibliotecas
pip install psutil
pip install mysql-connector-python