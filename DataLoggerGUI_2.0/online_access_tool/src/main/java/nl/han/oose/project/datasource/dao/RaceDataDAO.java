package nl.han.oose.project.datasource.DAO;
import jakarta.inject.Inject;
import nl.han.oose.project.datasource.util.DatabaseProperties;
import nl.han.oose.project.presentation.dto.RaceDataDTO;
import nl.han.oose.project.business.exceptions.CarNotFoundException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Data Access Object (DAO) for handling race data interactions with the database.
 */
public class RaceDataDAO implements IRaceDataDAO {

    private static final Logger LOGGER = Logger.getLogger(RaceDataDAO.class.getName());
    private final DatabaseProperties databaseProperties;

     /**
      * Constructs a new RaceDataDAO instance.
      *
      * @param databaseProperties The database properties for establishing a connection.
      */
     @Inject
     public RaceDataDAO(DatabaseProperties databaseProperties) {
          this.databaseProperties = databaseProperties;
     }

     /**
      * Executes a SQL query and retrieves a list of RaceDataDTO based on the provided parameters.
      *
      * @param sql    The SQL query to execute.
      * @param params The parameters to be used in the SQL query.
      * @return A list of RaceDataDTO objects retrieved from the database.
      */
     private List<RaceDataDTO> executeQuery(String sql, Object... params) {
          List<RaceDataDTO> data = new ArrayList<>();
          try (Connection connection = DriverManager.getConnection(databaseProperties.connectionString());
               PreparedStatement statement = connection.prepareStatement(sql)) {
               for (int i = 0; i < params.length; i++) {
                    statement.setObject(i + 1, params[i]);
               }
               try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                         RaceDataDTO login = new RaceDataDTO(
                              resultSet.getInt("ID"),
                              resultSet.getInt("Base_ID"),
                              resultSet.getString("Time"),
                              resultSet.getString("users_username"),
                              resultSet.getString("Value")
                         );
                         data.add(login);
                    }
               }
          } catch (SQLException e) {
               LOGGER.log(Level.SEVERE, e.getMessage(), e);
          }
          return data;
     }

     /**
      * Retrieves a list of RaceDataDTO for all race data entries in the database (limited to 1000 entries).
      *
      * @return A list of RaceDataDTO objects.
      */
     @Override
     public List<RaceDataDTO> findAll() {
          return executeQuery("SELECT * FROM raw_data WHERE users_username = 'RaceCar01' LIMIT 1000");
     }

     /**
      * Retrieves a list of RaceDataDTO based on the provided sensor, date, and race car name.
      *
      * @param sensor                        The sensor ID.
      * @param yearMonthDateHourMinuteSecond The date and time in the format "YYYY-MM-DD HH:MM:SS".
      * @param raceCarName                   The race car name.
      * @return A list of RaceDataDTO objects.
      */
     @Override
     public List<RaceDataDTO> findWhereSensorIsOnDate(int sensor, String yearMonthDateHourMinuteSecond, String raceCarName) {
          String sql = "SELECT * FROM raw_data WHERE Base_ID = ? AND Time LIKE ? AND users_username = ? LIMIT 1";
          return executeQuery(sql, sensor, yearMonthDateHourMinuteSecond + "%", raceCarName);
     }

     /**
      * Retrieves a list of RaceDataDTO for the newest data entry based on the provided sensor and race car name.
      *
      * @param sensorID    The sensor ID.
      * @param raceCarName The race car name.
      * @return A list of RaceDataDTO objects.
      */
     @Override
     public List<RaceDataDTO> findNewDataWhereSensorIs(int sensorID, String raceCarName) {
          String sql = "SELECT * FROM raw_data WHERE Base_ID = ? AND users_username = ? ORDER BY \"Time\" DESC LIMIT 1";
          return executeQuery(sql, sensorID, raceCarName);
     }

     /**
      * Retrieves a list of RaceDataDTO based on the provided sensor, date, and race car name (limited to 1000 entries).
      *
      * @param sensor                 The sensor ID.
      * @param startYearMonthDateTime The date in the format "YYYY-MM-DD HH:MM:SS".
      * @param endYearMonthDateTime   the date in the format "YYYY-MM-DD HH:MM:SS".
      * @param raceCarName            The race car name.
      * @return A list of RaceDataDTO objects.
      */
     @Override
     public List<RaceDataDTO> findWhereSensorIsBetweenDate(int sensor, String startYearMonthDateTime, String endYearMonthDateTime, String raceCarName) {
          String sql = "SELECT * FROM raw_data WHERE Base_ID = ? AND Time BETWEEN ? AND ? AND users_username = ? ORDER BY Time DESC LIMIT 10000";
          return executeQuery(sql, sensor, startYearMonthDateTime + "%", endYearMonthDateTime + "%", raceCarName);
     }

     /**
      * Retrieves a list of distinct race car names from the raw_data table.
      *
      * @return A list of distinct race car names.
      */
     @Override
     public List<String> findAllCars() {
          String query = "SELECT distinct users_username from raw_data";
          List<String> raceCars = new ArrayList<>();
          try (Connection connection = DriverManager.getConnection(databaseProperties.connectionString());
               PreparedStatement statement = connection.prepareStatement(query)) {
               try (ResultSet resultSet = statement.executeQuery()) {
                    if (!resultSet.next()) {
                         throw new CarNotFoundException("Car(s) is/are not found");
                    }

                    do {
                         String carName = resultSet.getString("users_username");
                         raceCars.add(carName);
                    } while (resultSet.next());
               }
          } catch (SQLException e) {
               LOGGER.log(Level.SEVERE, e.getMessage(), e);
          }
          return raceCars;
     }

    /**
     * Retrieves a list of RaceDataDTO for all sensor data for a given car.
     *
     * @param raceCarName The race car name.
     * @return A list of RaceDataDTO objects.
     */
    @Override
    public List<RaceDataDTO> findNewDataForSensor(int sensor, String startYearMonthDateTime, String endYearMonthDateTime, String raceCarName) {
        String sql = "SELECT * FROM raw_data WHERE Base_ID = ? AND Time BETWEEN ? AND ? AND users_username = ? ORDER BY Time desc LIMIT 5000";
        return executeQuery(sql, sensor, startYearMonthDateTime, endYearMonthDateTime, raceCarName);
    }
}
