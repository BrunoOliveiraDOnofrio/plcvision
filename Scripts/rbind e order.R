capturas_final <- capturas_unidas[sample(nrow(capturas_unidas), 2000),]
capturas_final$dataHora <- as.POSIXct(capturas_final$dataHora, format="%Y-%m-%d %H:%M:%S")

plot(captura_final$dataHora, captura_final$cpu_percent
     , type = 'l', col = "orange", xlab = "Tempo", ylab = "CPU %", main= "Tendencia de Uso de Cpu Ao longo do dia")
captura_final <- capturas_final[order(capturas_final$dataHora), ]
captura_2$dataHora <- as.POSIXct(captura_2$dataHora, format="%Y-%m-%d %H:%M:%S")
captura_3$dataHora <- as.POSIXct(captura_3$dataHora, format="%Y-%m-%d %H:%M:%S")
