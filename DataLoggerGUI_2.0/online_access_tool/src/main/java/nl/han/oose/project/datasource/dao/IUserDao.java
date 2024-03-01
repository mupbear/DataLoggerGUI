package nl.han.oose.project.datasource.DAO;

import nl.han.oose.project.presentation.dto.UserDTO;

public interface IUserDao {
  public UserDTO findByUsername(String username);
  public void insertUser(UserDTO user);
}