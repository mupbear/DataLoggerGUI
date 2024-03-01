package nl.han.oose.project.datasource.DAO;
import nl.han.oose.project.datasource.util.DatabaseProperties;
import nl.han.oose.project.presentation.dto.RaceDataDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class RaceDataDAOTest {
    private static final String VALUE = "110167353999616";
    private static final String RACECAR = "RaceCar01";
    private static final int SENSORID = 1538;
    private static final int ROWID = 6969;
    private static final String TIME = "2023-11-04 15:39:12.971166";
    private IRaceDataDAO sut;
    private ResultSet mockedResult;

    private PreparedStatement mockedStatement;

    @BeforeEach
    public void setup() throws SQLException{
        Connection mockedConnection = mock(Connection.class);
        PreparedStatement mockedStatement = mock(PreparedStatement.class);
        this.mockedResult = mock(ResultSet.class);
        this.mockedStatement = mock(PreparedStatement.class);
        DatabaseProperties mockedDBProperties = mock(DatabaseProperties.class);

        when(mockedDBProperties.getConnection()).thenReturn(mockedConnection);
        when(mockedConnection.prepareStatement(anyString())).thenReturn(mockedStatement);
        when(mockedConnection.prepareStatement(anyString(), anyInt())).thenReturn(mockedStatement);

        when(mockedDBProperties.connectionString()).thenReturn("jdbc:mysql://regterscdb.cxviwqvwghdq.eu-central-1.rds.amazonaws.com:3306/regtertestdata?user=admin&password=BroodjeKaas&serverTimeZone=UTC");

        this.sut = new RaceDataDAO(mockedDBProperties);
    }

    @Test
    public void findAll_ReturnsListOfRaceDataDTO() throws SQLException {
        // Arrange
        when(mockedStatement.executeQuery()).thenReturn(mockedResult);
        when(mockedResult.next()).thenReturn(true, false);
        when(mockedResult.getString(anyString())).thenReturn("Test");

        // Act
        List<RaceDataDTO> result = sut.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(1000, result.size());
    }

    @Test
    void findAll_ReturnsAllData_WhenInfoExists() throws SQLException {
        //Arrange
        RaceDataDTO expectedInfo = new RaceDataDTO(ROWID, SENSORID, TIME, RACECAR, VALUE);
        when(mockedResult.next()).thenReturn(true);
        when(mockedResult.getInt("ID")).thenReturn((ROWID));
        when(mockedResult.getInt("Base_ID")).thenReturn(SENSORID);
        when(mockedResult.getString("Time")).thenReturn(TIME);
        when(mockedResult.getString("users_username")).thenReturn(RACECAR);
        when(mockedResult.getString("Value")).thenReturn(VALUE);

        //Act
        List<RaceDataDTO> actualInfo = this.sut.findAll();
        RaceDataDTO firstRaceDataDTO = actualInfo.get(0);

        //Assert
        assertFalse(actualInfo.isEmpty()); // Check if the list is not empty
        assertEquals(expectedInfo.getId(), firstRaceDataDTO.getId());
        assertEquals(expectedInfo.getSensorID(), firstRaceDataDTO.getSensorID());
        assertEquals(expectedInfo.getTime(), firstRaceDataDTO.getTime());
        assertEquals(expectedInfo.getRaceCar(), firstRaceDataDTO.getRaceCar());
        assertEquals(expectedInfo.getValue(), firstRaceDataDTO.getValue());
    }

    @Test
    void findWhereSensorIsOnDate_ReturnsDataOnASpecificTime_IfThereIsInfo() throws SQLException {
        //Arrange
        RaceDataDTO expectedInfo = new RaceDataDTO(ROWID, SENSORID, TIME, RACECAR, VALUE);
        when(mockedResult.next()).thenReturn(true);
        when(mockedResult.getInt("ID")).thenReturn((ROWID));
        when(mockedResult.getInt("Base_ID")).thenReturn(SENSORID);
        when(mockedResult.getString("Time")).thenReturn(TIME);
        when(mockedResult.getString("users_username")).thenReturn(RACECAR);
        when(mockedResult.getString("Value")).thenReturn(VALUE);

        //Act
        List<RaceDataDTO> actualInfo = this.sut.findWhereSensorIsOnDate(SENSORID, TIME, RACECAR);
        RaceDataDTO firstRaceDataDTO = actualInfo.get(0);

        //Assert
        assertFalse(actualInfo.isEmpty()); // Check if the list is not empty
        assertEquals(expectedInfo.getId(), firstRaceDataDTO.getId());
        assertEquals(expectedInfo.getSensorID(), firstRaceDataDTO.getSensorID());
        assertEquals(expectedInfo.getTime(), firstRaceDataDTO.getTime());
        assertEquals(expectedInfo.getRaceCar(), firstRaceDataDTO.getRaceCar());
        assertEquals(expectedInfo.getValue(), firstRaceDataDTO.getValue());
    }

    @Test
    void findNewDataWhereSensorIs() throws SQLException {
        //Arrange
        RaceDataDTO expectedInfo = new RaceDataDTO(ROWID, SENSORID, TIME, RACECAR, VALUE);
        when(mockedResult.next()).thenReturn(true);
        when(mockedResult.getInt("Base_ID")).thenReturn(SENSORID);
        when(mockedResult.getString("users_username")).thenReturn(RACECAR);

        //Act
        List<RaceDataDTO> actualInfo = this.sut.findNewDataWhereSensorIs(SENSORID,RACECAR);
        RaceDataDTO firstRaceDataDTO = actualInfo.get(0);

        //Assert
        assertFalse(actualInfo.isEmpty());
        assertEquals(expectedInfo.getId(), firstRaceDataDTO.getId());
        assertEquals(expectedInfo.getSensorID(), firstRaceDataDTO.getSensorID());
        assertEquals(expectedInfo.getTime(), firstRaceDataDTO.getTime());
        assertEquals(expectedInfo.getRaceCar(), firstRaceDataDTO.getRaceCar());
        assertEquals(expectedInfo.getValue(), firstRaceDataDTO.getValue());
    }

    @Test
    void findWhereSensorIsOnDay() throws SQLException {
        //Arrange
        RaceDataDTO expectedInfo = new RaceDataDTO(ROWID, SENSORID, TIME, RACECAR, VALUE);
        when(mockedResult.next()).thenReturn(true);
        when(mockedResult.getInt("Base_ID")).thenReturn(SENSORID);
        when(mockedResult.getString("Time")).thenReturn(TIME);
        when(mockedResult.getString("users_username")).thenReturn(RACECAR);

        //Act
        List<RaceDataDTO> actualInfo = this.sut.findWhereSensorIsOnDate(SENSORID, TIME, RACECAR);
        RaceDataDTO firstRaceDataDTO = actualInfo.get(0);

        //Assert
        assertFalse(actualInfo.isEmpty());
        assertEquals(expectedInfo.getId(), firstRaceDataDTO.getId());
        assertEquals(expectedInfo.getSensorID(), firstRaceDataDTO.getSensorID());
        assertEquals(expectedInfo.getTime(), firstRaceDataDTO.getTime());
        assertEquals(expectedInfo.getRaceCar(), firstRaceDataDTO.getRaceCar());
        assertEquals(expectedInfo.getValue(), firstRaceDataDTO.getValue());
    }

    @Test
    void findWhereSensorIsBetweenDate_ReturnsData_IfInfoExists() throws SQLException {
        //Arrange
        RaceDataDTO expectedInfo = new RaceDataDTO(ROWID, SENSORID, TIME, RACECAR, VALUE);
        when(mockedResult.next()).thenReturn(true);
        when(mockedResult.getInt("ID")).thenReturn((ROWID));
        when(mockedResult.getInt("Base_ID")).thenReturn(SENSORID);
        when(mockedResult.getString("Time")).thenReturn(TIME);
        when(mockedResult.getString("users_username")).thenReturn(RACECAR);
        when(mockedResult.getString("Value")).thenReturn(VALUE);

        //Act
        List<RaceDataDTO> actualInfo = this.sut.findWhereSensorIsBetweenDate(SENSORID, TIME, TIME, RACECAR);
        RaceDataDTO firstRaceDataDTO = actualInfo.get(0);

        //Assert
        assertFalse(actualInfo.isEmpty());
        assertEquals(expectedInfo.getId(), firstRaceDataDTO.getId());
        assertEquals(expectedInfo.getSensorID(), firstRaceDataDTO.getSensorID());
        assertEquals(expectedInfo.getTime(), firstRaceDataDTO.getTime());
        assertEquals(expectedInfo.getRaceCar(), firstRaceDataDTO.getRaceCar());
        assertEquals(expectedInfo.getValue(), firstRaceDataDTO.getValue());
    }

    @Test
    void findAllCars_ReturnsListOfRaceCarNames_IfInfoExists() throws SQLException {
        //Arrange
        when(mockedResult.next()).thenReturn(true, true, false);
        when(mockedResult.getString("users_username")).thenReturn(RACECAR, "AnotherRaceCar");

        //Act
        List<String> actualRaceCars = this.sut.findAllCars();

        //Assert
        assertFalse(actualRaceCars.isEmpty());
        assertEquals(2, actualRaceCars.size());
        assertTrue(actualRaceCars.contains(RACECAR));
    }
}