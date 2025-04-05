#medias
mean(captura_1$ram_percent)
mean(capturas_4$cpu_percent)
mean(captura_2$ram_uso)

#soma dos recursos
sum(captura_1$cpu_percent)
sum(captura_1$ram_percent)
sum(captura_1$disco_percent)


#Correlaçaõ entre variaveis 

cor <- cor(captura_1$cpu_percent, captura_1$ram_percent)
plot(cor)
cor
cor.test(captura_1$cpu_freq, captura_1$cpu_percent)

#grafico de disperssão entre ram e cpu, com regrressão linear
plot(captura_1$cpu_percent, captura_1$ram_percent, 
     main = "Correlação entre CPU e RAM", 
     xlab = "Uso da CPU (%)", 
     ylab = "Uso da RAM (%)", 
     col = "blue", pch = 16)
abline(lm(captura_1$ram_percent ~ captura_1$cpu_percent), col="red", lwd=2)


#todos os picos acima de um limite
limiteCpu <- 70
limiteRam <- 75

picos_cpu <- captura_1[which(captura_1$cpu_percent > limiteCpu),]
plot(table(picos_cpu$cpu_percent))

picos_ram <- captura_1[which(captura_1$ram_percent > limiteRam),]
plot(table(picos_ram$ram_percent))

picos_cpu_freq <- captura_1[which(captura_1$cpu_freq > 1000),]
plot(table(picos_cpu_freq$cpu_freq))


# analise de picos
indice_maior_cpu_uso <- which.max(captura_1$cpu_percent)
indice_maior_cpu_freq <- which.max(captura_1$cpu_freq)
indice_maior_ram_percent <- which.max(captura_1$ram_percent)
indice_maior_ram_uso <- which.max(captura_1$ram_uso)
indice_maior_disco_percent <- which.max(captura_1$disco_percent)
indice_maior_ociosidade <- which.max(captura_1$cpu_ociosidade_dias)

maior_ram_uso <- captura_1$ram_uso[indice_maior_ram_uso]

maior_percent_ram <- captura_1$ram_percent[indice_maior_ram_percent]

maior_uso_cpu <- captura_1$cpu_percent[indice_maior_cpu_uso]

maior_freq_cpu <- captura_1$cpu_freq[indice_maior_cpu_freq]

maior_ram_uso <- maior_ram_uso / 1024 ** 3

maior_ociosidade <- captura_1$cpu_ociosidade_dias[indice_maior_ociosidade]

maior_disco_percent <- captura_1$disco_percent[indice_maior_disco_percent]





cap_ram <- sample(captura_2$ram_percent, 2000)


#histogramas(distribuição de recursos)

hist(captura_1$cpu_percent, 
     main = "Distribuição do Uso da CPU", 
     xlab = "Uso da CPU (%)", 
     col = "lightblue", 
     border = "black")


hist(captura_1$ram_percent, 
     main = "Distribuição do Uso da RAM", 
     xlab = "Uso da RAM (%)", 
     col = "lightgreen", 
     border = "black")

hist(captura_1$ram_uso, 
     main = "Distribuição do Uso da RAM", 
     xlab = "Uso da RAM (Bytes)", 
     col = "lightgreen", 
     border = "black")


# mostra a faixa de valores mais encontrados
boxplot(captura_1$ram_percent, 
        main = "Boxplot do Uso da CPU", 
        ylab = "Uso da CPU (%)", 
        col = "lightblue")


#graficos simples
plot(density(captura_1$cpu_percent, na.rm = TRUE), 
     main = "Uso da CPU", 
     xlab = "Uso da CPU (%)", 
     col = "blue", lwd = 2)


plot(density(captura_1$ram_percent, na.rm = TRUE), 
     main = "Uso da RAM", 
     xlab = "Uso da RAM (%)", 
     col = "blue", lwd = 2)

