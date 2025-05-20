INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Estrada Calebe Castro', 935, 'Santos Verde', 'MG', 'Nova Esperança', 'Bloco 1');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Rios', 'Têxtil', '46.901.578/0001-10', 5, 1, 'token_empresa_3');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(3, 1, '2023-10-17 04:30:16', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica Andrade', 3, 5, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Aliquid', 3, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2019, 3, 3, 'Windows CE', '2GB', 'da:69:df:6c:12:3a', 'plc-reprehenderit-04');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 4, 72.49, 74.41, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 4, 72.42, 83.08, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 4, 24605.64, 30687.03, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 4, 48.73, 53.45, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2021, 3, 3, 'Linux', '2GB', '20:35:ee:0a:59:67', 'plc-nisi-05');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 5, 72.49, 74.41, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 5, 72.42, 83.08, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 5, 33.55, 45.59, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2018, 3, 3, 'VxWorks', '2GB', 'ac:00:c0:91:5f:e0', 'plc-consectetur-06');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 6, 72.49, 74.41, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 6, 72.42, 83.08, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 6, 3589.77, 28083.92, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 6, 2768805512.99, 3244864382.44, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2020, 3, 3, 'Windows CE', '2GB', 'f2:b8:78:e1:74:c9', 'plc-ratione-07');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 7, 72.49, 74.41, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 7, 72.42, 83.08, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2020, 3, 3, 'Linux', '4GB', 'e6:8a:b4:8e:5d:0b', 'plc-rem-08');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 8, 72.49, 74.41, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 8, 72.42, 83.08, 3);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Minus', 3, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2023, 3, 4, 'Windows CE', '2GB', 'ae:28:c2:e4:cb:72', 'plc-deleniti-09');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 9, 72.49, 74.41, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 9, 72.42, 83.08, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 9, 48.73, 53.45, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2021, 3, 4, 'VxWorks', '2GB', 'e4:3b:a2:42:38:28', 'plc-dolores-10');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 10, 72.49, 74.41, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 10, 72.42, 83.08, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 10, 3006428475.37, 3463255523.6, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 10, 2768805512.99, 3244864382.44, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2020, 3, 4, 'VxWorks', '8GB', '90:94:1e:29:e4:82', 'plc-temporibus-11');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 11, 72.49, 74.41, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 11, 72.42, 83.08, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2021, 3, 4, 'Windows CE', '4GB', '32:ae:c8:66:1a:17', 'plc-omnis-12');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 12, 72.49, 74.41, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 12, 72.42, 83.08, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2020, 3, 4, 'VxWorks', '8GB', '78:5b:eb:89:b0:0a', 'plc-nam-13');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 13, 72.49, 74.41, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 13, 72.42, 83.08, 3);
INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Estrada Benício Dias', 6, 'Borges', 'RO', 'Piraja', 'Bloco 3');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Pinto', 'Alimentos', '40.975.621/0001-05', 6, 1, 'token_empresa_4');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(4, 1, '2023-09-17 17:26:33', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica da Luz da Prata', 4, 6, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Quasi', 4, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2020, 4, 5, 'Windows CE', '8GB', '68:6c:2d:6f:da:f0', 'plc-impedit-14');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 14, 72.49, 74.41, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 14, 72.42, 83.08, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2023, 4, 5, 'Linux', '4GB', 'c6:b2:e8:16:9a:d7', 'plc-culpa-15');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 15, 72.49, 74.41, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 15, 72.42, 83.08, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 15, 48.73, 53.45, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2023, 4, 5, 'VxWorks', '8GB', '04:dc:ee:46:89:21', 'plc-molestias-16');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 16, 72.49, 74.41, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 16, 72.42, 83.08, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 16, 24605.64, 30687.03, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2020, 4, 5, 'Linux', '4GB', '7a:4d:bc:7c:f4:f1', 'plc-eius-17');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 17, 72.49, 74.41, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 17, 72.42, 83.08, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2018, 4, 5, 'VxWorks', '8GB', '28:5f:53:f4:a3:3b', 'plc-sequi-18');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 18, 72.49, 74.41, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 18, 72.42, 83.08, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 18, 2768805512.99, 3244864382.44, 4);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Aut', 4, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2020, 4, 6, 'VxWorks', '2GB', 'a2:e9:b9:67:26:54', 'plc-quod-19');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 19, 72.49, 74.41, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 19, 72.42, 83.08, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2019, 4, 6, 'VxWorks', '4GB', 'e8:17:9d:28:63:11', 'plc-voluptate-20');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 20, 72.49, 74.41, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 20, 72.42, 83.08, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2019, 4, 6, 'VxWorks', '4GB', '38:cc:15:8b:90:5c', 'plc-cupiditate-21');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 21, 72.49, 74.41, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 21, 72.42, 83.08, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2023, 4, 6, 'Linux', '2GB', '24:a5:20:71:58:20', 'plc-fugit-22');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 22, 72.49, 74.41, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 22, 72.42, 83.08, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 22, 48.73, 53.45, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 22, 3589.77, 28083.92, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2019, 4, 6, 'VxWorks', '2GB', '34:21:c6:a7:bc:9f', 'plc-adipisci-23');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 23, 72.49, 74.41, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 23, 72.42, 83.08, 4);
INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Viela Mariah Santos', 83, 'Azevedo', 'AL', 'Bernadete', 'Bloco 3');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('da Conceição', 'Farmacêutico', '09.873.624/0001-98', 7, 1, 'token_empresa_5');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(5, 1, '2024-05-17 04:21:15', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica Nunes de Gomes', 5, 7, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Minus', 5, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2021, 5, 7, 'Linux', '2GB', 'f8:17:9a:ca:17:3f', 'plc-similique-24');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 24, 72.49, 74.41, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 24, 72.42, 83.08, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 24, 3006428475.37, 3463255523.6, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 24, 68.29, 72.84, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2023, 5, 7, 'VxWorks', '4GB', '58:e6:fc:b6:bf:dd', 'plc-nemo-25');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 25, 72.49, 74.41, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 25, 72.42, 83.08, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 25, 3006428475.37, 3463255523.6, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2019, 5, 7, 'Linux', '2GB', 'f8:11:28:e0:eb:6b', 'plc-provident-26');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 26, 72.49, 74.41, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 26, 72.42, 83.08, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2024, 5, 7, 'VxWorks', '8GB', '98:02:43:4d:9d:d6', 'plc-eius-27');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 27, 72.49, 74.41, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 27, 72.42, 83.08, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 27, 1190.38, 1362.68, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 27, 68.29, 72.84, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2020, 5, 7, 'VxWorks', '2GB', '48:5b:4f:9b:79:47', 'plc-molestias-28');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 28, 72.49, 74.41, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 28, 72.42, 83.08, 5);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Sint', 5, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2018, 5, 8, 'VxWorks', '2GB', '3e:b6:67:8e:82:4d', 'plc-porro-29');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 29, 72.49, 74.41, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 29, 72.42, 83.08, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2019, 5, 8, 'Linux', '2GB', '7e:db:d1:d2:3a:7c', 'plc-ullam-30');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 30, 72.49, 74.41, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 30, 72.42, 83.08, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 30, 1190.38, 1362.68, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2018, 5, 8, 'Windows CE', '8GB', '7c:7f:6e:53:a2:0b', 'plc-quia-31');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 31, 72.49, 74.41, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 31, 72.42, 83.08, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 31, 48.73, 53.45, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2021, 5, 8, 'Linux', '8GB', 'c4:c7:d2:b4:cf:5a', 'plc-molestiae-32');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 32, 72.49, 74.41, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 32, 72.42, 83.08, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 32, 68.29, 72.84, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2023, 5, 8, 'Linux', '2GB', '6c:f7:3d:23:36:64', 'plc-mollitia-33');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 33, 72.49, 74.41, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 33, 72.42, 83.08, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 33, 1190.38, 1362.68, 5);
INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Feira Leão', 86, 'Cassiano', 'PA', 'Nova Pampulha', 'Bloco 1');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('das Neves', 'Alimentos', '45.620.873/0001-35', 8, 1, 'token_empresa_6');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(6, 1, '2023-06-09 12:15:27', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica Dias', 6, 8, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Numquam', 6, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2023, 6, 9, 'Windows CE', '2GB', 'ee:ff:52:55:17:3b', 'plc-eos-34');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 34, 72.49, 74.41, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 34, 72.42, 83.08, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 34, 3589.77, 28083.92, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 34, 1190.38, 1362.68, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2023, 6, 9, 'Windows CE', '4GB', 'e2:5c:14:b6:12:10', 'plc-delectus-35');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 35, 72.49, 74.41, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 35, 72.42, 83.08, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 35, 24605.64, 30687.03, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2024, 6, 9, 'Windows CE', '2GB', '4a:7f:6e:b5:b7:43', 'plc-quam-36');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 36, 72.49, 74.41, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 36, 72.42, 83.08, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2024, 6, 9, 'VxWorks', '4GB', 'aa:8e:23:c6:fa:6b', 'plc-fuga-37');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 37, 72.49, 74.41, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 37, 72.42, 83.08, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2024, 6, 9, 'VxWorks', '2GB', '1a:2e:81:26:94:fe', 'plc-et-38');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 38, 72.49, 74.41, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 38, 72.42, 83.08, 6);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Hic', 6, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2019, 6, 10, 'VxWorks', '4GB', 'c4:20:dc:4a:e2:0c', 'plc-sapiente-39');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 39, 72.49, 74.41, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 39, 72.42, 83.08, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2021, 6, 10, 'VxWorks', '2GB', '5e:96:12:94:e4:a3', 'plc-sunt-40');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 40, 72.49, 74.41, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 40, 72.42, 83.08, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 40, 3006428475.37, 3463255523.6, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 40, 68.29, 72.84, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2019, 6, 10, 'Windows CE', '8GB', 'd2:22:ff:7f:e7:ed', 'plc-voluptatem-41');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 41, 72.49, 74.41, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 41, 72.42, 83.08, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 41, 3006428475.37, 3463255523.6, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 41, 68.29, 72.84, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2022, 6, 10, 'Linux', '2GB', '6a:eb:45:fc:6f:e0', 'plc-aliquam-42');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 42, 72.49, 74.41, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 42, 72.42, 83.08, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2019, 6, 10, 'Windows CE', '4GB', 'a0:ad:77:fd:6b:bf', 'plc-voluptate-43');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 43, 72.49, 74.41, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 43, 72.42, 83.08, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 43, 3589.77, 28083.92, 6);
