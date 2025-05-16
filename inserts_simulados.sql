INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Largo Costela', 86, 'Siqueira', 'PE', 'Serra', 'Bloco 3');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Sá', 'Alimentos', '18.029.674/0001-84', 5, 1, 'token_empresa_3');
select * from plc;



INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(3, 1, '2025-01-09 04:55:45', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica Costa de Abreu', 3, 5, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Accusantium', 3, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2021, 3, 3, 'Linux', '4GB', '72:cc:8b:fb:a4:b6', 'plc-tenetur-04');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 4, 3693.58, 3822.42, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 4, 3644.73, 3859.09, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2018, 3, 3, 'Windows CE', '4GB', 'de:9d:cb:a4:5b:fe', 'plc-maiores-05');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(3, 5, 4088.65, 4132.11, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 5, 2463.5, 2527.22, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 5, 6604.86, 6701.13, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 5, 4462.55, 4692.73, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2022, 3, 3, 'Windows CE', '8GB', 'f4:1c:d6:e5:3e:41', 'plc-illo-06');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 6, 7072.68, 7186.05, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(3, 6, 2182.46, 2298.19, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(4, 6, 291.37, 684.36, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2024, 3, 3, 'Linux', '4GB', '7c:d3:8b:3e:a2:88', 'plc-dolor-07');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 7, 1200.49, 1385.0, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(3, 7, 2032.66, 2145.47, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 7, 3575.92, 3825.09, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 7, 366.39, 509.56, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2023, 3, 3, 'Windows CE', '8GB', 'f8:27:d9:05:ac:1b', 'plc-quod-08');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 8, 6019.36, 6477.65, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 8, 122.9, 356.19, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 8, 7129.13, 7429.98, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 8, 2037.04, 2257.55, 3);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Ut', 3, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2018, 3, 4, 'Windows CE', '2GB', '84:19:13:7b:fa:39', 'plc-hic-09');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(4, 9, 6530.31, 6616.03, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 9, 3298.97, 3550.53, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 9, 1748.8, 1779.26, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(3, 9, 2571.77, 3032.71, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2024, 3, 4, 'VxWorks', '8GB', '9c:46:70:d0:61:26', 'plc-soluta-10');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(4, 10, 4322.43, 4637.52, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 10, 1361.66, 1597.22, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2018, 3, 4, 'Windows CE', '8GB', '52:2d:b0:91:bc:80', 'plc-eveniet-11');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 11, 4044.07, 4528.08, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 11, 3242.72, 3683.78, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2020, 3, 4, 'VxWorks', '4GB', 'd6:75:b3:79:33:b7', 'plc-vel-12');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 12, 7448.59, 7759.31, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 12, 3692.94, 4136.33, 3);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2021, 3, 4, 'Windows CE', '8GB', '62:27:19:bd:d2:89', 'plc-vel-13');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(3, 13, 4325.2, 4344.58, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 13, 4222.48, 4442.52, 3);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(4, 13, 7970.15, 8135.66, 3);
INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Viela da Cunha', 938, 'Sá', 'PE', 'Betânia', 'Bloco 2');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Azevedo', 'Farmacêutico', '42.695.173/0001-11', 6, 1, 'token_empresa_4');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(4, 1, '2024-03-17 21:15:57', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica Cardoso de Minas', 4, 6, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Vero', 4, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2018, 4, 5, 'Windows CE', '2GB', 'd2:bf:96:d4:0f:0a', 'plc-temporibus-14');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(4, 14, 1150.82, 1585.77, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 14, 1179.13, 1434.53, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(4, 14, 5792.45, 6187.51, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 14, 2437.67, 2766.53, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2024, 4, 5, 'VxWorks', '8GB', '14:d8:6b:ef:9c:9e', 'plc-maxime-15');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 15, 117.04, 591.97, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 15, 7146.84, 7425.96, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 15, 3617.82, 3891.13, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2023, 4, 5, 'Windows CE', '4GB', 'cc:15:1a:56:19:3f', 'plc-ratione-16');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 16, 1171.43, 1495.6, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(3, 16, 4792.1, 4877.41, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2023, 4, 5, 'Linux', '2GB', '5a:03:46:27:6d:27', 'plc-adipisci-17');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 17, 5098.1, 5207.34, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(4, 17, 5775.45, 5928.42, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 17, 7868.5, 8027.9, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 17, 2745.91, 3146.24, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2018, 4, 5, 'VxWorks', '2GB', 'e2:9f:f2:7e:36:c7', 'plc-deserunt-18');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 18, 2111.7, 2295.44, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(4, 18, 5886.43, 6308.75, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(3, 18, 5950.34, 6285.9, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 18, 1115.59, 1480.59, 4);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Sunt', 4, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2021, 4, 6, 'VxWorks', '2GB', '9c:44:db:26:ff:aa', 'plc-velit-19');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 19, 6371.76, 6408.4, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 19, 6548.31, 6778.22, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 19, 7313.29, 7772.11, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 19, 730.59, 911.08, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2019, 4, 6, 'VxWorks', '4GB', 'd6:ee:e5:0e:1d:be', 'plc-porro-20');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 20, 6464.99, 6919.81, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 20, 2469.47, 2496.9, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 20, 849.67, 895.02, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 20, 2826.96, 3045.09, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2019, 4, 6, 'Linux', '8GB', '8c:25:68:56:87:28', 'plc-omnis-21');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 21, 2994.23, 3491.79, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 21, 1230.26, 1284.99, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 21, 3677.88, 4083.04, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 21, 2871.7, 3032.4, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2019, 4, 6, 'Windows CE', '8GB', '26:ce:06:79:d1:f8', 'plc-ut-22');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 22, 7294.98, 7426.94, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 22, 3358.64, 3569.56, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 22, 4821.45, 5019.9, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 22, 2887.21, 2968.04, 4);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2019, 4, 6, 'Linux', '4GB', 'ea:47:ad:e6:2f:2b', 'plc-molestiae-23');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 23, 1575.53, 1924.7, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 23, 4553.13, 4800.22, 4);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 23, 2250.43, 2590.22, 4);
INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Estação Moreira', 318, 'Câmara', 'MG', 'São Salvador', 'Bloco 1');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Barbosa', 'Têxtil', '70.629.485/0001-62', 7, 1, 'token_empresa_5');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(5, 1, '2024-03-15 13:45:11', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica Fernandes', 5, 7, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Molestias', 5, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2022, 5, 7, 'VxWorks', '4GB', 'be:e3:86:f7:45:71', 'plc-est-24');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 24, 1879.12, 2067.73, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 24, 348.93, 461.26, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2022, 5, 7, 'Windows CE', '4GB', 'ac:80:f3:01:f3:ee', 'plc-quia-25');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 25, 1166.99, 1364.73, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 25, 3987.07, 4373.06, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 25, 3172.93, 3579.27, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(4, 25, 6760.88, 6993.31, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2020, 5, 7, 'Windows CE', '2GB', '94:72:fc:15:91:0f', 'plc-iusto-26');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 26, 3895.12, 4035.01, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 26, 5186.29, 5216.61, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2021, 5, 7, 'Linux', '2GB', 'd8:5f:43:b6:3c:88', 'plc-facere-27');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 27, 110.64, 426.28, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 27, 6388.48, 6579.28, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 27, 4515.93, 4627.98, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2021, 5, 7, 'VxWorks', '2GB', '40:ce:cf:c7:18:2f', 'plc-rerum-28');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 28, 1226.89, 1507.56, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 28, 5588.21, 5675.77, 5);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Voluptates', 5, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2024, 5, 8, 'Linux', '4GB', 'f0:85:6c:01:35:c6', 'plc-esse-29');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 29, 4950.27, 4969.09, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 29, 3887.44, 3934.06, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2023, 5, 8, 'Windows CE', '4GB', 'ca:d8:1f:49:6d:36', 'plc-provident-30');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 30, 2276.15, 2605.42, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 30, 683.32, 1128.18, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2022, 5, 8, 'Windows CE', '4GB', '52:ce:ff:c8:f2:0e', 'plc-fuga-31');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 31, 1130.37, 1453.45, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 31, 5197.43, 5399.58, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 31, 1595.03, 1912.97, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2020, 5, 8, 'VxWorks', '4GB', '56:5e:0b:c8:73:e7', 'plc-cupiditate-32');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(4, 32, 5813.69, 6056.13, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(3, 32, 2929.8, 2944.59, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2020, 5, 8, 'Linux', '4GB', '4e:10:56:10:5b:a3', 'plc-voluptates-33');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 33, 3361.27, 3496.19, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(7, 33, 88.18, 262.72, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(3, 33, 4192.34, 4457.55, 5);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(3, 33, 6053.72, 6342.63, 5);
INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Loteamento Agatha Pimenta', 48, 'da Paz', 'CE', 'Parque São Pedro', 'Bloco 2');
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica, token) VALUES
('Sampaio', 'Alimentos', '82.740.165/0001-64', 8, 1, 'token_empresa_6');

