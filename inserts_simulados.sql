INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Parque de Nogueira', 79, 'Duarte de Goiás', 'RS', 'Aeroporto', 'Bloco 1');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Volkswagen do Brasil Indústria de Veículos Ltda', 'Alimentos', '27.061.594/0001-05', 5, 1, 'token_empresa_1');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(1, 1, '2023-06-02 12:06:38', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica Rios', 1, 5, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Tratamento Térmico', 1, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 T', 2024, 1, 1, 'Linux', '8GB', '50:ed:e9:ae:88:dd', 'PLC_Tratamento Térmico_13');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-200 SMART', 2018, 1, 1, 'Linux', '2GB', '3c:de:06:b8:ef:5e', 'PLC_Tratamento Térmico_14');
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
(10, 2, 48.73, 53.45, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200', 2019, 1, 1, 'Windows CE', '2GB', 'd8:82:13:35:52:9f', 'PLC_Tratamento Térmico_6');
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
('S7-1200 F', 2022, 1, 1, 'Windows CE', '4GB', '54:6e:e5:ca:60:44', 'PLC_Tratamento Térmico_11');
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
(9, 4, 2768805512.99, 3244864382.44, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-400H', 2023, 1, 1, 'VxWorks', '8GB', 'ac:fb:d4:2c:b2:81', 'PLC_Tratamento Térmico_4');
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
(9, 5, 2768805512.99, 3244864382.44, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 5, 48.73, 53.45, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 R/H', 2024, 1, 1, 'Linux', '8GB', '64:ae:d4:4e:6a:26', 'PLC_Tratamento Térmico_13');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200', 2020, 1, 1, 'Windows CE', '8GB', '50:29:e6:70:71:99', 'PLC_Tratamento Térmico_7');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2018, 1, 1, 'Linux', '8GB', '7c:ad:4d:ee:c5:fc', 'PLC_Tratamento Térmico_4');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('LOGO!', 2018, 1, 1, 'Windows CE', '8GB', 'bc:c3:44:75:0b:b8', 'PLC_Tratamento Térmico_7');
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
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 9, 33.55, 45.59, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 9, 2768805512.99, 3244864382.44, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-400H', 2019, 1, 1, 'VxWorks', '4GB', '12:2f:2b:02:4a:76', 'PLC_Tratamento Térmico_7');
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
(8, 10, 1190.38, 1362.68, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 10, 3006428475.37, 3463255523.6, 1);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Expedição', 1, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 T', 2020, 1, 2, 'Windows CE', '8GB', 'ba:3e:72:45:19:71', 'PLC_Expedição_7');
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
(7, 11, 33.55, 45.59, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-200 SMART', 2021, 1, 2, 'Windows CE', '2GB', '7e:3d:02:6e:70:ab', 'PLC_Expedição_6');
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
(1, 12, 68.29, 72.84, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 12, 1190.38, 1362.68, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('LOGO!', 2021, 1, 2, 'VxWorks', '4GB', '34:9f:eb:0a:89:b8', 'PLC_Expedição_7');
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
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 13, 3006428475.37, 3463255523.6, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 13, 2768805512.99, 3244864382.44, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2018, 1, 2, 'Windows CE', '8GB', '14:5a:7f:ca:f7:05', 'PLC_Expedição_9');
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
(6, 14, 3006428475.37, 3463255523.6, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2018, 1, 2, 'Linux', '4GB', '5e:83:18:39:59:0f', 'PLC_Expedição_1');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-200 SMART', 2018, 1, 2, 'Windows CE', '8GB', '8c:69:47:fb:f0:33', 'PLC_Expedição_12');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 T', 2019, 1, 2, 'Linux', '2GB', '0e:43:22:2f:56:f8', 'PLC_Expedição_2');
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
(9, 17, 2768805512.99, 3244864382.44, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 17, 33.55, 45.59, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('LOGO!', 2022, 1, 2, 'Linux', '2GB', 'f8:3f:7d:25:35:69', 'PLC_Expedição_15');
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
(7, 18, 33.55, 45.59, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 18, 48.73, 53.45, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('ET 200SP', 2021, 1, 2, 'Windows CE', '4GB', 'b4:39:8d:b9:49:d5', 'PLC_Expedição_3');
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
(6, 19, 3006428475.37, 3463255523.6, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200 F', 2019, 1, 2, 'VxWorks', '4GB', '0c:ef:17:9f:9a:06', 'PLC_Expedição_1');
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
INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Vale de Pereira', 93, 'Gonçalves', 'GO', 'Conjunto Bonsucesso', 'Bloco 3');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Lenovo Tecnologia Ltda', 'Farmacêutico', '95.834.270/0001-04', 6, 1, 'token_empresa_2');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(2, 1, '2024-08-28 07:45:52', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica Leão do Galho', 2, 6, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Solda Robotizada', 2, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200 F', 2021, 2, 3, 'VxWorks', '4GB', '96:3a:16:6a:e4:c3', 'PLC_Solda Robotizada_9');
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
(6, 21, 3006428475.37, 3463255523.6, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 R/H', 2021, 2, 3, 'VxWorks', '4GB', 'e2:55:a3:bc:46:db', 'PLC_Solda Robotizada_3');
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
(1, 22, 68.29, 72.84, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 22, 1190.38, 1362.68, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200', 2021, 2, 3, 'VxWorks', '8GB', '48:1f:2d:e6:b9:43', 'PLC_Solda Robotizada_6');
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
(9, 23, 2768805512.99, 3244864382.44, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 R/H', 2022, 2, 3, 'Linux', '4GB', '8e:75:97:b9:9a:f4', 'PLC_Solda Robotizada_8');
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
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 24, 2768805512.99, 3244864382.44, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-200 SMART', 2022, 2, 3, 'VxWorks', '4GB', '08:4c:2d:03:7f:db', 'PLC_Solda Robotizada_2');
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
(1, 25, 68.29, 72.84, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 PN', 2018, 2, 3, 'Windows CE', '4GB', 'b6:69:00:2d:60:44', 'PLC_Solda Robotizada_15');
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
(1, 26, 68.29, 72.84, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 26, 48.73, 53.45, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2021, 2, 3, 'Windows CE', '4GB', '4c:22:26:d7:8b:48', 'PLC_Solda Robotizada_12');
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
(10, 27, 48.73, 53.45, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 27, 33.55, 45.59, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 PN', 2020, 2, 3, 'VxWorks', '8GB', 'c6:37:18:5e:af:96', 'PLC_Solda Robotizada_10');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('LOGO!', 2022, 2, 3, 'VxWorks', '4GB', '78:e9:40:fa:ad:62', 'PLC_Solda Robotizada_8');
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
('S7-1500', 2024, 2, 3, 'VxWorks', '2GB', 'ae:b8:6c:07:8c:41', 'PLC_Solda Robotizada_12');
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
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 30, 3006428475.37, 3463255523.6, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 30, 33.55, 45.59, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Refrigeração', 2, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2018, 2, 4, 'Windows CE', '8GB', '52:96:e4:e0:7a:f0', 'PLC_Refrigeração_9');
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
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 31, 68.29, 72.84, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 31, 2768805512.99, 3244864382.44, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200 F', 2020, 2, 4, 'VxWorks', '4GB', '44:f3:66:f6:3b:6a', 'PLC_Refrigeração_13');
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
(6, 32, 3006428475.37, 3463255523.6, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200 F', 2019, 2, 4, 'Linux', '4GB', '06:b9:55:73:36:e4', 'PLC_Refrigeração_2');
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
(6, 33, 3006428475.37, 3463255523.6, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 33, 1190.38, 1362.68, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200 F', 2018, 2, 4, 'Linux', '2GB', '5c:6f:f3:78:6b:e7', 'PLC_Refrigeração_14');
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
(7, 34, 33.55, 45.59, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 PN', 2023, 2, 4, 'VxWorks', '4GB', '4c:8f:5f:d7:1d:1e', 'PLC_Refrigeração_6');
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
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 35, 1190.38, 1362.68, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 35, 48.73, 53.45, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-200 SMART', 2020, 2, 4, 'VxWorks', '4GB', '20:ef:e5:c5:d3:5e', 'PLC_Refrigeração_13');
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
(10, 36, 48.73, 53.45, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2022, 2, 4, 'VxWorks', '2GB', 'ea:bc:53:3f:93:d4', 'PLC_Refrigeração_3');
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
('S7-1500 PN', 2023, 2, 4, 'Windows CE', '4GB', '62:2e:66:a0:22:17', 'PLC_Refrigeração_2');
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
(10, 38, 48.73, 53.45, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 PN', 2021, 2, 4, 'Windows CE', '8GB', 'da:b0:e5:19:2b:3b', 'PLC_Refrigeração_4');
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
(6, 39, 3006428475.37, 3463255523.6, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 39, 33.55, 45.59, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 R/H', 2024, 2, 4, 'Windows CE', '8GB', 'c4:84:e5:f0:6c:03', 'PLC_Refrigeração_5');
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
