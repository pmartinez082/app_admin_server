import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import javax.swing.*;
public class NodeAbiarazlea {
    private static Process ps;

    public static void main(String[] args) {
        JFrame frame = new JFrame("Zerbitzaria Abiarazi");
        frame.setSize(400, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new BorderLayout());
        frame.setLocationRelativeTo(null);

        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(2, 1, 10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));

        JButton startButton = new JButton("Zerbitzaria Abiarazi");
        startButton.setFont(new Font("Arial", Font.BOLD, 16));
        startButton.setBackground(new Color(34, 139, 34));
        startButton.setForeground(Color.WHITE);
        startButton.setFocusPainted(false);
        startButton.setBorder(BorderFactory.createEmptyBorder(10, 20, 10, 20));

        JButton stopButton = new JButton("Zerbitzaria Gelditu");
        stopButton.setFont(new Font("Arial", Font.BOLD, 16));
        stopButton.setBackground(new Color(220, 20, 60));
        stopButton.setForeground(Color.WHITE);
        stopButton.setFocusPainted(false);
        stopButton.setBorder(BorderFactory.createEmptyBorder(10, 20, 10, 20));

        panel.add(startButton);
        panel.add(stopButton);

        frame.add(panel, BorderLayout.CENTER);

        startButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                abiaraziZerbitzaria("npm run setup");
            }
        });

        stopButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                geldituZerbitzaria();
                System.exit(0);
            }
        });

        frame.setVisible(true);
    }

    public static void abiaraziZerbitzaria(String komandoa) {
        try {
            if (ps != null && ps.isAlive()) {
                JOptionPane.showMessageDialog(null, "Zerbitzaria dagoeneko martxan dago.");
                return;
            }

            File serverDirectory = new File("./server");
            if (!serverDirectory.exists() || !serverDirectory.isDirectory()) {
                JOptionPane.showMessageDialog(null, "Karpeta 'server' ez da aurkitu.", "Errorea", JOptionPane.ERROR_MESSAGE);
                return;
            }

            ProcessBuilder processBuilder = new ProcessBuilder();
            if (System.getProperty("os.name").toLowerCase().contains("win")) {
                processBuilder.command("cmd.exe", "/c", komandoa);
            } else {
                processBuilder.command("bash", "-c", komandoa);
            }

            processBuilder.directory(serverDirectory);
            ps = processBuilder.start();

            capturaSalidaProceso(ps);

            JOptionPane.showMessageDialog(null, "Zerbitzaria ondo abiarazi da.");

        } catch (IOException ex) {
            JOptionPane.showMessageDialog(null, "Errorea komandoa exekutatzean.", "Errorea", JOptionPane.ERROR_MESSAGE);
        }
    }

    public static void geldituZerbitzaria() {
        try {
            
            String pid = new String(Files.readAllBytes(Paths.get("./server/process.txt"))).trim();
           
          
            long serverPid = Long.parseLong(pid);
          
            if (System.getProperty("os.name").toLowerCase().contains("win")) {
                Runtime.getRuntime().exec("taskkill /PID " + serverPid + " /F");
              
            } else {
                Runtime.getRuntime().exec("kill -2 " + serverPid);

            }

            JOptionPane.showMessageDialog(null, "Zerbitzaria gelditu da.");
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Errorea zerbitzaria gelditzean.", "Errorea", JOptionPane.ERROR_MESSAGE);
            e.printStackTrace();
        }
    }

    private static void capturaSalidaProceso(Process proceso) {
        new Thread(() -> {
            try {
                BufferedReader reader = new BufferedReader(new InputStreamReader(proceso.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }

                BufferedReader errorReader = new BufferedReader(new InputStreamReader(proceso.getErrorStream()));
                while ((line = errorReader.readLine()) != null) {
                    System.err.println(line);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }).start();
    }
}
