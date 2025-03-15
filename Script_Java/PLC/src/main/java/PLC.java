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
}
