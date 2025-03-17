public class PLC {
     String marca;
     String modelo;
     Integer ano;
     Integer cpuUso;
     Integer temp;
     Integer ramUso;
     Integer ramgb;

    public PLC(String marca, String modelo, Integer ano, Integer cpuUso, Integer temp, Integer ramUso, Integer ramgb) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cpuUso = cpuUso;
        this.temp = temp;
        this.ramUso = ramUso;
        this.ramgb = ramgb;
    }

    public void exibir(){
        System.out.println("Marca: " + marca + " Modelo: " + modelo + " Ramgb: " + ramgb +
        " Ram uso: " + ramUso + " UsoCpu: " + cpuUso +  " Temperatura: " + temp + " Ano: " + ano
        );
    }


    public static void ramgbSort(PLC[] plc) {

        for (int i = 0; i < plc.length; i++) {
            int menor = i;
            for (int j = i + 1; j < plc.length; j++) {
                if (plc[j].ramgb < plc[menor].ramgb) {
                    menor = j;
                }
            }
            PLC temp = plc[i];
            plc[i] = plc[menor];
            plc[menor] = temp;
        }

    }


    public static void cpuSort(PLC[] plc) {

        for (int i = 0; i < plc.length; i++) {
            int menor = i;
            for (int j = i + 1; j < plc.length; j++) {
                if (plc[j].cpuUso < plc[menor].cpuUso) {
                    menor = j;
                }
            }
            PLC temp = plc[i];
            plc[i] = plc[menor];
            plc[menor] = temp;
        }

    }


    public static void tempSort(PLC[] plc) {

        for (int i = 0; i < plc.length; i++) {
            int menor = i;
            for (int j = i + 1; j < plc.length; j++) {
                if (plc[j].temp < plc[menor].temp) {
                    menor = j;
                }
            }
            PLC temp = plc[i];
            plc[i] = plc[menor];
            plc[menor] = temp;
        }

    }

    public static void ramusoSort(PLC[] plc) {

        for (int i = 0; i < plc.length; i++) {
            int menor = i;
            for (int j = i + 1; j < plc.length; j++) {
                if (plc[j].ramUso < plc[menor].ramUso) {
                    menor = j;
                }
            }
            PLC temp = plc[i];
            plc[i] = plc[menor];
            plc[menor] = temp;
        }

    }

    public static void anoSort(PLC[] plc) {

        for (int i = 0; i < plc.length; i++) {
            int menor = i;
            for (int j = i + 1; j < plc.length; j++) {
                if (plc[j].ano < plc[menor].ano) {
                    menor = j;
                }
            }
            PLC temp = plc[i];
            plc[i] = plc[menor];
            plc[menor] = temp;
        }

    }

    public static void marcaSort(PLC[] plc) {

        for (int i = 0; i < plc.length; i++) {
            int menor = i;
            for (int j = i + 1; j < plc.length; j++) {
                if (plc[j].marca.compareTo(plc[menor].marca) < 0) {
                    menor = j;
                }
            }
            PLC temp = plc[i];
            plc[i] = plc[menor];
            plc[menor] = temp;
        }
    }


    public static void modeloSort(PLC[] plc) {

        for (int i = 0; i < plc.length; i++) {
            int menor = i;
            for (int j = i + 1; j < plc.length; j++) {
                if (plc[j].modelo.compareTo(plc[menor].modelo) < 0) {
                    menor = j;
                }
            }
            PLC temp = plc[i];
            plc[i] = plc[menor];
            plc[menor] = temp;
        }
    }

    public static void sortTotal(PLC[] plc) {
        for (int i = 0; i < plc.length; i++) {
            int menor = i;
            for (int j = i + 1; j < plc.length; j++) {
                int compararMarca = plc[j].marca.compareTo(plc[menor].marca);

                if (compararMarca < 0) {
                    menor = j;
                } else if (compararMarca == 0) {
                    int compararModelo = plc[j].modelo.compareTo(plc[menor].modelo);
                    if (compararModelo < 0) {
                        menor = j;
                    } else if (compararModelo == 0) {
                        if (plc[j].ramgb < plc[menor].ramgb) {
                            menor = j;
                        } else if (plc[j].ramgb > plc[menor].ramgb) {
                            if (plc[j].ramUso < plc[menor].ramUso) {
                                menor = j;
                            } else if (plc[j].ramUso > plc[menor].ramUso) {
                                if (plc[j].cpuUso < plc[menor].cpuUso) {
                                    menor = j;
                                } else if (plc[j].cpuUso > plc[menor].cpuUso) {
                                    if (plc[j].temp < plc[menor].temp) {
                                        menor = j;
                                    } else if (plc[j].temp > plc[menor].temp) {
                                        if (plc[j].ano < plc[menor].ano) {
                                            menor = j;
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
            }

            PLC temp = plc[i];
            plc[i] = plc[menor];
            plc[menor] = temp;
        }
    }
}
