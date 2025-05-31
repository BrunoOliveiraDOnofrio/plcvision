USE plcvision;

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

SELECT * FROM vw_empresa_com_mais_alertas;


-- mês com mais defeitos
CREATE OR REPLACE VIEW vw_mes_com_mais_alertas AS
SELECT count(*), date_format(dataHora, '%m') AS dataHoraMod
FROM alerta AS a
JOIN config_plc AS conf ON a.config_plc_id = conf.id 
JOIN plc AS p ON conf.plc_id = p.id
JOIN parceria AS pa ON p.parceria_id = pa.id
JOIN  empresa_fabricante AS ef ON pa.empresa_fabricante_id = ef.id
WHERE ef.id = 1 AND dataHora >= '2025-01-01' AND dataHora <= now()
GROUP BY dataHoraMod
ORDER BY dataHoraMod DESC LIMIT 1;

SELECT * FROM vw_mes_com_mais_alertas;


-- modelo com maior taxa de defeitos
CREATE OR REPLACE VIEW vw_modelo_com_mais_alertas AS
SELECT count(a.id) as numero, plc.modelo FROM alerta as a
JOIN config_plc cp
ON cp.id = a.config_plc_id
JOIN plc 
ON plc.id = cp.plc_id
GROUP BY plc.modelo
ORDER BY numero DESC LIMIT 1;

SELECT * FROM vw_modelo_com_mais_alertas;


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

SELECT * FROM vw_prct_defeito_mes;


-- Taxa de defeitos por modelo no mes
CREATE OR REPLACE VIEW vw_taxa_defeito_por_modelo AS
SELECT date_format(dataHora, '%m') AS mes, COUNT(p.id) AS qtd, p.modelo AS modelo FROM alerta AS a
JOIN config_plc AS conf ON a.config_plc_id = conf.id 
JOIN plc AS p ON conf.plc_id = p.id
WHERE date_format(a.dataHora, '%m') = DATE_FORMAT(NOW(), '%m')
GROUP BY modelo, date_format(a.dataHora, '%m');

SELECT * FROM vw_taxa_defeito_por_modelo;