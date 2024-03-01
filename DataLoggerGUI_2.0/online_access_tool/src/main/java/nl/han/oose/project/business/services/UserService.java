package nl.han.oose.project.business.services;

import nl.han.oose.project.business.exceptions.UnauthorizedException;
import nl.han.oose.project.presentation.dto.UserDTO;

public interface UserService {
  public String login(String userName, String password) throws UnauthorizedException;
  public String verifyCredentials(UserDTO user, String password) throws UnauthorizedException;
  public UserDTO createUser(String username, String password);

}
