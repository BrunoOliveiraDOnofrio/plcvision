 DROP DATABASE IF EXISTS plcvision;
 CREATE DATABASE IF NOT EXISTS plcvision;
USE plcvision;


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
    razao_social VARCHAR(120),
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
    descricao TEXT,
    link_chamado VARCHAR(500),
    dataHora DATETIME,
    status VARCHAR(45),
    acaoTomada VARCHAR(45),
    valor_capturado FLOAT,
    tipo_valor VARCHAR(80)
    ,config_plc_id INT 
    ,CONSTRAINT fkconfigplcalerta FOREIGN KEY (config_plc_id) REFERENCES config_plc(id)
);


CREATE USER 'plc_manager'@'%' IDENTIFIED BY 'plc_password';
GRANT ALL PRIVILEGES ON plcvision.* TO 'plc_manager'@'%';
FLUSH PRIVILEGES;

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

-- -- Inserindo empresas consumidoras
-- INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
-- ('Volkswagen do Brasil', 'Automobilístico', '11223344000155', 3, 2, 'token_vw'),
-- ('Nestlé Brasil', 'Alimentos', '22334455000166', 4, 1, 'token_nestle');


-- -- Inserindo parcerias
-- INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
-- (1, 1, '2022-06-15 08:00:00', 10),
-- (2, 2, '2023-02-20 10:30:00', 15);

-- -- Inserindo fábricas
-- INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
-- ('Fábrica São Bernardo', 1, 3, 3),
-- ('Fábrica de Chocolates', 2, 4, 2);

-- -- Inserindo setores
-- INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
-- ('Linha de Montagem', 1, 5),
-- ('Produção de Chocolates', 2, 10);

-- -- Inserir N PLCs de acordo com o seu id. Ex: Se o seu PLC é id = 4, ADD 4 PLCs
-- INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
-- ('Siemens s7-1500', 2021, 1,1, 'Windowns CE', '2GB', '00:1A:2B:3C:4D:5E', 'plc-s7-1500-01'),
-- ('Schneider M340', 2022, 2,2, 'Linux', '4GB', '00:1B:2C:3D:4E:5F', 'plc-M340-01'),
-- ('Siemens XRL8', 2015, 1,1, 'Linux', '2GB', '00:3F:3F:3F:5E:1A', 'plc-XRL8-01');

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
('REDE', 'Pacote Mandado', 'Unidade', 'rede_sent', 'psutil.net_io_counters().packets_sent'),
('REDE','Erros recebido', 'Unidade', 'erro_recv', 'psutil.net_io_counters(pernic=False, nowrap=True).dropout'),
('REDE', 'Erros mandado', 'Unidade', 'erro_sent', 'psutil.net_io_counters(pernic=False, nowrap=True).dropin'),
('REDE', 'Conexões', 'Unidade', 'rede_conexoes','len(psutil.net_connections(kind="all"))');




-- Inserindo configurações de PLC
-- Alterar a coluna "plc_id" de acordo com o ID do seu PLC.
-- INSERT INTO config_plc (componente_id,  limite_atencao, limite_critico,  fabrica_consumidor_id) VALUES
-- (2,  85.0, 95.0,  1),
-- (8,  4000.0, 5000.0,  1),
-- (5,  70, 80,  1),
-- (9,  4000000, 5000000,  1),
-- (12,  8000000, 9000000,  1),
-- (11,  8000000, 9000000,  1),
-- (4,  12, 15,  1),
-- (6,  9000, 8000,  1),
-- (13,  500, 600,  1);

INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Distrito da Costa', 22, 'Costa', 'RR', 'Capitão Eduardo', 'Bloco 1');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Volkswagen do Brasil Indústria de Veículos Ltda', 'Têxtil', '67.584.329/0001-18', 5, 1, 'token_empresa_1');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(1, 1, '2024-02-20 05:19:32', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica Barros da Serra', 1, 5, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Usinagem', 1, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200', 2020, 1, 1, 'Linux', '8GB', '86:b9:ca:a5:08:c8', 'PLC_Usinagem_9');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 1, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 1, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 1, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 1, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 1, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 1, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 1, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 1, 68.29, 72.84, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 R/H', 2018, 1, 1, 'Linux', '2GB', 'c6:45:8b:64:c0:a8', 'PLC_Usinagem_5');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 2, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 2, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 2, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 2, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 2, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 2, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 2, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 2, 3006428475.37, 3463255523.6, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 2, 33.55, 45.59, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-200 SMART', 2022, 1, 1, 'VxWorks', '8GB', '58:25:71:1a:43:67', 'PLC_Usinagem_6');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 3, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 3, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 3, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 3, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 3, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 3, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 3, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 3, 2768805512.99, 3244864382.44, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-400H', 2018, 1, 1, 'Windows CE', '2GB', '7a:05:3e:bd:89:c5', 'PLC_Usinagem_10');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 4, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 4, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 4, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 4, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 4, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 4, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 4, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 4, 33.55, 45.59, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('LOGO!', 2020, 1, 1, 'Windows CE', '8GB', '26:71:67:10:c0:9a', 'PLC_Usinagem_11');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 5, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 5, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 5, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 5, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 5, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 5, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 5, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 5, 48.73, 53.45, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-400H', 2023, 1, 1, 'Windows CE', '2GB', 'cc:07:42:0b:4a:ef', 'PLC_Usinagem_15');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 6, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 6, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 6, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 6, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 6, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 6, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 6, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 6, 3006428475.37, 3463255523.6, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-400H', 2023, 1, 1, 'Windows CE', '4GB', '74:95:d7:99:6c:48', 'PLC_Usinagem_15');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 7, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 7, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 7, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 7, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 7, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 7, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 7, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 7, 1190.38, 1362.68, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 7, 3006428475.37, 3463255523.6, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200 F', 2023, 1, 1, 'Windows CE', '4GB', 'd8:72:61:2d:c2:2e', 'PLC_Usinagem_9');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 8, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 8, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 8, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 8, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 8, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 8, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 8, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 8, 68.29, 72.84, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 8, 2768805512.99, 3244864382.44, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('ET 200SP', 2019, 1, 1, 'VxWorks', '8GB', '84:80:3d:d5:66:e0', 'PLC_Usinagem_9');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 9, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 9, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 9, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 9, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 9, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 9, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 9, 500, 600, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200', 2018, 1, 1, 'Linux', '4GB', 'fc:2b:bf:d2:f8:f0', 'PLC_Usinagem_13');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 10, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 10, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 10, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 10, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 10, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 10, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 10, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 10, 33.55, 45.59, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 10, 2768805512.99, 3244864382.44, 1);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Controle de Qualidade', 1, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200 F', 2021, 1, 2, 'VxWorks', '4GB', 'b2:af:18:3a:b3:bb', 'PLC_Controle de Qualidade_3');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 11, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 11, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 11, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 11, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 11, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 11, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 11, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 11, 3006428475.37, 3463255523.6, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 11, 2768805512.99, 3244864382.44, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-400H', 2023, 1, 2, 'Linux', '8GB', '9a:37:b1:f3:f5:3c', 'PLC_Controle de Qualidade_8');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 12, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 12, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 12, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 12, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 12, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 12, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 12, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 12, 33.55, 45.59, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 R/H', 2020, 1, 2, 'Windows CE', '8GB', '70:53:8f:da:64:c1', 'PLC_Controle de Qualidade_9');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 13, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 13, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 13, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 13, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 13, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 13, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 13, 500, 600, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 T', 2020, 1, 2, 'Windows CE', '2GB', '9c:d6:2b:8f:b6:a8', 'PLC_Controle de Qualidade_7');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 14, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 14, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 14, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 14, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 14, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 14, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 14, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 14, 68.29, 72.84, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 14, 48.73, 53.45, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('ET 200SP', 2022, 1, 2, 'Linux', '2GB', 'c8:93:94:e8:f9:8a', 'PLC_Controle de Qualidade_13');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 15, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 15, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 15, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 15, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 15, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 15, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 15, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 15, 1190.38, 1362.68, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 R/H', 2021, 1, 2, 'Linux', '8GB', '76:2a:49:3a:7d:f6', 'PLC_Controle de Qualidade_12');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 16, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 16, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 16, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 16, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 16, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 16, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 16, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 16, 3006428475.37, 3463255523.6, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 16, 33.55, 45.59, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200 F', 2024, 1, 2, 'Linux', '8GB', 'f0:ba:d2:c6:b3:0d', 'PLC_Controle de Qualidade_7');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 17, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 17, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 17, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 17, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 17, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 17, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 17, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 17, 68.29, 72.84, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 17, 3006428475.37, 3463255523.6, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 PN', 2020, 1, 2, 'VxWorks', '8GB', '64:07:53:e5:20:c5', 'PLC_Controle de Qualidade_5');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 18, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 18, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 18, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 18, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 18, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 18, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 18, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 18, 68.29, 72.84, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-400H', 2024, 1, 2, 'VxWorks', '2GB', '74:be:1b:7c:c3:91', 'PLC_Controle de Qualidade_9');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 19, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 19, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 19, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 19, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 19, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 19, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 19, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 19, 33.55, 45.59, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 19, 3006428475.37, 3463255523.6, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('LOGO!', 2020, 1, 2, 'VxWorks', '2GB', '52:6a:ca:b4:b5:bf', 'PLC_Controle de Qualidade_13');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 20, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 20, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 20, 24605.64, 30687.03, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 20, 3589.77, 28083.92, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 20, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 20, 900000, 1000000, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 20, 500, 600, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 20, 1190.38, 1362.68, 1);
INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Favela Ágatha da Costa', 384, 'Sá', 'GO', 'São Jorge 1ª Seção', 'Bloco 1');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Lenovo Tecnologia Ltda', 'Farmacêutico', '57.408.963/0001-46', 6, 1, 'token_empresa_2');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(2, 1, '2024-07-06 16:11:37', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica Aragão de Rodrigues', 2, 6, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Galvanoplastia', 2, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200 F', 2018, 2, 3, 'VxWorks', '8GB', '3e:ed:f8:87:1b:43', 'PLC_Galvanoplastia_12');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 21, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 21, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 21, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 21, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 21, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 21, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 21, 500, 600, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 21, 2768805512.99, 3244864382.44, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 T', 2021, 2, 3, 'VxWorks', '8GB', '3e:84:29:e6:89:8f', 'PLC_Galvanoplastia_6');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 22, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 22, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 22, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 22, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 22, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 22, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 22, 500, 600, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 22, 48.73, 53.45, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 PN', 2019, 2, 3, 'VxWorks', '8GB', '56:d2:bd:7e:42:36', 'PLC_Galvanoplastia_2');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 23, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 23, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 23, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 23, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 23, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 23, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 23, 500, 600, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 23, 1190.38, 1362.68, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 R/H', 2023, 2, 3, 'Linux', '4GB', '90:a4:d5:e0:5b:7c', 'PLC_Galvanoplastia_9');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 24, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 24, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 24, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 24, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 24, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 24, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 24, 500, 600, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-400H', 2024, 2, 3, 'VxWorks', '2GB', '4a:39:c4:15:35:31', 'PLC_Galvanoplastia_14');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 25, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 25, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 25, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 25, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 25, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 25, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 25, 500, 600, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 25, 1190.38, 1362.68, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200', 2023, 2, 3, 'VxWorks', '4GB', '7c:0b:2e:85:8f:07', 'PLC_Galvanoplastia_9');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 26, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 26, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 26, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 26, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 26, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 26, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 26, 500, 600, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 26, 33.55, 45.59, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 26, 3006428475.37, 3463255523.6, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-400H', 2023, 2, 3, 'Linux', '8GB', 'ea:a6:79:aa:c3:e4', 'PLC_Galvanoplastia_5');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 27, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 27, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 27, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 27, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 27, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 27, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 27, 500, 600, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 27, 33.55, 45.59, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 27, 3006428475.37, 3463255523.6, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 T', 2020, 2, 3, 'VxWorks', '4GB', '7a:1b:8a:55:b2:00', 'PLC_Galvanoplastia_9');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 28, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 28, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 28, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 28, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 28, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 28, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 28, 500, 600, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 28, 2768805512.99, 3244864382.44, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 28, 3006428475.37, 3463255523.6, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('LOGO!', 2022, 2, 3, 'Windows CE', '2GB', '5e:43:8d:28:98:6f', 'PLC_Galvanoplastia_7');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 29, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 29, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 29, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 29, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 29, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 29, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 29, 500, 600, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2023, 2, 3, 'VxWorks', '4GB', 'f6:23:6d:ef:0b:d2', 'PLC_Galvanoplastia_14');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 30, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 30, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 30, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 30, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 30, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 30, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 30, 500, 600, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Laboratório', 2, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-400H', 2024, 2, 4, 'Windows CE', '4GB', '8a:cd:31:fd:6e:b9', 'PLC_Laboratório_13');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 31, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 31, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 31, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 31, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 31, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 31, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 31, 500, 600, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('LOGO!', 2022, 2, 4, 'VxWorks', '8GB', 'b4:2d:88:05:5c:35', 'PLC_Laboratório_6');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 32, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 32, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 32, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 32, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 32, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 32, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 32, 500, 600, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 32, 1190.38, 1362.68, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 32, 2768805512.99, 3244864382.44, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2018, 2, 4, 'VxWorks', '8GB', '0a:f1:01:34:55:89', 'PLC_Laboratório_11');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 33, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 33, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 33, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 33, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 33, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 33, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 33, 500, 600, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 33, 48.73, 53.45, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 33, 1190.38, 1362.68, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200', 2022, 2, 4, 'Windows CE', '4GB', '02:34:af:9c:d2:86', 'PLC_Laboratório_15');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 34, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 34, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 34, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 34, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 34, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 34, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 34, 500, 600, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 34, 3006428475.37, 3463255523.6, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 34, 2768805512.99, 3244864382.44, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('ET 200SP', 2020, 2, 4, 'Linux', '2GB', '2a:1f:3a:8b:e4:19', 'PLC_Laboratório_14');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 35, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 35, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 35, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 35, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 35, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 35, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 35, 500, 600, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200', 2021, 2, 4, 'VxWorks', '4GB', '16:01:20:29:0f:0b', 'PLC_Laboratório_3');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 36, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 36, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 36, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 36, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 36, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 36, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 36, 500, 600, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 36, 2768805512.99, 3244864382.44, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 PN', 2018, 2, 4, 'Linux', '8GB', '48:66:e9:f0:58:3f', 'PLC_Laboratório_3');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 37, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 37, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 37, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 37, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 37, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 37, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 37, 500, 600, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2022, 2, 4, 'Windows CE', '8GB', 'f2:10:62:76:09:aa', 'PLC_Laboratório_2');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 38, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 38, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 38, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 38, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 38, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 38, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 38, 500, 600, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 38, 33.55, 45.59, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 T', 2018, 2, 4, 'VxWorks', '4GB', '7a:16:cd:28:12:3a', 'PLC_Laboratório_11');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 39, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 39, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 39, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 39, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 39, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 39, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 39, 500, 600, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 39, 2768805512.99, 3244864382.44, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 39, 1190.38, 1362.68, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2020, 2, 4, 'Windows CE', '8GB', '96:de:0c:22:8b:e0', 'PLC_Laboratório_12');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 40, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 40, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 40, 24605.64, 30687.03, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 40, 3589.77, 28083.92, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(13, 40, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(14, 40, 900000, 1000000, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(15, 40, 500, 600, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 40, 1190.38, 1362.68, 2);

