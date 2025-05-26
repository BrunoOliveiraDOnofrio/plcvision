DROP DATABASE IF EXISTS plcvision;
CREATE DATABASE plcvision;
USE plcvision;

-- Criação de usuário com acesso externo
CREATE USER IF NOT EXISTS 'plcvision'@'%' IDENTIFIED BY 'urubu100';
GRANT ALL PRIVILEGES ON plcvision.* TO 'plcvision'@'%';
FLUSH PRIVILEGES;



-- SELECT co.id, co.funcao_python,co.tipo_dado, conf.limite_atencao, conf.limite_critico, co.hardware, co.coluna_captura from componente as co 
--                   join config_plc as conf on conf.componente_id = co.id 
--                   join plc as p on p.id = conf.plc_id 
--                   where conf.plc_id = 3;
                   
CREATE TABLE captura (
    id INT PRIMARY KEY AUTO_INCREMENT
    ,valor FLOAT
    ,tipo VARCHAR(80)
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
    status TINYINT,
    FOREIGN KEY (endereco_id) REFERENCES endereco(id)
);

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
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
    cnpj VARCHAR(30),
    endereco_id INT,
    qtdFabrica INT,
    token VARCHAR(100)
    ,FOREIGN KEY (endereco_id) REFERENCES endereco(id)
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
    FOREIGN KEY (componente_id) REFERENCES componente(id),
    FOREIGN KEY (plc_id) REFERENCES plc(id),
    fabrica_consumidor_id INT NULL
    ,CONSTRAINT fkfabricaconsumidorconfig FOREIGN KEY (fabrica_consumidor_id) REFERENCES fabrica_consumidor(id)
    ,padrao TINYINT NULL
    ,ativo TINYINT DEFAULT 1
);


CREATE TABLE alerta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    criticidade TINYINT,
    descricao VARCHAR(255),
    link_chamado VARCHAR(45),
    dataHora DATETIME,
    status VARCHAR(45),
    acaoTomada VARCHAR(45),
    valor_capturado FLOAT,
    tipo_valor VARCHAR(80)
    ,config_plc_id INT 
    ,CONSTRAINT fkconfigplcalerta FOREIGN KEY (config_plc_id) REFERENCES config_plc(id)
);

-- Inserindo endereços


INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Avenida Paulista', 1000, 'São Paulo', 'SP', 'Bela Vista', 'Andar 5'),
('Rua XV de Novembro', 500, 'Curitiba', 'PR', 'Centro', 'Sala 12'),
('Avenida Brasil', 1200, 'Rio de Janeiro', 'RJ', 'Copacabana', 'Bloco A'),
('Rua dos Andradas', 300, 'Porto Alegre', 'RS', 'Centro Histórico', 'Loja 1');

-- Inserindo empresas fabricantes
INSERT INTO empresa_fabricante (cnpj, razao_social, endereco_id, qtdParcerias, status) VALUES
('12345678000199', 'Siemens do Brasil', 1, 2, 1),
('98765432000188', 'Schneider Electric', 2, 3, 1);

-- Inserindo usuários
INSERT INTO usuario (empresa_id, nome, email, telCelular, senha, nivel, setor, cargo) VALUES
(1, 'Carlos Silva', 'carlos.silva@siemens.com', '5511998765432', 'senha123', 2, 'Engenharia', 'Engenheiro de Automação'),
(1, 'Mariana Souza', 'mariana.souza@schneider.com', '5541998765432', 'senha456', 1, 'TI', 'Analista de Sistemas'),
(1, 'Douglas Pellegrino', 'douglas@email.com', '11348461078', 'senha789', 3, 'TI', 'Analista de Sistemas');

-- Inserindo empresas consumidoras
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Volkswagen do Brasil', 'Automobilístico', '11223344000155', 3, 2, 'token_vw'),
('Nestlé Brasil', 'Alimentos', '22334455000166', 4, 1, 'token_nestle');


-- Inserindo parcerias
INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(1, 1, '2022-06-15 08:00:00', 10),
(2, 2, '2023-02-20 10:30:00', 15);

-- Inserindo fábricas
INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica São Bernardo', 1, 3, 3),
('Fábrica de Chocolates', 2, 4, 2);

-- Inserindo setores
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Linha de Montagem', 1, 5),
('Produção de Chocolates', 2, 10);

-- Inserir N PLCs de acordo com o seu id. Ex: Se o seu PLC é id = 4, ADD 4 PLCs
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2021, 1,1, 'Windowns CE', '2GB', '00:1A:2B:3C:4D:5E', 'plc-s7-1500-01'),
('Schneider M340', 2022, 2,2, 'Linux', '4GB', '00:1B:2C:3D:4E:5F', 'plc-M340-01'),
('Siemens XRL8', 2015, 1,1, 'Linux', '2GB', '00:3F:3F:3F:5E:1A', 'plc-XRL8-01');

INSERT INTO componente (hardware, tipo_dado, unidade_dado, coluna_captura,  funcao_python) VALUES
('CPU', 'Temperatura', '°C', 'cpu_temperatura','psutil.sensors_temperatures().get("coretemp", [])[0].current'),
('CPU', 'Uso', '%', 'cpu_percent', 'psutil.cpu_percent(interval=None, percpu=False)'),
('CPU', 'Atividade', 'dias', 'cpu_atividade_dias', 'int(psutil.boot_time() / (60 * 60 * 24))'),
('CPU', 'Ociosidade', 'dias', 'cpu_ociosidade_dias' , 'int(psutil.cpu_times().idle / (60 * 60 * 24))'),
('RAM', 'Uso', '%', 'ram_percent' , 'psutil.virtual_memory().percent'),
('RAM', 'Memoria Livre', 'Bytes', 'ram_livre' ,'int(psutil.virtual_memory().available)'),
('Bateria', 'Quantidade', '%', 'bateria_porcentagem', 'psutil.sensors_battery().percent'),
('CPU', 'Frequência', 'Mhz', 'cpu_freq', 'psutil.cpu_freq().current' ),
('RAM','Uso em Bytes', 'Bytes', 'ram_uso' ,'psutil.virtual_memory().used'),
('Bateria', 'Tempo Restante', 'minutos', 'bateria_restante', 'int(psutil.sensors_battery().secsleft / 60)'),
('REDE', 'Pacote Recebido', 'Unidade', 'rede_recv', 'psutil.net_io_counters().packets_recv'),
('REDE', 'Pacote Mandado', 'Unidade', 'rede_sent', 'psutil.net_io_counters().packets_sent');



-- Inserindo configurações de PLC
-- Alterar a coluna "plc_id" de acordo com o ID do seu PLC.
INSERT INTO config_plc (componente_id,  limite_atencao, limite_critico,  fabrica_consumidor_id) VALUES
(2,  85.0, 95.0,  1),
(8,  4000.0, 5000.0,  1),
(5,  70, 80,  1),
(9,  4000000, 5000000,  1),
(12,  8000000, 9000000,  1),
(11,  8000000, 9000000,  1),
(4,  12, 15,  1),
(6,  9000, 8000,  1);

