package nl.han.oose.project.presentation.resources;
import jakarta.ws.rs.core.Response;
import nl.han.oose.project.business.exceptions.UnauthorizedException;
import nl.han.oose.project.business.services.UserService;
import nl.han.oose.project.presentation.dto.LoginRequestDTO;
import nl.han.oose.project.presentation.dto.UserDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static java.net.HttpURLConnection.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class LoginResourceTest {
     private static final String USERNAME = "testUser";
     private static final String PASSWORD = "testPass";
     private static final String ID = "34";
     private final UserDTO USER_DTO = new UserDTO(USERNAME, PASSWORD);
     private final LoginRequestDTO LOGIN_REQUEST = new LoginRequestDTO(USERNAME, PASSWORD);
     private LoginResource sut;
     private UserService mockedUserService;

     @BeforeEach
     public void setup() {
          this.sut = new LoginResource();
          this.mockedUserService = mock(UserService.class);
          this.sut.setUserService(this.mockedUserService);
     }

     @Test
     public void authenticateUser_CallsLogin_FromUserService() {
          // Act
          this.sut.authenticateUser(LOGIN_REQUEST);

          //Assert
          verify(mockedUserService).login(USERNAME, PASSWORD);

     }

     @Test
     public void authenticateUser_ReturnsStatus200_WhenLoginIsSuccessful() {
          // Arrange
          when(mockedUserService.login(USERNAME, PASSWORD)).thenReturn(ID);

          // Act
          Response response = sut.authenticateUser(LOGIN_REQUEST);

          // Assert
          assertEquals(HTTP_OK, response.getStatus());
          assertEquals(ID, response.getEntity());
     }

     @Test
     public void authenticateUser_ReturnsStatus401_WhenPasswordIsIncorrect() {
          // Arrange
          String expectedErrorMsg = "The password you entered is incorrect.";
          when(mockedUserService.login(USERNAME, PASSWORD)).thenThrow(new UnauthorizedException("The password you entered is incorrect."));

          Exception exception = assertThrows(UnauthorizedException.class, () -> {
               sut.authenticateUser(LOGIN_REQUEST);
          });

          //Assert
          assertEquals(UnauthorizedException.class, exception.getClass());
          assertEquals(HTTP_UNAUTHORIZED, UnauthorizedException.STATUS_CODE);
          assertEquals(expectedErrorMsg, exception.getMessage());
     }

     @Test
     public void createNewUser_CallsCreateUser_FromUserService() {

          when(mockedUserService.createUser(USERNAME, PASSWORD)).thenReturn(USER_DTO);
          // Act
          this.sut.createNewUser(USER_DTO);

          //Assert
          verify(mockedUserService).createUser(USER_DTO.getUsername(), USER_DTO.getPassword());
     }
}