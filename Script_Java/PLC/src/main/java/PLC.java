public class PLC {
     String marca;
     String modelo;
     Integer ramgb;

    public PLC(String marca, String modelo, Integer ramgb) {
        this.marca = marca;
        this.modelo = modelo;
        this.ramgb = ramgb;
    }
    public void exibir(){
        System.out.println("Marca: " + marca + " Modelo: " + modelo + " Ramgb: " + ramgb);
    }
}
