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
SELECT count(*) AS qtd, date_format(dataHora, '%m') AS dataHoraMod
FROM alerta AS a
JOIN config_plc AS conf ON a.config_plc_id = conf.id 
JOIN plc AS p ON conf.plc_id = p.id
JOIN parceria AS pa ON p.parceria_id = pa.id
JOIN  empresa_fabricante AS ef ON pa.empresa_fabricante_id = ef.id
WHERE ef.id = 1 AND dataHora >= '2025-01-01'
GROUP BY dataHoraMod
ORDER BY qtd DESC LIMIT 1;

SELECT * FROM vw_mes_com_mais_alertas;

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

SELECT * FROM vw_mes_com_mais_alertas_din where empresaId = 2;


-- modelo com maior taxa de defeitos
CREATE OR REPLACE VIEW vw_modelo_com_mais_alertas AS
SELECT count(a.id) as numero, plc.modelo FROM alerta as a
JOIN config_plc cp ON cp.id = a.config_plc_id
JOIN plc ON plc.id = cp.plc_id
GROUP BY plc.modelo
ORDER BY numero DESC LIMIT 1;

SELECT * FROM vw_modelo_com_mais_alertas;

-- modelo com maior taxa de defeitos dinamico
CREATE OR REPLACE VIEW vw_modelo_com_mais_alertas_din AS
SELECT count(a.id) as numero, p.modelo, pa.empresa_consumidor_id AS empresaId FROM alerta as a
JOIN config_plc cp ON cp.id = a.config_plc_id
JOIN plc AS p  ON p.id = cp.plc_id
JOIN parceria AS pa ON p.parceria_id = pa.id
GROUP BY p.modelo, empresaId
ORDER BY numero DESC ;

SELECT * FROM vw_modelo_com_mais_alertas_din where empresaId =2;


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


-- grafico de taxa de defeito por mes dinamico
CREATE OR REPLACE VIEW vw_prct_defeito_mes AS
SELECT count(*) AS qtd, date_format(dataHora, '%m') AS mes, pa.empresa_consumidor_id as empresaId
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


-- modelo mais vendido no mês
CREATE OR REPLACE VIEW vw_modelo_mais_vendido AS
SELECT COUNT(id), modelo FROM painel_vendas
WHERE dtHora <= NOW()
GROUP BY modelo
ORDER BY modelo DESC
LIMIT 1;

SELECT * FROM vw_modelo_mais_vendido;


-- meta de vendas
SELECT meta_de_vendas AS meta, mes FROM meta_vendas
WHERE MONTH(data_hora) = MONTH(NOW());

-- qtd atual de vendas
SELECT SUM(qtd) AS qtdTotal FROM painel_vendas
WHERE MONTH(dtHora) = MONTH(NOW()) AND tipo = 'Pedido';


-- media de cancelamentos
SELECT media_de_cancelamentos AS mediaCancel, mes FROM meta_vendas
WHERE MONTH(data_hora) = MONTH(NOW());


-- qtd cancelamentos atual
SELECT COUNT(id) AS cancelAtual, SUM(qtd) AS qtd, tipo  FROM painel_vendas
WHERE MONTH(dtHora) = MONTH(NOW()) AND tipo = 'Cancelamento';

select * from painel_vendas ORDER BY tipo;
