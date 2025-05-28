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