plot(density(captura_1$cpu_freq, na.rm = TRUE), 
     main = "Frequencia da CPU", 
     xlab = "Frequencia da CPU (Mhz)", 
     col = "blue", lwd = 2)

plot(density(captura_1$ram_uso, na.rm = TRUE), 
     main = "Uso da RAM", 
     xlab = "Uso da RAM (Bytes)", 
     col = "blue", lwd = 2)

plot(density(capturas_4$cpu_ociosidade_dias, na.rm = TRUE),
     main = "Ociosidade", 
     xlab = "Ociosidade em Dias",
     col = 'blue')


#Tendencias ao longo do dia, comparação de uso dentro de periodos
captura_1$dataHora <- as.POSIXct(captura_1$dataHora, format="%Y-%m-%d %H:%M:%S")

plot(captura_1$dataHora, captura_1$cpu_percent, 
     type = "l", col = "blue", 
     main = "Tendência do Uso da CPU",
     xlab = "Tempo", ylab = "Uso da CPU (%)")

plot(captura_1$dataHora, captura_1$ram_percent, 
     type = "l", col = "blue", 
     main = "Tendência do Uso da RAM",
     xlab = "Tempo", ylab = "Uso da RAM (%)")


plot(captura_1$dataHora, captura_1$ram_uso, 
     type = "l", col = "blue", 
     main = "Tendência do Uso da RAM",
     xlab = "Tempo", ylab = "Uso da RAM Bytes)")


#Comparação entre desempenho de cpus(maquinas diferentes)
plot(captura_1$dataHora, captura_1$cpu_percent, type = "l", col = "lightblue", 
     ylim = c(0, max(captura_1$cpu_percent, captura_1$ram_percent, captura_1$disco_percent, na.rm = TRUE)),
     main = "Comparação de Uso de CPU",
     xlab = "Tempo", ylab = "Uso (%)")

lines(captura_1$dataHora, capturas_4$cpu_percent, col= "darkblue")
legend("topright", legend = c("CPU PLC 1", "CPU PLC 2"), col = c("lightblue", "darkblue"), lty = 1)


plot(captura_1$dataHora, captura_1$ram_percent, type = "l", col = "lightblue", 
     ylim = c(0, max(captura_1$ram_percent, captura_1$ram_percent, captura_1$disco_percent, na.rm = TRUE)),
     main = "Comparação de Uso de RAM",
     xlab = "Tempo", ylab = "Uso (%)")

lines(captura_1$dataHora, capturas_4$ram_percent, col= "darkblue")
legend("topright", legend = c("RAM PLC 1", "RAM PLC 2"), col = c("lightblue", "darkblue"), lty = 1)


# Grafico de dispersão com regressão linear
plot(captura_1$ram_percent, captura_1$cpu_percent, 
     main = "Correlação entre Uso de Ram e uso de CPU (%)",
     xlab = "Uso da RAM (%)", 
     ylab = "Uso da CPU (%)", 
     col = c("blue", "red"), pch = 16)
abline(lm(captura_1$cpu_percent ~ captura_1$ram_percent), col="green", lwd=2)



# variação ao longo do dia (periodo maior)

set.seed(42)


captura_2 <- captura_2[order(captura_2$dataHora), ]
captura_3 <- captura_3[order(captura_3$dataHora), ]

captura_1_2 <- rbind(captura_2, captura_3)

captura_1_2$dataHora <- as.POSIXct(captura_1_2$dataHora, format="%Y-%m-%d %H:%M:%S")
captura_1_2 <- captura_1_2[order(captura_1_2$dataHora), ]

plot(captura_1_2$dataHora, captura_1_2$cpu_percent, type = "l", col = "lightblue", 
     
     ylim = c(0, max(captura_1_2$cpu_percent, captura_1_2$ram_percent, captura_1_2$disco_percent, na.rm = TRUE)),
     main = "Comparação de Uso de CPU",
     xlab = "Tempo", ylab = "Uso (%)")

#variação ao longo do dia