INSERT INTO parceria (empresa_consumidor_id, empresa_fabricante_id, dataParceria, qtdPlc) VALUES
(6, 1, '2024-05-07 14:10:35', 10);

INSERT INTO fabrica_consumidor (nome, empresa_consumidor_id, endereco_id, qtdSetor) VALUES
('Fábrica Cunha da Mata', 6, 8, 2);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Laborum', 6, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2021, 6, 9, 'Linux', '2GB', '34:d6:b9:00:d6:0f', 'plc-nisi-34');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 34, 876.39, 1333.87, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 34, 969.27, 1361.68, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(4, 34, 6319.85, 6727.72, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2024, 6, 9, 'VxWorks', '4GB', '86:83:85:40:e4:04', 'plc-numquam-35');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 35, 2848.81, 3240.42, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 35, 4566.0, 4705.63, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 35, 4582.37, 4935.33, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(10, 35, 7366.2, 7683.81, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2022, 6, 9, 'VxWorks', '2GB', '62:d0:b9:e1:67:f9', 'plc-facilis-36');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(11, 36, 2004.11, 2076.56, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 36, 3485.14, 3920.03, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 36, 3697.43, 3772.57, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2023, 6, 9, 'Linux', '8GB', 'ae:a3:d9:b4:7e:2e', 'plc-laborum-37');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 37, 6662.4, 6753.91, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 37, 3291.67, 3706.79, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 37, 3983.82, 4149.93, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2024, 6, 9, 'Windows CE', '8GB', 'cc:db:3b:de:98:c3', 'plc-eaque-38');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(3, 38, 5081.54, 5158.78, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(3, 38, 3155.36, 3258.57, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(4, 38, 2199.68, 2477.47, 6);
INSERT INTO setor_fabrica (nome, fabrica_consumidor_id, qtdPlc) VALUES
('Setor Deserunt', 6, 5);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2021, 6, 10, 'VxWorks', '2GB', 'e2:49:5f:bd:2f:61', 'plc-ut-39');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 39, 4160.88, 4333.38, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 39, 7795.31, 8192.43, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2021, 6, 10, 'Windows CE', '2GB', '20:ef:69:c2:00:82', 'plc-cupiditate-40');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(2, 40, 6443.77, 6669.51, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 40, 5127.73, 5138.56, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 40, 366.34, 667.44, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens XRL8', 2024, 6, 10, 'Windows CE', '2GB', '22:90:67:81:f3:60', 'plc-amet-41');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(6, 41, 3487.14, 3958.89, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 41, 6219.47, 6672.49, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens s7-1500', 2019, 6, 10, 'Windows CE', '4GB', '50:09:b2:7a:b0:18', 'plc-vel-42');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(9, 42, 7874.17, 7882.34, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(12, 42, 5492.03, 5615.49, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(8, 42, 7949.49, 8281.82, 6);
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Schneider M340', 2024, 6, 10, 'Linux', '4GB', 'd4:ff:99:f0:10:57', 'plc-eius-43');
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 43, 1743.35, 2198.18, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(5, 43, 6133.28, 6160.8, 6);
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, fabrica_consumidor_id) VALUES
(1, 43, 218.21, 564.85, 6);
