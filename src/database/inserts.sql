-- Inserindo endereços
INSERT INTO endereco (logradouro, numLogradouro, cidade, estado, bairro, complemento) VALUES
('Avenida Paulista', 1000, 'São Paulo', 'SP', 'Bela Vista', 'Andar 5'),
('Rua XV de Novembro', 500, 'Curitiba', 'PR', 'Centro', 'Sala 12'),
('Avenida Brasil', 1200, 'Rio de Janeiro', 'RJ', 'Copacabana', 'Bloco A'),
('Rua dos Andradas', 300, 'Porto Alegre', 'RS', 'Centro Histórico', 'Loja 1');

-- Inserindo empresas fabricantes
INSERT INTO empresa_fabricante (cnpj, razao_social, endereco_id, qtdParcerias) VALUES
('12345678000199', 'Siemens do Brasil', 1, 2),
('98765432000188', 'Schneider Electric', 2, 3);

-- Inserindo usuários
INSERT INTO usuario (empresa_id, nome, email, telCelular, senha, nivel, setor, cargo) VALUES
(1, 'Carlos Silva', 'carlos.silva@siemens.com', '5511998765432', 'senha123', 2, 'Engenharia', 'Engenheiro de Automação'),
(2, 'Mariana Souza', 'mariana.souza@schneider.com', '5541998765432', 'senha456', 1, 'TI', 'Analista de Sistemas');

-- Inserindo empresas consumidoras
INSERT INTO empresa_consumidor (razao_social, segmento, cnpj, endereco_id, qtdFabrica) VALUES
('Volkswagen do Brasil', 'Automobilístico', '11223344000155', 3, 2),
('Nestlé Brasil', 'Alimentos', '22334455000166', 4, 1);

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

-- Inserindo PLCs
INSERT INTO plc (modelo, ano, parceria_id, setor_fabrica_id, sistema_operacional, capacidade_ram, endereco_mac, hostname) VALUES
('Siemens S7-1500', 2021, 1, 1, 'Windows CE', '2GB', '00:1A:2B:3C:4D:5E', 'plc-s7-1500-01'),
('Schneider M340', 2022, 2, 2, 'Linux', '4GB', '00:1B:2C:3D:4E:5F', 'plc-m340-01');

-- Inserindo componentes
INSERT INTO componente (hardware, tipo_dado, unidade_dado, coluna_captura, funcao_python) VALUES
('Temperatura do CPU', 'Float', '°C', 'temp_cpu', 'calcular_temp'),
('Consumo de Energia', 'Float', 'kW', 'energia_consumo', 'calcular_energia');

-- Inserindo configurações de PLC
INSERT INTO config_plc (componente_id, plc_id, limite_atencao, limite_critico, intervalo_captura) VALUES
(4, 1, 70.0, 90.0, 60),
(10, 1, 4000.0, 5000.0, 30),
(7,1, 70, 80, 20),
(11, 1, 4000000, 5000000, 20),
(14, 1, 70, 80, 30),
(12, 1, 8000000, 9000000, 20),
(6, 1, 12, 15, 20),
(8, 1, 9000, 8000, 20);


select * from componente;


INSERT INTO componente (hardware, tipo_dado, unidade_dado, coluna_captura,  funcao_python) VALUES
('CPU', 'Temperatura', '°C', 'cpu_temperatura','psutil.sensors_temperatures().get("coretemp", [])[0].current'),
('CPU', 'Uso', '%', 'cpu_percent', 'psutil.cpu_percent(interval=None, percpu=False)'),
('CPU', 'Atividade', 'dias', 'cpu_atividade_dias', 'int(psutil.boot_time() / (60 * 60 * 24))'),
('CPU', 'Ociosidade', 'dias', 'cpu_ociosidade_dias' , 'int(psutil.cpu_times().idle / (60 * 60 * 24))'),
('RAM', 'Uso', '%', 'ram_uso' , 'psutil.virtual_memory().percent'),
('RAM', 'Memória Livre', 'Bytes', 'ram_livre' ,'int(psutil.virtual_memory().available)'),
('Bateria', 'Quantidade', '%', 'bateria_porcentagem', 'psutil.sensors_battery().percent'),
('CPU', 'Frequência', 'Mhz', 'cpu_freq', 'psutil.cpu_freq().current' ),
('RAM','Uso em Bytes', 'Bytes', 'ram_uso' ,'psutil.virtual_memory().used'),
('DISCO', 'Uso do Disco Bytes Windows', 'Bytes', 'disco_uso', 'psutil.disk_usage("C:\\").used'),
('DISCO', 'Uso do Disco Bytes Linux', 'Bytes', 'disco_uso', 'psutil.disk_usage("/").used'),
('DISCO', 'Uso do Disco Windows', '%', 'disco_percent', 'psutil.disk_usage("C:\\").percent'),
('DISCO', 'Uso do Disco Linux', '%', 'disco_percent', 'psutil.disk_usage("/").percent'),
('Bateria', 'Tempo Restante', 'minutos', 'bateria_restante', 'int(psutil.sensors_battery().secsleft / 60)');

