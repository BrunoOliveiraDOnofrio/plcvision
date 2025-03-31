CREATE DATABASE PlcVision;
USE PlcVision;
-- drop database PlcVision;
CREATE TABLE captura_3 (
    idCaptura INT AUTO_INCREMENT PRIMARY KEY,
    cpu_percent FLOAT,
    cpu_freq FLOAT,
    ram_percent FLOAT,
    ram_uso BIGINT,
    disco_percent FLOAT,
    disco_uso BIGINT,
    cpu_ociosidade_dias INT,
    ram_livre BIGINT,
    dataHora DATETIME
);

-- SELECT co.id, co.funcao_python,co.tipo_dado, conf.limite_atencao, conf.limite_critico, co.hardware, co.coluna_captura from componente as co 
--                   join config_plc as conf on conf.componente_id = co.id 
--                   join plc as p on p.id = conf.plc_id 
--                   where conf.plc_id = 3;
                   
CREATE TABLE captura_n (
    idCaptura INT AUTO_INCREMENT PRIMARY KEY,
    cpu_percent FLOAT,
    ram_byte FLOAT,
    cpu_freq FLOAT,
    ram_percent FLOAT,
    ram_uso INT,
    disco_percent FLOAT,
    disco_uso INT,
    cpu_temperatura FLOAT,
    cpu_atividade_dias INT,
    cpu_ociosidade_dias INT,
    ram_livre INT,
    bateria_porcentagem FLOAT,
    bateria_restante INT
);

CREATE TABLE alerta_n (
    idAlerta INT AUTO_INCREMENT PRIMARY KEY,
    criticidade TINYINT,
    captura_id INT,
    descricao VARCHAR(45),
    link_chamado VARCHAR(45),
    dataHora DATETIME,
    status VARCHAR(45),
    acaoTomada VARCHAR(45),
    FOREIGN KEY (captura_id) REFERENCES captura_n(idCaptura)
);

CREATE TABLE endereco (
    id INT PRIMARY KEY AUTO_INCREMENT,
    logradouro VARCHAR(45),
    numLogradouro INT,
    cidade VARCHAR(45),
    estado VARCHAR(45),
    bairro VARCHAR(45),
    complemento VARCHAR(45)
);

CREATE TABLE empresa_fabricante (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cnpj CHAR(14),
    razao_social VARCHAR(45),
    endereco_id INT,
    qtdParcerias INT,
    FOREIGN KEY (endereco_id) REFERENCES endereco(id)
);

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    empresa_id INT,
    nome VARCHAR(45),
    email VARCHAR(100),
    telCelular CHAR(13),
    senha VARCHAR(50),
    nivel TINYINT,
    setor VARCHAR(45),
    cargo VARCHAR(45),
    FOREIGN KEY (empresa_id) REFERENCES empresa_fabricante(id)
);

CREATE TABLE empresa_consumidor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    razao_social VARCHAR(45),
    segmento VARCHAR(45),
    cnpj CHAR(14),
    endereco_id INT,
    qtdFabrica INT,
    FOREIGN KEY (endereco_id) REFERENCES endereco(id)
);

CREATE TABLE parceria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    empresa_consumidor_id INT,
    empresa_fabricante_id INT,
    dataParceria DATETIME,
    qtdPlc INT,
    FOREIGN KEY (empresa_consumidor_id) REFERENCES empresa_consumidor(id),
    FOREIGN KEY (empresa_fabricante_id) REFERENCES empresa_fabricante(id)
);

CREATE TABLE fabrica_consumidor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    empresa_consumidor_id INT,
    endereco_id INT,
    qtdSetor INT,
    FOREIGN KEY (endereco_id) REFERENCES endereco(id)
);

CREATE TABLE setor_fabrica (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    fabrica_consumidor_id INT,
    qtdPlc INT,
    FOREIGN KEY (fabrica_consumidor_id) REFERENCES fabrica_consumidor(id)
);

CREATE TABLE plc (
    id INT PRIMARY KEY AUTO_INCREMENT,
    modelo VARCHAR(45),
    ano YEAR,
    parceria_id INT,
    setor_fabrica_id INT,
    sistema_operacional VARCHAR(45),
    capacidade_ram VARCHAR(45),
    endereco_mac VARCHAR(45),
    hostname VARCHAR(45),
    FOREIGN KEY (parceria_id) REFERENCES parceria(id),
    FOREIGN KEY (setor_fabrica_id) REFERENCES setor_fabrica(id)
);

CREATE TABLE componente (
	id INT PRIMARY KEY AUTO_INCREMENT,
    hardware VARCHAR(45),
    tipo_dado VARCHAR(45),
    unidade_dado VARCHAR(45),
    coluna_captura VARCHAR(85),
    funcao_python TEXT
);

CREATE TABLE config_plc (
	id INT PRIMARY KEY AUTO_INCREMENT,
    componente_id INT,
    plc_id INT,
    limite_atencao FLOAT,
    limite_critico FLOAT,
    intervalo_captura INT,
    FOREIGN KEY (componente_id) REFERENCES componente(id),
    FOREIGN KEY (plc_id) REFERENCES plc(id)
);