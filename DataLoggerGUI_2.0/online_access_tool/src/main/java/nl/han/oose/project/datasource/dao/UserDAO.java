package nl.han.oose.project.datasource.DAO;
import jakarta.inject.Inject;
import nl.han.oose.project.business.exceptions.DatabaseException;
import nl.han.oose.project.business.exceptions.UserNotFoundException;
import nl.han.oose.project.datasource.util.DatabaseProperties;
import nl.han.oose.project.presentation.dto.UserDTO;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDAO implements IUserDao {
     private final DatabaseProperties databaseProperties;

     @Inject
     public UserDAO(DatabaseProperties databaseProperties) {
          this.databaseProperties = databaseProperties;
     }

     /**
      * Searches for a user with their username.
      *
      * @param username de gebruikersnaam van de te zoeken gebruiker
      * @return een UserDTO-object met informatie over de gevonden gebruiker
      * @throws UserNotFoundException als er geen gebruiker wordt gevonden met de opgegeven gebruikersnaam
      * @throws RuntimeException      als er een SQL-fout optreedt tijdens het uitvoeren van de zoekopdracht
      */
     @Override
     public UserDTO findByUsername(String username) {
          UserDTO user = new UserDTO();
          String findByUsernameQuery = "SELECT * FROM users WHERE username = ?";

          try (PreparedStatement statement = databaseProperties.getConnection().prepareStatement(findByUsernameQuery)) {
               statement.setString(1, username);
               try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                         String name = resultSet.getString("username");
                         String id = resultSet.getString("id");
                         String pass = resultSet.getString("password");

                         user.setId(id);
                         user.setUsername(name);
                         user.setPassword(pass);
                    } else {
                         throw new UserNotFoundException("No user found with the provided username");
                    }
               }
          } catch (SQLException e) {
               throw new DatabaseException("An error occurred with the database", e);
          }
          return user;
     }


     /**
      * Add a new user to the database.
      *
      * @param user een UserDTO-object dat de informatie van de nieuwe gebruiker bevat
      * @throws RuntimeException als er een SQL-fout optreedt tijdens het uitvoeren van de insert-operatie
      */
     @Override
     public void insertUser(UserDTO user) {
          try {
               PreparedStatement preparedStatement = databaseProperties.getConnection().prepareStatement("INSERT INTO users (username, password) VALUES (?, ?)");
               preparedStatement.setString(1, user.getUsername());
               preparedStatement.setString(2, user.getPassword());
               preparedStatement.executeUpdate();
          } catch (SQLException e) {
               throw new DatabaseException("An error occurred with the database", e);
          }
     }
}
