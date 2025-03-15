public class main {

    public static void main(String[] args) {

        PLC[] plc = new PLC[6];
        plc[0] = new PLC("Simmens", "XPS 13", 8);
        plc[1] = new PLC("Mitsubishi", "Spectre x360", 16);
        plc[2] = new PLC("Simmens", "MacBook Air", 8);
        plc[3] = new PLC("Rockwell", "ThinkPad X1", 32);
        plc[4] = new PLC("Simmens", "ZenBook", 16);
        plc[5] = new PLC("Rockwell", "ZenBook", 8);
    }
}