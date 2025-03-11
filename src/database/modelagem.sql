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

CREATE TABLE contato ( 
    idContato INT PRIMARY KEY AUTO_INCREMENT, 
    fkEmpresa INT, 
    mensagem VARCHAR(255) NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    data DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
); 

CREATE TABLE industria ( 
    idIndustria INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45) NOT NULL, 
    setor VARCHAR(45) NOT NULL, 
    CNPJ CHAR(14) UNIQUE NOT NULL, 
    CEP CHAR(8) NOT NULL, 
    numero VARCHAR(100) NOT NULL 
); 

CREATE TABLE parceria(
    idParceria INT PRIMARY KEY AUTO_INCREMENT,
    fkIndustria INT NOT NULL,
    fkEmpresa INT NOT NULL,
    dataParceria DATETIME NOT NULL DEFAULT now(),
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

CREATE TABLE dado ( 
    idDado INT PRIMARY KEY AUTO_INCREMENT, 
    fkPLC INT NOT NULL, 
    dataHora DATETIME NOT NULL DEFAULT NOW(), 
    temperaturaCpu FLOAT, 
    usoCPU FLOAT, 
    atividadeCPU FLOAT, 
    ociosidadeCPU FLOAT, 
    usoMemoriaRam FLOAT, 
    memoriaLivre FLOAT, 
    isAlimentacao TINYINT, 
    qtdBateria FLOAT, 
    tempoBateriaRestante FLOAT, 
    FOREIGN KEY (fkPLC) REFERENCES PLC(idPLC),
    CONSTRAINT chkIsAlimentacao CHECK(isAlimentacao IN (0, 1)) -- 0 - False, 1 - TRUE
); 

CREATE TABLE alerta ( 
    idAlerta INT PRIMARY KEY AUTO_INCREMENT, 
    fkDado INT UNIQUE NOT NULL, 
    nivel TINYINT NOT NULL, 
    FOREIGN KEY (fkDado) REFERENCES dado(idDado) ,
    CONSTRAINT chkNivelAlerta CHECK(nivel IN (0, 1)) -- 0 atencao, 1 critico
); 

CREATE TABLE usuario ( 
    idUsuario INT PRIMARY KEY AUTO_INCREMENT, 
    fkEmpresa INT NOT NULL, 
    nome VARCHAR(45) NOT NULL, 
    email VARCHAR(45) UNIQUE NOT NULL, 
    senha VARCHAR(50) NOT NULL, 
    telCelular CHAR(13) NOT NULL, 
    nivel TINYINT NOT NULL, 
    setor VARCHAR(45) NOT NULL, 
    cargo VARCHAR(45) NOT NULL, 
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    CONSTRAINT chkNivelUsuario CHECK(nivel IN (0, 1, 2)) -- 0 real time, 1 insights, 2 todas dash's + CRUD de usuarios
);

INSERT INTO empresa (CNPJ, nome, CEP, numero) VALUES
('12345678000101', 'Siemens', '01001000', '100'),
('98765432000102', 'Rockwell Automation', '02002000', '200'),
('45678912000103', 'Schneider Electric', '03003000', '300');

INSERT INTO contato (fkEmpresa, mensagem, email) VALUES
(1, 'Precisamos de mais informações sobre seus produtos.', 'cliente@industria.com'),
(2, 'Gostaríamos de uma cotação para PLCs.', 'compras@fabrica.com');

INSERT INTO industria (nome, setor, CNPJ, CEP, numero) VALUES
('Fábrica Automotiva', 'Automobilístico', '11111111000101', '04004000', '400'),
('Usina Metalúrgica', 'Metalurgia', '22222222000102', '05005000', '500');

INSERT INTO parceria (fkEmpresa, fkIndustria) VALUES 
(1, 1),
(1, 2),
(3, 2);

INSERT INTO PLC (fkParceria, localizacao, modelo, ano) VALUES    
(1, 'Linha de montagem A', 'SIMATIC S7-1500', '2020'),
(2, 'Área de fundição', 'Allen-Bradley ControlLogix', '2017');

INSERT INTO dado (fkPLC, dataHora, temperaturaCpu, usoCPU, atividadeCPU, ociosidadeCPU, usoMemoriaRam, memoriaLivre, isAlimentacao, dtBateria, tempoBateriaRestante) VALUES
(1, NOW(), 45.5, 65.3, 80.1, 19.9, 70.5, 2.0, 1, 95.0, 120),
(2, NOW(), 50.2, 75.8, 85.0, 15.0, 80.0, 1.5, 0, 50.0, 60);

INSERT INTO alerta (fkDado, nivel) VALUES
(1, 0), 
(2, 1); 

INSERT INTO usuario (fkEmpresa, nome, email, senha, telCelular, nivel, setor, cargo) VALUES
(1, 'Carlos Silva', 'carlos@siemens.com', 'senha123', '11987654321', 2, 'Engenharia', 'Gerente de Projetos'),
(2, 'Ana Souza', 'ana@rockwell.com', 'seguranca456', '11912345678', 1, 'TI', 'Analista de Dados');