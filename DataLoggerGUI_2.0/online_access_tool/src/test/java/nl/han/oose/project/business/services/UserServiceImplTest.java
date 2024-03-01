package nl.han.oose.project.business.services;

import nl.han.oose.project.crosscutting_concerns.Authentication;
import nl.han.oose.project.datasource.DAO.IUserDao;
import nl.han.oose.project.presentation.dto.UserDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

     private UserServiceImpl sut;
     private nl.han.oose.project.datasource.DAO.IUserDao mockedUserDAO;
     private Authentication mockedAuth;
     private final String USERNAME = "testusername";
     private final String PASSWORD = "testpassword";
     private final String ID = "2347";
     private UserDTO user = new UserDTO(USERNAME, PASSWORD, ID);

     @BeforeEach
     public void setup(){
          this.sut = new UserServiceImpl();
          this.mockedUserDAO = mock(IUserDao.class);
          this.mockedAuth = mock(Authentication.class);
          this.sut.setAuthentication(mockedAuth);
          this.sut.setUserDAO(mockedUserDAO);
     }

     @Test
     public void login_CallsFindByUsername_FromUserDAO(){
          when(mockedUserDAO.findByUsername(USERNAME)).thenReturn(user);
          this.sut.login(

               USERNAME, PASSWORD);

          // Assert
          verify(mockedUserDAO).findByUsername(USERNAME);
     }


     @Test
     public void createNewUser_ReturnsUserObject_WithHashedPassword(){
          // Act
          UserDTO response = this.sut.createUser(USERNAME, PASSWORD);

          // Assert
          assertEquals(USERNAME, response.getUsername());
          assertNotEquals(PASSWORD, response.getPassword());
     }

     @Test
     public void createNewUser_CallsHashPassword_FromAuthentication(){
          // Act
          this.sut.createUser(USERNAME, PASSWORD);

          // Assert
          verify(mockedAuth).hashPassword(PASSWORD);
     }

}