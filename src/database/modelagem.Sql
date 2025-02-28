CREATE DATABASE PlcVision;
USE PlcVision;
 
CREATE TABLE Empresas ( 
    idEmpresas INT PRIMARY KEY AUTO_INCREMENT, 
    CNPJ CHAR(14) UNIQUE NOT NULL, 
    nome VARCHAR(45) NOT NULL, 
    CEP VARCHAR(8), 
    numero VARCHAR(100) 
); 

CREATE TABLE Contato ( 
    idContato VARCHAR(45) PRIMARY KEY, 
    fkEmpresa INT, 
    mensagem VARCHAR(255), 
    CNPJ CHAR(14), 
    email VARCHAR(100), 
    FOREIGN KEY (fkEmpresa) REFERENCES Empresas(idEmpresas) ON DELETE CASCADE 
); 

CREATE TABLE Industrias ( 
    idIndustrias INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45) NOT NULL, setor VARCHAR(45), 
    CNPJ CHAR(14) UNIQUE NOT NULL, 
    CEP CHAR(8), numero VARCHAR(100) 
); 

CREATE TABLE PLC ( 
    idPLC INT PRIMARY KEY AUTO_INCREMENT, 
    fkIndustria INT, 
    fkEmpresa INT, 
    localizacao VARCHAR(100), 
    modelo VARCHAR(45), 
    FOREIGN KEY (fkIndustria) REFERENCES Industrias(idIndustrias) ON DELETE CASCADE, 
    FOREIGN KEY (fkEmpresa) REFERENCES Empresas(idEmpresas) ON DELETE CASCADE 
); 

CREATE TABLE Dados ( 
    idDados INT PRIMARY KEY AUTO_INCREMENT, 
    fkPLC INT, 
    dataHora DATETIME NOT NULL DEFAULT NOW(), 
    temperaturaCpu FLOAT, 
    usoCPU FLOAT, 
    atividadeCPU FLOAT, 
    ociosidadeCPU FLOAT, 
    usoMemoriaRam FLOAT, 
    memoriaLivre FLOAT, 
    isAlimentacao TINYINT, 
    dtBateria FLOAT, 
    tempoBateriaRestante FLOAT, 
    FOREIGN KEY (fkPLC) REFERENCES PLC(idPLC) ON DELETE CASCADE,
    CONSTRAINT chkIsAlimentacao CHECK(isAlimentacao IN (0, 1)) -- 0 - False, 1 - TRUE
); 

CREATE TABLE Alertas ( 
    idAlertas INT PRIMARY KEY AUTO_INCREMENT, 
    fkDados INT, 
    nivel TINYINT NOT NULL, 
    FOREIGN KEY (fkDados) REFERENCES Dados(idDados) ON DELETE CASCADE ,
    CONSTRAINT chkNivelAlerta CHECK(nivel IN (0, 1)) -- 0 atencao, 1 critico
); 

CREATE TABLE Usuarios ( 
    idUsuarios INT PRIMARY KEY AUTO_INCREMENT, 
    fkEmpresa INT, 
    nome VARCHAR(45) NOT NULL, 
    email VARCHAR(45) UNIQUE NOT NULL, 
    senha VARCHAR(50) NOT NULL, 
    telefone CHAR(13), 
    nivel TINYINT NOT NULL, 
    setor VARCHAR(45), 
    cargo VARCHAR(45), 
    FOREIGN KEY (fkEmpresa) REFERENCES Empresas(idEmpresas) ON DELETE CASCADE,
    CONSTRAINT chkNivelUsuario CHECK(nivel IN (0, 1, 2)) -- 0 real time, 1 insights, 2 todas dash's + CRUD de usuarios
);

INSERT INTO Empresas (CNPJ, nome, CEP, numero) VALUES
('12345678000101', 'Siemens', '01001000', '100'),
('98765432000102', 'Rockwell Automation', '02002000', '200'),
('45678912000103', 'Schneider Electric', '03003000', '300');

INSERT INTO Contato (idContato, fkEmpresa, mensagem, CNPJ, email) VALUES
('CT001', 1, 'Precisamos de mais informações sobre seus produtos.', '12345678000101', 'cliente@industria.com'),
('CT002', 2, 'Gostaríamos de uma cotação para PLCs.', '98765432000102', 'compras@fabrica.com');

INSERT INTO Industrias (nome, setor, CNPJ, CEP, numero) VALUES
('Fábrica Automotiva', 'Automobilístico', '11111111000101', '04004000', '400'),
('Usina Metalúrgica', 'Metalurgia', '22222222000102', '05005000', '500');

INSERT INTO PLC (fkIndustria, fkEmpresa, localizacao, modelo) VALUES
(1, 1, 'Linha de montagem A', 'SIMATIC S7-1500'),
(2, 2, 'Área de fundição', 'Allen-Bradley ControlLogix');

INSERT INTO Dados (fkPLC, dataHora, temperaturaCpu, usoCPU, atividadeCPU, ociosidadeCPU, usoMemoriaRam, memoriaLivre, isAlimentacao, dtBateria, tempoBateriaRestante) VALUES
(1, NOW(), 45.5, 65.3, 80.1, 19.9, 70.5, 2.0, 1, 95.0, 120),
(2, NOW(), 50.2, 75.8, 85.0, 15.0, 80.0, 1.5, 0, 50.0, 60);

INSERT INTO Alertas (fkDados, nivel) VALUES
(1, 0), 
(2, 1); 

INSERT INTO Usuarios (fkEmpresa, nome, email, senha, telefone, nivel, setor, cargo) VALUES
(1, 'Carlos Silva', 'carlos@siemens.com', 'senha123', '11987654321', 2, 'Engenharia', 'Gerente de Projetos'),
(2, 'Ana Souza', 'ana@rockwell.com', 'seguranca456', '11912345678', 1, 'TI', 'Analista de Dados');