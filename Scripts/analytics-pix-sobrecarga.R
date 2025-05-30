rm(df.plc.final)

# Importando biblioteca ggplot para criação dos gráficos

library(ggplot2)

# Tratamentos do dataframe de captura do plc

plcvision.captura1$cpu_freq = NULL
plcvision.captura1$ram_uso = NULL
plcvision.captura1$disco_percent = NULL
plcvision.captura1$disco_uso = NULL
plcvision.captura1$cpu_ociosidade_dias = NULL
plcvision.captura1$ram_livre = NULL
plcvision.captura1$dataHora = NULL

# Simulando o cenário
set.seed(33)

summary(plcvision.captura1)
round(sd(plcvision.captura1$cpu_percent),2)
round(sd(plcvision.captura1$ram_percent),2)

dados.cpu.all <- abs(round(rnorm(2160, 22.3, 14.43),2))
dados.ram.all <- abs(round(rnorm(2160, 71.74, 4.81),2))
hist(dados.ram.all,
     col = "lightblue1")
hist(dados.cpu.all,
     col = "lightblue1")

df.dados.plc.all <- data.frame(id = rep(1:2160),
                               dados.cpu.all,
                               dados.ram.all)

summary(df.dados.plc.all)

# Dados do Plc dos 12 meses de 2024

dados.cpu.jan <- sample(df.dados.plc.all$dados.cpu.all, 180, replace = TRUE)
dados.cpu.fev <- sample(df.dados.plc.all$dados.cpu.all, 180, replace = TRUE)
dados.cpu.mar <- sample(df.dados.plc.all$dados.cpu.all, 180, replace = TRUE)
dados.cpu.abr <- sample(df.dados.plc.all$dados.cpu.all, 180, replace = TRUE)
dados.cpu.mai <- sample(df.dados.plc.all$dados.cpu.all, 180, replace = TRUE)
dados.cpu.jun <- sample(df.dados.plc.all$dados.cpu.all, 180, replace = TRUE)
dados.cpu.jul <- sample(df.dados.plc.all$dados.cpu.all, 180, replace = TRUE)
dados.cpu.ago <- sample(df.dados.plc.all$dados.cpu.all, 180, replace = TRUE)
dados.cpu.set <- sample(df.dados.plc.all$dados.cpu.all, 180, replace = TRUE)
dados.cpu.out <- sample(df.dados.plc.all$dados.cpu.all, 180, replace = TRUE)
dados.cpu.nov <- sample(df.dados.plc.all$dados.cpu.all, 180, replace = TRUE)
dados.cpu.dez <- sample(df.dados.plc.all$dados.cpu.all, 180, replace = TRUE)

dados.ram.jan <- sample(df.dados.plc.all$dados.ram.all, 180, replace = TRUE)
dados.ram.fev <- sample(df.dados.plc.all$dados.ram.all, 180, replace = TRUE)
dados.ram.mar <- sample(df.dados.plc.all$dados.ram.all, 180, replace = TRUE)
dados.ram.abr <- sample(df.dados.plc.all$dados.ram.all, 180, replace = TRUE)
dados.ram.mai <- sample(df.dados.plc.all$dados.ram.all, 180, replace = TRUE)
dados.ram.jun <- sample(df.dados.plc.all$dados.ram.all, 180, replace = TRUE)
dados.ram.jul <- sample(df.dados.plc.all$dados.ram.all, 180, replace = TRUE)
dados.ram.ago <- sample(df.dados.plc.all$dados.ram.all, 180, replace = TRUE)
dados.ram.set <- sample(df.dados.plc.all$dados.ram.all, 180, replace = TRUE)
dados.ram.out <- sample(df.dados.plc.all$dados.ram.all, 180, replace = TRUE)
dados.ram.nov <- sample(df.dados.plc.all$dados.ram.all, 180, replace = TRUE)
dados.ram.dez <- sample(df.dados.plc.all$dados.ram.all, 180, replace = TRUE)

# Pegando as médias mensais dos dados do PLC

