INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Residencial de Cavalcanti', 22, 'Guerra', 'AC', 'Leonina', 'Bloco 1');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Volkswagen do Brasil Indústria de Veículos Ltda', 'Farmacêutico', '37.491.826/0001-00', 5, 1, 'token_empresa_1');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(1, 1, '2023-12-06 04:41:22', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica Araújo da Prata', 1, 5, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Ferramentaria', 1, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Siemens s7-1500', 2021, 1, 1, 'Linux', '8GB', 'd0:12:ad:2c:c5:29', 'PLC_Ferramentaria_5', 'Siemens - 001');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 1, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 1, 72.42, 83.08, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Schneider M340', 2021, 1, 1, 'Windows CE', '8GB', 'c4:75:af:2c:ba:cc', 'PLC_Ferramentaria_3', 'Schneider - 777');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 2, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 2, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 2, 48.73, 53.45, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 2, 33.55, 45.59, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Schneider M340', 2022, 1, 1, 'VxWorks', '8GB', 'c2:36:40:04:9c:09', 'PLC_Ferramentaria_3', 'Schneider - 777');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 3, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 3, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 3, 33.55, 45.59, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Siemens s7-1500', 2023, 1, 1, 'VxWorks', '8GB', 'e2:6b:29:26:af:63', 'PLC_Ferramentaria_9', 'Siemens - 001');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 4, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 4, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 4, 3006428475.37, 3463255523.6, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Siemens XRL8', 2022, 1, 1, 'Windows CE', '2GB', '4a:d8:e1:e2:e2:57', 'PLC_Ferramentaria_9', 'Siemens - 013');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 5, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 5, 72.42, 83.08, 1);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Prensagem', 1, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Schneider M340', 2023, 1, 2, 'Windows CE', '4GB', '64:11:29:26:7c:48', 'PLC_Prensagem_3', 'Schneider - 777');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 6, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 6, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 6, 33.55, 45.59, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Siemens s7-1500', 2023, 1, 2, 'Linux', '8GB', 'c6:ae:f1:ba:b0:61', 'PLC_Prensagem_13', 'Siemens - 001');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 7, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 7, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 7, 2768805512.99, 3244864382.44, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 7, 3006428475.37, 3463255523.6, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Siemens s7-1500', 2023, 1, 2, 'VxWorks', '8GB', 'f6:fe:3f:29:0a:2b', 'PLC_Prensagem_7', 'Siemens - 001');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 8, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 8, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 8, 68.29, 72.84, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Siemens s7-1500', 2021, 1, 2, 'VxWorks', '4GB', 'd4:d2:d2:38:c5:7f', 'PLC_Prensagem_13', 'Siemens - 001');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 9, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 9, 72.42, 83.08, 1);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Siemens s7-1500', 2021, 1, 2, 'VxWorks', '4GB', 'fc:f2:be:e4:09:c6', 'PLC_Prensagem_5', 'Siemens - 001');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 10, 72.49, 74.41, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 10, 72.42, 83.08, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 10, 2768805512.99, 3244864382.44, 1);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 10, 3006428475.37, 3463255523.6, 1);
INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Via de Novais', 5, 'Vieira', 'RJ', 'Castelo', 'Bloco 3');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Lenovo Tecnologia Ltda', 'Farmacêutico', '04.619.328/0001-41', 6, 1, 'token_empresa_2');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(2, 1, '2023-08-01 02:37:04', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica da Conceição das Pedras', 2, 6, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Prensagem', 2, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Siemens XRL8', 2023, 2, 3, 'Windows CE', '4GB', '08:5f:db:57:37:1d', 'PLC_Prensagem_2', 'Siemens - 013');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 11, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 11, 72.42, 83.08, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Siemens s7-1500', 2022, 2, 3, 'Linux', '2GB', 'c6:9f:0b:7e:37:93', 'PLC_Prensagem_7', 'Siemens - 001');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 12, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 12, 72.42, 83.08, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Schneider M340', 2022, 2, 3, 'Linux', '8GB', '42:f4:7e:0f:fb:b3', 'PLC_Prensagem_10', 'Schneider - 777');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 13, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 13, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 13, 2768805512.99, 3244864382.44, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 13, 3589.77, 28083.92, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Siemens XRL8', 2020, 2, 3, 'Windows CE', '8GB', 'b8:c9:8d:84:65:79', 'PLC_Prensagem_8', 'Siemens - 013');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 14, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 14, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 14, 33.55, 45.59, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Siemens XRL8', 2020, 2, 3, 'Linux', '2GB', '6c:ad:6f:f9:f0:05', 'PLC_Prensagem_3', 'Siemens - 013');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 15, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 15, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 15, 33.55, 45.59, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Manutenção', 2, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Schneider M340', 2018, 2, 4, 'Windows CE', '4GB', 'a8:a8:21:bf:50:42', 'PLC_Manutenção_13', 'Schneider - 777');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 16, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 16, 72.42, 83.08, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Schneider M340', 2022, 2, 4, 'Windows CE', '4GB', '02:fe:b5:cc:9e:c9', 'PLC_Manutenção_4', 'Schneider - 777');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 17, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 17, 72.42, 83.08, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Siemens XRL8', 2019, 2, 4, 'Linux', '4GB', 'bc:4e:dc:d0:e2:dd', 'PLC_Manutenção_14', 'Siemens - 013');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 18, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 18, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 18, 33.55, 45.59, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 18, 3006428475.37, 3463255523.6, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Siemens XRL8', 2021, 2, 4, 'Linux', '8GB', '14:80:61:b7:1b:67', 'PLC_Manutenção_6', 'Siemens - 013');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 19, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 19, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 19, 1190.38, 1362.68, 2);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname, lote) VALUES
('Schneider M340', 2024, 2, 4, 'Windows CE', '4GB', '40:23:ab:55:46:48', 'PLC_Manutenção_3', 'Schneider - 777');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 20, 72.49, 74.41, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 20, 72.42, 83.08, 2);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 20, 1190.38, 1362.68, 2);
