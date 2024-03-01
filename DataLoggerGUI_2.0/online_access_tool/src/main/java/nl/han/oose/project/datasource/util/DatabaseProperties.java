package nl.han.oose.project.datasource.util;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

public class DatabaseProperties {
    private static final Logger LOGGER = Logger.getLogger(DatabaseProperties.class.getName());
    private Properties properties;

    public DatabaseProperties() {
        properties = new Properties();
        try {
            properties.load(getClass().getClassLoader().getResourceAsStream("database.properties"));
        } catch (IOException e) {
            LOGGER.log(Level.SEVERE, "An error occurred:", e);
        }
    }

    public Connection getConnection() throws SQLException {
        String connectionString = properties.getProperty("connectionString");
        return DriverManager.getConnection(connectionString);
    }

    public String connectionString() {
        return properties.getProperty("connectionString");
    }
}