media.cpu.jan <- round(mean(dados.cpu.jan),2)
media.cpu.fev <- round(mean(dados.cpu.fev),2)
media.cpu.mar <- round(mean(dados.cpu.mar),2)
media.cpu.abr <- round(mean(dados.cpu.abr),2)
media.cpu.mai <- round(mean(dados.cpu.mai),2)
media.cpu.jun <- round(mean(dados.cpu.jun),2)
media.cpu.jul <- round(mean(dados.cpu.jul),2)
media.cpu.ago <- round(mean(dados.cpu.ago),2)
media.cpu.set <- round(mean(dados.cpu.set),2)
media.cpu.out <- round(mean(dados.cpu.out),2)
media.cpu.nov <- round(mean(dados.cpu.nov),2)
media.cpu.dez <- round(mean(dados.cpu.dez),2)

media.ram.jan <- round(mean(dados.ram.jan),2)
media.ram.fev <- round(mean(dados.ram.fev),2)
media.ram.mar <- round(mean(dados.ram.mar),2)
media.ram.abr <- round(mean(dados.ram.abr),2)
media.ram.mai <- round(mean(dados.ram.mai),2)
media.ram.jun <- round(mean(dados.ram.jun),2)
media.ram.jul <- round(mean(dados.ram.jul),2)
media.ram.ago <- round(mean(dados.ram.ago),2)
media.ram.set <- round(mean(dados.ram.set),2)
media.ram.out <- round(mean(dados.ram.out),2)
media.ram.nov <- round(mean(dados.ram.nov),2)
media.ram.dez <- round(mean(dados.ram.dez),2)

# Juntando as médias mensais em conjuntos para formar o dataframe final

medias.cpu.all <- c(media.cpu.jan,
                    media.cpu.fev,
                    media.cpu.mar,
                    media.cpu.abr,
                    media.cpu.mai,
                    media.cpu.jun,
                    media.cpu.jul,
                    media.cpu.ago,
                    media.cpu.set,
                    media.cpu.out,
                    media.cpu.nov,
                    media.cpu.dez)


medias.ram.all <- c(media.ram.jan,
                    media.ram.fev,
                    media.ram.mar,
                    media.ram.abr,
                    media.ram.mai,
                    media.ram.jun,
                    media.ram.jul,
                    media.ram.ago,
                    media.ram.set,
                    media.ram.out,
                    media.ram.nov,
                    media.ram.dez)


df.medias.cpu.all <- data.frame(medias.cpu.all)

df.medias.ram.all <- data.frame(medias.ram.all)


# Simulando o cenário que as médias vão aumentando conforme os meses passam

medias.cpu.all.final <- data.frame(sort(df.medias.cpu.all$medias.cpu.all, decreasing = FALSE))

medias.ram.all.final <- data.frame(sort(df.medias.ram.all$medias.ram.all, decreasing = FALSE))

df.plc.final <- data.frame(medias.cpu.all.final,
                           medias.ram.all.final)


summary(df.plc.final)

# Médias dos 12 meses

plot(df.plc.final$sort.df.medias.cpu.all.medias.cpu.all..decreasing...FALSE.)
plot(df.plc.final$sort.df.medias.ram.all.medias.ram.all..decreasing...FALSE.)

# CORRIGIRRRRR


# Tratamentos do dataframe do Pix

linhas.mantidas <- c(9:20)

transaes.pix$Valor.Fora.do.SPI = NULL
transaes.pix$Valor.SPI = NULL

df.pix.2024 <- transaes.pix[linhas.mantidas,]

# Pegando o percentual do número de transações do pix

total.pix.2024 <- sum(df.pix.2024$Total)

