DROP DATABASE IF EXISTS PlcVision;
CREATE DATABASE PlcVision;
USE PlcVision;

CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    CNPJ CHAR(14) UNIQUE NOT NULL,
    nome VARCHAR(45) NOT NULL,
    CEP VARCHAR(8) NOT NULL,
    numero VARCHAR(100) NOT NULL
);

CREATE TABLE cliente (
    idCliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    setor VARCHAR(45) NOT NULL,
    CNPJ CHAR(14) UNIQUE NOT NULL,
    CEP CHAR(8) NOT NULL,
    numero VARCHAR(10) NOT NULL
);

CREATE TABLE industria (
    idIndustria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    setor VARCHAR(45) NOT NULL,
    CNPJ CHAR(14) UNIQUE NOT NULL,
    CEP VARCHAR(8) NOT NULL,
    numero VARCHAR(100) NOT NULL
);

CREATE TABLE parceria (
    idParceria INT PRIMARY KEY AUTO_INCREMENT,
    fkIndustria INT NOT NULL,
    fkEmpresa INT NOT NULL,
    dataParceria DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (fkIndustria) REFERENCES industria(idIndustria),
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE PLC (
    idPLC INT PRIMARY KEY AUTO_INCREMENT,
    localizacao VARCHAR(100) NOT NULL,
    modelo VARCHAR(45) NOT NULL,
    ano YEAR NOT NULL,
    fkParceria INT NOT NULL,
    FOREIGN KEY (fkParceria) REFERENCES parceria(idParceria)
);

CREATE TABLE componente (
    idComponente INT PRIMARY KEY AUTO_INCREMENT,
    hardware VARCHAR(45) NOT NULL,
    medicao VARCHAR(45) NOT NULL,
    metrica VARCHAR(10) NOT NULL,
    limiteAtencao FLOAT NOT NULL,
    limiteCritico FLOAT NOT NULL,
    funcaoPython VARCHAR(60) NOT NULL
);

CREATE TABLE captura (
    idCaptura INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME NOT NULL DEFAULT NOW(),
    fkPLC INT NOT NULL,
    fkComponente INT NOT NULL,
    valor FLOAT NOT NULL,
    FOREIGN KEY (fkPLC) REFERENCES PLC(idPLC),
    FOREIGN KEY (fkComponente) REFERENCES componente(idComponente)
);

CREATE TABLE alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    criticidade TINYINT NOT NULL,
    captura_idCaptura INT UNIQUE NOT NULL,
    FOREIGN KEY (captura_idCaptura) REFERENCES captura(idCaptura)
);

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    fkEmpresa INT NOT NULL,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(50) NOT NULL,
    telCelular CHAR(13) NOT NULL,
    nivel TINYINT NOT NULL,
    setor VARCHAR(45) NOT NULL,
    cargo VARCHAR(45) NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

INSERT INTO empresa (CNPJ, nome, CEP, numero) VALUES
('12345678000101', 'Siemens', '01001000', '100'),
('98765432000102', 'Rockwell Automation', '02002000', '200');

INSERT INTO industria (nome, setor, CNPJ, CEP, numero) VALUES
('Fábrica Automotiva', 'Automobilístico', '11111111000101', '04004000', '400'),
('Usina Metalúrgica', 'Metalurgia', '22222222000102', '05005000', '500');

INSERT INTO parceria (fkIndustria, fkEmpresa) VALUES
(1, 1),
(2, 1);

INSERT INTO componente (hardware, medicao, metrica, limiteAtencao, limiteCritico, funcaoPython) VALUES
('CPU', 'Temperatura', '°C', 80.0, 100.0, 'psutil.sensors_temperatures().get("coretemp", [])[0].current'),
('CPU', 'Uso', '%', 80.0, 95.0, 'psutil.cpu_percent(interval=None, percpu=False)'),
('CPU', 'Atividade', 'dias', 70.0, 90.0, 'int(psutil.boot_time() / (60 * 60 * 24))'),
('CPU', 'Ociosidade', 'dias', 20.0, 10.0, 'int(psutil.cpu_times().idle / (60 * 60 * 24))'),
('RAM', 'Uso', '%', 75.0, 90.0, 'psutil.virtual_memory().percent'),
('RAM', 'Memória Livre', 'GB', 2.0, 0.5, 'int(ram.free / (1024 ** 3))'),
('Bateria', 'Quantidade', '%', 20.0, 5.0, 'psutil.sensors_battery().percent'),
('Alimentação', 'Status', '', 0, 0, 'psutil.sensors_battery().power_plugged'),
('Bateria', 'Quantidade', '%', 20.0, 5.0, 'psutil.sensors_battery().percent'),
('Bateria', 'Tempo Restante', 'minutos', 30.0, 10.0, 'int(psutil.sensors_battery().secsleft / 60)');

INSERT INTO PLC (fkParceria, localizacao, modelo, ano) VALUES
(1, 'Linha de montagem A', 'SIMATIC S7-1500', 2020),
(2, 'Área de fundição', 'Allen-Bradley ControlLogix', 2017),
(2, 'Linha de produção B', 'Schneider M340', 2021);

INSERT INTO usuario (fkEmpresa, nome, email, senha, telCelular, nivel, setor, cargo) VALUES
(1, 'Carlos Silva', 'carlos@siemens.com', 'senha123', '11987654321', 2, 'Engenharia', 'Gerente de Projetos'),
(2, 'Ana Souza', 'ana@rockwell.com', 'seguranca456', '11912345678', 1, 'TI', 'Analista de Dados');

INSERT INTO captura (fkPLC, fkComponente, valor) VALUES
(1, 1, 45.5),
(1, 2, 65.3),
(1, 3, 70.5),
(1, 4, 95),
(1, 5, 1),
(2, 1, 50.2),
(2, 2, 75.8),
(2, 3, 80.0),
(2, 4, 50.0),
(2, 5, 0);