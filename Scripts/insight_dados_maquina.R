#Correlaçaõ entre variaveis 

cor <- cor(captura_1$cpu_percent, captura_1$ram_percent)
plot(cor)
cor
cor.test(captura_1$cpu_freq, captura_1$cpu_percent)

plot(captura_1$cpu_percent, captura_1$ram_percent, 
     main = "Correlação entre CPU e RAM", 
     xlab = "Uso da CPU (%)", 
     ylab = "Uso da RAM (%)", 
     col = "blue", pch = 16)
abline(lm(captura_1$ram_percent ~ captura_1$cpu_percent), col="red", lwd=2)


limiteCpu <- 70
limiteRam <- 75

picos_cpu <- captura_1[which(captura_1$cpu_percent > limiteCpu),]
plot(table(picos_cpu$cpu_percent))

picos_ram <- captura_1[which(captura_1$ram_percent > limiteRam),]
plot(table(picos_ram$ram_percent))

picos_cpu_freq <- captura_1[which(captura_1$cpu_freq > 1000),]
plot(table(picos_cpu_freq$cpu_freq))


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



maiores_valores <- c(maior_ram_uso, maior_percent_ram, maior_uso_cpu, maior)

cap_ram <- sample(captura_2$ram_percent, 2000)

plot(1)
hist(captura_1$ram_percent, xlab = "RAM %", ylab="Frequencia", col="BLUE")

hist(cap_ram, ylab="RAM %", xlab="Frequencia", add=TRUE, col = "RED")