percentual.pix.jan <- round(df.pix.2024[1, 2] / total.pix.2024 * 100,2)
percentual.pix.fev <- round(df.pix.2024[2, 2] / total.pix.2024 * 100,2)
percentual.pix.mar <- round(df.pix.2024[3, 2] / total.pix.2024 * 100,2)
percentual.pix.abr <- round(df.pix.2024[4, 2] / total.pix.2024 * 100,2)
percentual.pix.mai <- round(df.pix.2024[5, 2] / total.pix.2024 * 100,2)
percentual.pix.jun <- round(df.pix.2024[6, 2] / total.pix.2024 * 100,2)
percentual.pix.jul <- round(df.pix.2024[7, 2] / total.pix.2024 * 100,2)
percentual.pix.ago <- round(df.pix.2024[8, 2] / total.pix.2024 * 100,2)
percentual.pix.set <- round(df.pix.2024[9, 2] / total.pix.2024 * 100,2)
percentual.pix.out <- round(df.pix.2024[10, 2] / total.pix.2024 * 100,2)
percentual.pix.nov <- round(df.pix.2024[11, 2] / total.pix.2024 * 100,2)
percentual.pix.dez <- round(df.pix.2024[12, 2] / total.pix.2024 * 100,2)

# Juntando o percentual em um conjunto para formar o dataframe final

percentuais.pix.all <- c(percentual.pix.jan,
                         percentual.pix.fev,
                         percentual.pix.mar,
                         percentual.pix.abr,
                         percentual.pix.mai,
                         percentual.pix.jun,
                         percentual.pix.jul,
                         percentual.pix.ago,
                         percentual.pix.set,
                         percentual.pix.out,
                         percentual.pix.nov,
                         percentual.pix.dez)

df.pix.2024$Percentual_Transacao <- percentuais.pix.all

# Criação do dataframe final para a análise

df.analise <- cbind(df.plc.final,
                    df.pix.2024)

hist(df.analise$Percentual_Transacao,
     col = "lightblue1")

hist(df.analise$sort.df.medias.cpu.all.medias.cpu.all..decreasing...FALSE.,
     col = "lightblue1")

hist(df.analise$sort.df.medias.ram.all.medias.ram.all..decreasing...FALSE.,
     col = "lightblue1")

# Criação dos gráficos

plot(df.analise$Percentual_Transacao, type = "o")
plot(df.analise$sort.df.medias.cpu.all.medias.cpu.all..decreasing...FALSE., type = "o")
plot(df.analise$sort.df.medias.ram.all.medias.ram.all..decreasing...FALSE., type = "o")

cor(df.analise$sort.df.medias.cpu.all.medias.cpu.all..decreasing...FALSE., df.analise$Total)
cor(df.analise$sort.df.medias.ram.all.medias.ram.all..decreasing...FALSE., df.analise$Total)


plot(df.analise$sort.df.medias.cpu.all.medias.cpu.all..decreasing...FALSE. ~ df.analise$Total)
plot(df.analise$sort.df.medias.ram.all.medias.ram.all..decreasing...FALSE. ~ df.analise$Total)

a <- lm(df.analise$sort.df.medias.cpu.all.medias.cpu.all..decreasing...FALSE. ~ df.analise$Total,)

b <- lm(df.analise$sort.df.medias.ram.all.medias.ram.all..decreasing...FALSE. ~ df.analise$Total)


summary(a)
summary(b)


ggplot(data = df.analise, aes(x = Total, y = sort.df.medias.cpu.all.medias.cpu.all..decreasing...FALSE.)) +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE)

ggplot(data = df.analise, aes(x = Total, y = sort.df.medias.cpu.all.medias.cpu.all..decreasing...FALSE.)) +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE) +
  labs(
    title = "Regressão Linear",
    subtitle = "Uso Médio Mensal da CPU e Transações de PIX",
    x = "Número Absoluto de Transações de PIX",
    y = "Percentual Médio Mensal de Uso da CPU"
  )

ggplot(data = df.analise, aes(x = Total, y = sort.df.medias.ram.all.medias.ram.all..decreasing...FALSE.)) +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE) +
  labs(
    title = "Regressão Linear",
    subtitle = "Uso Médio Mensal da RAM e Transações de PIX",
    x = "Número Absoluto de Transações de PIX",
    y = "Percentual Médio Mensal de Uso da RAM"
  )



predict()