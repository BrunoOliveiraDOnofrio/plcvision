public class main {

    public static void main(String[] args) {

        PLC[] plc = new PLC[6];
        plc[0] = new PLC("Simmens", "XPS 13", 8);
        plc[1] = new PLC("Mitsubishi", "Spectre x360", 16);
        plc[2] = new PLC("Simmens", "MacBook Air", 8);
        plc[3] = new PLC("Rockwell", "ThinkPad X1", 32);
        plc[4] = new PLC("Simmens", "ZenBook", 16);
        plc[5] = new PLC("Rockwell", "ZenBook", 8);



        System.out.println("Array PLC original");
        for(int i=0; i < plc.length; i++) {
            plc[i].exibir();
        }


        System.out.println("\nArray PLC organizado por quantidade de ram");
        ramgbSort(plc);
        for(int i=0; i < plc.length; i++) {
            plc[i].exibir();
        }

        System.out.println("\nArray PLC organizado por marca");
        marcaSort(plc);
        for(int i=0; i < plc.length; i++) {
            plc[i].exibir();
        }
    }

    public static void ramgbSort(PLC[] plc){

        for(int i=0; i < plc.length; i++){
            int menor = i;
            for(int j=i+1; j < plc.length; j++){
                if(plc[j].ramgb < plc[menor].ramgb){
                    menor = j;
                }
            }
            PLC temp = plc[i];
            plc[i] = plc[menor];
            plc[menor] = temp;
        }

    }

    public static void marcaSort(PLC[] plc){

        for(int i=0; i < plc.length; i++){
            int menor = i;
            for(int j=i+1; j < plc.length; j++){
                if(plc[j].marca.compareTo(plc[menor].marca) < 0){
                    menor = j;
                }
            }
            PLC temp = plc[i];
            plc[i] = plc[menor];
            plc[menor] = temp;
        }


    }
}
