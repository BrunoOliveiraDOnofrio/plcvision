INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Sítio de Cunha', 7, 'Novaes', 'AL', 'Bonfim', 'Bloco 2');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Volkswagen do Brasil Indústria de Veículos Ltda', 'Farmacêutico', '67.493.805/0001-95', 5, 1, 'token_empresa_1');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(1, 1, '2024-08-22 16:42:55', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica Castro', 1, 5, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Armazenamento', 1, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-200 SMART', 2024, 1, 1, 'Linux', '2GB', '3e:a1:c7:d2:de:58', 'PLC_Armazenamento_8');
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
(9, 1, 2768805512.99, 3244864382.44, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 1, 48.73, 53.45, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-200 SMART', 2018, 1, 1, 'Windows CE', '8GB', 'bc:e7:26:9a:32:75', 'PLC_Armazenamento_9');
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
(7, 2, 33.55, 45.59, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 2, 1190.38, 1362.68, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('LOGO!', 2021, 1, 1, 'Linux', '8GB', 'b4:1a:34:64:1e:b7', 'PLC_Armazenamento_1');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2022, 1, 1, 'Linux', '8GB', '8e:28:d3:4b:42:79', 'PLC_Armazenamento_15');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 T', 2018, 1, 1, 'Windows CE', '4GB', 'aa:a2:24:75:2b:b3', 'PLC_Armazenamento_15');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200 F', 2020, 1, 1, 'Linux', '4GB', '44:4c:4d:e1:2a:5c', 'PLC_Armazenamento_14');
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
(8, 6, 1190.38, 1362.68, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 6, 48.73, 53.45, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 R/H', 2023, 1, 1, 'VxWorks', '4GB', '54:9a:fe:9e:49:54', 'PLC_Armazenamento_11');
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
(6, 7, 3006428475.37, 3463255523.6, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 7, 2768805512.99, 3244864382.44, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-400H', 2024, 1, 1, 'Windows CE', '8GB', '1c:48:26:84:3e:82', 'PLC_Armazenamento_3');
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
(6, 8, 3006428475.37, 3463255523.6, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2022, 1, 1, 'Windows CE', '2GB', '62:2d:b1:f1:d6:98', 'PLC_Armazenamento_4');
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
(8, 9, 1190.38, 1362.68, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2021, 1, 1, 'VxWorks', '8GB', '3e:50:5c:3c:f9:41', 'PLC_Armazenamento_7');
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
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Laboratório', 1, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 PN', 2018, 1, 2, 'Windows CE', '8GB', '8a:7c:ff:97:c5:1b', 'PLC_Laboratório_8');
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
('S7-1500 PN', 2023, 1, 2, 'Windows CE', '4GB', 'ee:0a:6e:ed:31:e8', 'PLC_Laboratório_13');
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
(6, 12, 3006428475.37, 3463255523.6, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 R/H', 2023, 1, 2, 'Linux', '2GB', '62:9f:fa:b4:92:b1', 'PLC_Laboratório_5');
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
('S7-1500 R/H', 2020, 1, 2, 'VxWorks', '4GB', 'a8:39:0c:04:22:a5', 'PLC_Laboratório_11');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 R/H', 2020, 1, 2, 'VxWorks', '8GB', 'ae:70:3a:6c:77:73', 'PLC_Laboratório_9');
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
(9, 15, 2768805512.99, 3244864382.44, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 15, 48.73, 53.45, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 PN', 2024, 1, 2, 'VxWorks', '8GB', '56:93:fb:d0:4e:9a', 'PLC_Laboratório_2');
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
(10, 16, 48.73, 53.45, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 T', 2023, 1, 2, 'Windows CE', '2GB', '68:27:11:d4:00:ab', 'PLC_Laboratório_1');
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
(10, 17, 48.73, 53.45, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 T', 2023, 1, 2, 'Linux', '8GB', '70:50:56:bd:a4:6c', 'PLC_Laboratório_9');
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
(1, 18, 68.29, 72.84, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200', 2021, 1, 2, 'Linux', '8GB', '64:dd:43:13:82:07', 'PLC_Laboratório_14');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 PN', 2023, 1, 2, 'Linux', '8GB', '88:71:18:51:93:2c', 'PLC_Laboratório_1');
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
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 20, 68.29, 72.84, 1);
INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Favela Pires', 23, 'Azevedo de Martins', 'PR', 'Vila São Dimas', 'Bloco 2');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Lenovo Tecnologia Ltda', 'Farmacêutico', '70.251.893/0001-23', 6, 1, 'token_empresa_2');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(2, 1, '2025-04-22 09:09:41', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica Vieira', 2, 6, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Caldeiraria', 2, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2018, 2, 3, 'Windows CE', '4GB', '82:5d:e5:0f:6c:9f', 'PLC_Caldeiraria_11');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200 F', 2020, 2, 3, 'Linux', '8GB', 'c0:17:05:55:46:9c', 'PLC_Caldeiraria_13');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-200 SMART', 2020, 2, 3, 'VxWorks', '8GB', 'c8:d2:91:76:72:7c', 'PLC_Caldeiraria_13');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('LOGO!', 2023, 2, 3, 'Linux', '2GB', '84:be:39:ce:b2:31', 'PLC_Caldeiraria_8');
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
('S7-1200 F', 2024, 2, 3, 'Windows CE', '8GB', '8e:aa:15:88:08:ba', 'PLC_Caldeiraria_13');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('ET 200SP', 2018, 2, 3, 'Windows CE', '2GB', '9c:e9:4a:5e:f0:9d', 'PLC_Caldeiraria_5');
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
(10, 26, 48.73, 53.45, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 26, 3006428475.37, 3463255523.6, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-200 SMART', 2018, 2, 3, 'Windows CE', '8GB', '6c:71:0a:63:59:aa', 'PLC_Caldeiraria_10');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 R/H', 2023, 2, 3, 'VxWorks', '4GB', 'ea:2b:f8:64:10:0e', 'PLC_Caldeiraria_15');
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
('S7-1500 R/H', 2022, 2, 3, 'Windows CE', '8GB', 'aa:6a:0b:12:ae:3a', 'PLC_Caldeiraria_4');
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
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 29, 68.29, 72.84, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200 F', 2021, 2, 3, 'Windows CE', '8GB', '5a:3e:77:d6:14:f6', 'PLC_Caldeiraria_1');
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
('Embalagem', 2, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200', 2020, 2, 4, 'Windows CE', '8GB', '1c:b0:21:9b:58:66', 'PLC_Embalagem_5');
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
('LOGO!', 2021, 2, 4, 'VxWorks', '2GB', 'b6:4a:4f:e6:d7:17', 'PLC_Embalagem_13');
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
(1, 32, 68.29, 72.84, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200', 2021, 2, 4, 'VxWorks', '2GB', 'f6:05:a6:87:77:91', 'PLC_Embalagem_5');
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
(1, 33, 68.29, 72.84, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 33, 48.73, 53.45, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('LOGO!', 2022, 2, 4, 'Linux', '8GB', '2e:6d:fb:73:3b:09', 'PLC_Embalagem_6');
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
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 34, 1190.38, 1362.68, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500 PN', 2022, 2, 4, 'VxWorks', '4GB', '40:8b:ec:30:fd:d5', 'PLC_Embalagem_2');
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
(7, 35, 33.55, 45.59, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200', 2022, 2, 4, 'Linux', '8GB', '16:51:de:6d:56:f7', 'PLC_Embalagem_1');
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
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 36, 2768805512.99, 3244864382.44, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-400H', 2020, 2, 4, 'Linux', '8GB', '40:7f:00:e3:dd:72', 'PLC_Embalagem_4');
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
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 37, 48.73, 53.45, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('LOGO!', 2022, 2, 4, 'Windows CE', '2GB', '76:47:6e:a4:a5:53', 'PLC_Embalagem_7');
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
(1, 38, 68.29, 72.84, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 38, 1190.38, 1362.68, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1200 F', 2021, 2, 4, 'Windows CE', '4GB', 'da:78:17:2c:c5:e6', 'PLC_Embalagem_13');
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
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('S7-1500', 2020, 2, 4, 'Linux', '8GB', '58:92:2c:76:af:50', 'PLC_Embalagem_15');
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
