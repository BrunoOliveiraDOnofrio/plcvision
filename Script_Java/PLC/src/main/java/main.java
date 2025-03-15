import com.github.javafaker.Faker;

import java.util.Scanner;

import static java.lang.System.exit;

public class main {

    public static void main(String[] args) {
        Scanner leitor = new Scanner(System.in);
        Faker faker = new Faker();


        PLC[] plc = new PLC[6];
        plc[0] = new PLC("Simmens", "XPS 13", 2008, 17, 18, 19, 8);
        plc[1] = new PLC("Mitsubishi", "Spectre x360",2015, 3, 18, 11, 16);
        plc[2] = new PLC("Simmens", "XPS 13",20019, 17, 90, 20, 16);
        plc[3] = new PLC("Rockwell", "ThinkPad X1",2012, 17, 64, 15, 8);
        plc[4] = new PLC("Simmens", "ZenBook",2022, 17, 18, 19, 8);
        plc[5] = new PLC("Rockwell", "ZenBook",2021, 17, 18, 19, 32);


//        for (int i = 0; i < 6; i++) {
//            Integer randon_numeros = faker.number().numberBetween(0, 99);
//            String randon_palavra = faker.lorem().word();
//            plc[i] = new PLC(randon_palavra, randon_palavra, randon_numeros, randon_numeros, randon_numeros, randon_numeros, randon_numeros);
//
//        }


        System.out.println("Como voce gostaria de organizar seus plcs? \n 1. ram \n 2. Marca \n 3. Modelo \n 4. Usoram \n 5. Temperatura \n 6. Uso Cpu \n 7. Ano  \n 8. Tudo \n 9. Sair");
        int opcao = leitor.nextInt();

        if (opcao > 0 && opcao < 9) {
            System.out.println("Array PLC original");
            for (int i = 0; i < plc.length; i++) {
                plc[i].exibir();
            }

            if (opcao == 1) {
                System.out.println("\nArray PLC organizado por quantidade de ram");
                ramgbSort(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            } else if (opcao == 2) {
                System.out.println("\nArray PLC organizado por marca");
                marcaSort(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            } else if (opcao == 3) {
                System.out.println("\nArray PLC organizado por modelo");
                modeloSort(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            } else if (opcao == 4) {

                System.out.println("\nArray PLC totalmente organizado");
                ramusoSort(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            } else if (opcao == 5) {

                System.out.println("\nArray PLC totalmente organizado");
                tempSort(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            } else if (opcao == 6) {

                System.out.println("\nArray PLC totalmente organizado");
                cpuSort(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            } else if (opcao == 7) {

                System.out.println("\nArray PLC totalmente organizado");
                anoSort(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            } else if (opcao == 8) {

                System.out.println("\nArray PLC totalmente organizado");
                sortTotal(plc);
                for (int i = 0; i < plc.length; i++) {
                    plc[i].exibir();
                }
            }
        } else {
            exit(1);
        }
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
