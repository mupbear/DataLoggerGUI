package nl.han.oose.project.datasource.DAO;
import nl.han.oose.project.business.exceptions.UserNotFoundException;
import nl.han.oose.project.datasource.util.DatabaseProperties;
import nl.han.oose.project.presentation.dto.UserDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class UserDAOTest {
     private static final String USERNAME = "testUser";
     private static final String PASSWORD = "testPass";
     private static final String ID = "34";
     private IUserDao sut;
     private DatabaseProperties mockedDBProperties;
     private Connection mockedConnection;
     private PreparedStatement mockedStatement;
     private ResultSet mockedResultset;

     /**
      * Setup method for initializing the necessary components and configuring mocks before each test in the UserDAO class.
      * This method creates mock objects for Connection, PreparedStatement, ResultSet, and DatabaseProperties,
      * and configures the mocks to provide valid responses during testing.
      * The System Under Test (SUT) is instantiated with a mocked DatabaseProperties instance.
      *
      * @throws SQLException If there is an error in setting up the mocks related to SQL operations.
      */
     @BeforeEach
     public void setup() throws SQLException {
          this.mockedConnection = mock(Connection.class);
          this.mockedStatement = mock(PreparedStatement.class);
          this.mockedResultset = mock(ResultSet.class);
          this.mockedDBProperties = mock(DatabaseProperties.class);

          when(mockedDBProperties.getConnection()).thenReturn(mockedConnection);
          when(mockedConnection.prepareStatement(anyString())).thenReturn(mockedStatement);
          when(mockedConnection.prepareStatement(anyString(), anyInt())).thenReturn(mockedStatement);

          this.sut = new UserDAO(mockedDBProperties);
     }

     @Test
     public void findByUsername_ThrowsUserNotFoundException_WhenUserDoesntExists() throws SQLException {
          // Arrange
          String expectedMessage = "No user found with the provided username";
          when(mockedStatement.executeQuery()).thenReturn(mockedResultset);
          when(mockedResultset.next()).thenReturn(false);

          // Act
          Exception exception = assertThrows(UserNotFoundException.class, () -> this.sut.findByUsername(USERNAME));

          // Assert
          assertEquals(expectedMessage, exception.getMessage());
     }

     @Test
     public void findByUsername_shouldThrowRuntimeException() throws SQLException {
          // Arrange
          when(mockedStatement.executeQuery()).thenThrow(SQLException.class);

          // Act & Assert
          assertThrows(RuntimeException.class, () -> sut.findByUsername(USERNAME));
     }

     @Test
     public void insertUser_ExecutesCorrectly() throws SQLException {
          // Arrange
          UserDTO user = new UserDTO(USERNAME, PASSWORD, ID);
          when(mockedStatement.executeUpdate()).thenReturn(1);

          // Act
          this.sut.insertUser(user);

          // Assert
          verify(mockedStatement).setString(1, user.getUsername());
          verify(mockedStatement).setString(2, user.getPassword());
     }
}