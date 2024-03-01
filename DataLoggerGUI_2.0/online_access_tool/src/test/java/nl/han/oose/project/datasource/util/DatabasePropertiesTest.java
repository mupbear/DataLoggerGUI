package nl.han.oose.project.datasource.util;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import static org.junit.jupiter.api.Assertions.*;

public class DatabasePropertiesTest {
     private DatabaseProperties sut;
     private final String EXPECTED_CONNETIONSTRING = "jdbc:mysql://regterscdb.cxviwqvwghdq.eu-central-1.rds.amazonaws.com:3306/regtertestdata?user=admin&password=BroodjeKaas&serverTimeZone=UTC";

     @BeforeEach
     public void setup(){
          this.sut = new DatabaseProperties();
     }

//     @Test
//     public void testConnectReturnsConnection() throws SQLException {
//          Connection connection = sut.getConnection();
//          assertNotNull(connection);
//     }
//
//     @Test
//     public void testConnectCreatesWorkingConnection() throws SQLException {
//          Connection connection = sut.getConnection();
//          Statement stmt = connection.createStatement();
//          ResultSet rs = stmt.executeQuery("SELECT 1");
//          assertTrue(rs.next());
//          assertEquals(1, rs.getInt(1));
//     }

     @Test
     public void testIfCorrectConnectionStringGetsReturned(){
          String actualString = sut.connectionString();
          assertEquals(EXPECTED_CONNETIONSTRING, actualString);
     }
}