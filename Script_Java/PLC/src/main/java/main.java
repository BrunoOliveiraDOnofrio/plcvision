import com.github.javafaker.Faker;

import java.util.Scanner;

import static java.lang.System.exit;

public class main {

    public static void main(String[] args) {
        Scanner leitor = new Scanner(System.in);
        Faker faker = new Faker();


        PLC[] plc = new PLC[6];
//        plc[0] = new PLC("Simmens", "XPS 13", 2008, 17, 18, 19, 8);
//        plc[1] = new PLC("Mitsubishi", "Spectre x360",2015, 3, 18, 11, 16);
//        plc[2] = new PLC("Simmens", "XPS 13",20019, 17, 90, 20, 16);
//        plc[3] = new PLC("Rockwell", "ThinkPad X1",2012, 17, 64, 15, 8);
//        plc[4] = new PLC("Simmens", "ZenBook",2022, 17, 18, 19, 8);
//        plc[5] = new PLC("Rockwell", "ZenBook",2021, 17, 18, 19, 32);

        String[] array_marca = {"Simmens", "Mitsubishi", "Rockwell"};
        String[] array_modelo = {"Spectre x360", "ZenBook", "XPS 13"};
        Integer[] array_ram = {8, 16, 32};


        for (int i = 0; i < 6; i++) {
            Integer randon_numeros = faker.number().numberBetween(0, 99);
            Integer modelo_randon = faker.number().numberBetween(0, 3);
            Integer ram_randon = faker.number().numberBetween(0, 3);
            Integer marca_randon = faker.number().numberBetween(0, 3);
            Integer ano_randon = faker.number().numberBetween(2000, 2025);
            String randon_palavra = faker.lorem().word();
            plc[i] = new PLC(array_marca[marca_randon], array_modelo[modelo_randon], ano_randon, randon_numeros, randon_numeros, randon_numeros, array_ram[ram_randon]);

        }


        System.out.println("Como voce gostaria de organizar seus plcs? \n 1. ram \n 2. Marca \n 3. Modelo \n 4. Usoram \n 5. Temperatura \n 6. Uso Cpu \n 7. Ano  \n 8. Tudo \n 9. Sair");
        int opcao = leitor.nextInt();

        if (opcao > 0 && opcao < 9) {
            System.out.println("Array PLC original");
            for (int i = 0; i < plc.length; i++) {
                plc[i].exibir();
            }

            if (opcao == 1) {
                System.out.println("\nArray PLC organizado por quantidade de ram");
                PLC.ramgbSort(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            } else if (opcao == 2) {
                System.out.println("\nArray PLC organizado por marca");
                PLC.marcaSort(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            } else if (opcao == 3) {
                System.out.println("\nArray PLC organizado por modelo");
                PLC.modeloSort(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            } else if (opcao == 4) {

                System.out.println("\nArray PLC totalmente organizado");
                PLC.ramusoSort(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            } else if (opcao == 5) {

                System.out.println("\nArray PLC totalmente organizado");
                PLC.tempSort(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            } else if (opcao == 6) {

                System.out.println("\nArray PLC totalmente organizado");
                PLC.cpuSort(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            } else if (opcao == 7) {

                System.out.println("\nArray PLC totalmente organizado");
                PLC.anoSort(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            } else if (opcao == 8) {

                System.out.println("\nArray PLC totalmente organizado");
                PLC.sortTotal(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            }
        } else {
            exit(1);
        }
    }
}
