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

CREATE TABLE painel_vendas (
id INT AUTO_INCREMENT PRIMARY KEY,
tipo VARCHAR(15),
empresa VARCHAR(100),
modelo VARCHAR(15),
qtd INT,
dtHora DATETIME
);

CREATE TABLE meta_vendas (
id INT AUTO_INCREMENT PRIMARY KEY,
mes VARCHAR(15),
data_hora DATETIME,
meta_de_vendas INT,
media_de_cancelamentos INT
);

-- VIEWS

-- select empresa mais afetada
CREATE OR REPLACE VIEW vw_empresa_com_mais_alertas AS
SELECT COUNT(pa.empresa_consumidor_id) AS qtd, ec.razao_social FROM alerta as a
JOIN config_plc AS conf ON a.config_plc_id = conf.id 
JOIN plc AS p ON conf.plc_id = p.id
JOIN parceria AS pa ON p.parceria_id = pa.id
JOIN  empresa_consumidor AS ec ON pa.empresa_consumidor_id = ec.id
GROUP BY ec.razao_social
ORDER BY qtd DESC LIMIT 1;



-- mês com mais defeitos
CREATE OR REPLACE VIEW vw_mes_com_mais_alertas AS
SELECT count(*) AS qtd, date_format(dataHora, '%m') AS dataHoraMod
FROM alerta AS a
JOIN config_plc AS conf ON a.config_plc_id = conf.id 
JOIN plc AS p ON conf.plc_id = p.id
JOIN parceria AS pa ON p.parceria_id = pa.id
JOIN  empresa_fabricante AS ef ON pa.empresa_fabricante_id = ef.id
WHERE ef.id = 1 AND dataHora >= '2025-01-01'
GROUP BY dataHoraMod
ORDER BY qtd DESC LIMIT 1;



-- mes com mais defeitos dinamico 
CREATE OR REPLACE VIEW vw_mes_com_mais_alertas_din AS
SELECT count(*) as qtd, date_format(dataHora, '%m') AS dataHoraMod, pa.empresa_consumidor_id as empresaId
FROM alerta AS a
JOIN config_plc AS conf ON a.config_plc_id = conf.id 
JOIN plc AS p ON conf.plc_id = p.id
JOIN parceria AS pa ON p.parceria_id = pa.id
JOIN  empresa_fabricante AS ef ON pa.empresa_fabricante_id = ef.id
WHERE ef.id = 1 AND dataHora >= '2025-01-01'
GROUP BY dataHoraMod, empresaId
ORDER BY qtd DESC  ;



-- modelo com maior taxa de defeitos
CREATE OR REPLACE VIEW vw_modelo_com_mais_alertas AS
SELECT count(a.id) as numero, plc.modelo FROM alerta as a
JOIN config_plc cp ON cp.id = a.config_plc_id
JOIN plc ON plc.id = cp.plc_id
GROUP BY plc.modelo
ORDER BY numero DESC LIMIT 1;



-- modelo com maior taxa de defeitos dinamico
CREATE OR REPLACE VIEW vw_modelo_com_mais_alertas_din AS
SELECT count(a.id) as numero, p.modelo, pa.empresa_consumidor_id AS empresaId FROM alerta as a
JOIN config_plc cp ON cp.id = a.config_plc_id
JOIN plc AS p  ON p.id = cp.plc_id
JOIN parceria AS pa ON p.parceria_id = pa.id
GROUP BY p.modelo, empresaId
ORDER BY numero DESC ;



-- grafico de taxa de defeito por mes
CREATE OR REPLACE VIEW vw_prct_defeito_mes AS
SELECT count(*) AS qtd, date_format(dataHora, '%m') AS mes
FROM alerta AS a
JOIN config_plc AS conf ON a.config_plc_id = conf.id 
JOIN plc AS p ON conf.plc_id = p.id
JOIN parceria AS pa ON p.parceria_id = pa.id
JOIN  empresa_fabricante AS ef ON pa.empresa_fabricante_id = ef.id
WHERE ef.id = 1 AND dataHora >= '2025-01-01' AND dataHora <= now()
GROUP BY mes;



-- grafico de taxa de defeito por mes dinamico
CREATE OR REPLACE VIEW vw_prct_defeito_mes_din AS
SELECT count(*) AS qtd, date_format(dataHora, '%m') AS mes, pa.empresa_consumidor_id as empresaId
FROM alerta AS a
JOIN config_plc AS conf ON a.config_plc_id = conf.id 
JOIN plc AS p ON conf.plc_id = p.id
JOIN parceria AS pa ON p.parceria_id = pa.id
JOIN  empresa_fabricante AS ef ON pa.empresa_fabricante_id = ef.id
WHERE ef.id = 1 AND dataHora >= '2025-01-01' AND dataHora <= now() 
GROUP BY mes, empresaId;



-- Taxa de defeitos por modelo no mes
CREATE OR REPLACE VIEW vw_taxa_defeito_por_modelo AS
SELECT date_format(dataHora, '%m') AS mes, COUNT(p.id) AS qtd, p.modelo AS modelo FROM alerta AS a
JOIN config_plc AS conf ON a.config_plc_id = conf.id 
JOIN plc AS p ON conf.plc_id = p.id
WHERE date_format(a.dataHora, '%m') = DATE_FORMAT(NOW(), '%m')
GROUP BY modelo, date_format(a.dataHora, '%m');



-- Taxa de defeitos por modelo no mes dinamico
CREATE OR REPLACE VIEW vw_taxa_defeito_por_modelo_din AS
SELECT date_format(dataHora, '%m') AS mes, COUNT(p.id) AS qtd, p.modelo AS modelo, pa.empresa_consumidor_id as empresaId FROM alerta AS a
JOIN config_plc AS conf ON a.config_plc_id = conf.id 
JOIN plc AS p ON conf.plc_id = p.id
JOIN parceria pa 
ON pa.id = p.parceria_id
WHERE date_format(a.dataHora, '%m') = DATE_FORMAT(NOW(), '%m')
GROUP BY modelo, date_format(a.dataHora, '%m'), empresaId;
