package nl.han.oose.project.presentation.dto;

public class UserDTO {
     private String username;
     private String password;
     private String id;

     public UserDTO( ) {
     }

     public UserDTO(String username, String password) {
          this.username = username;
          this.password = password;
     }

     public UserDTO(String username, String password, String id) {
     }

     public String getId() {
          return id;
     }

     public void setId(String id) {
          this.id = id;
     }

     public String getUsername() {
          return username;
     }

     public void setUsername(String username) {
          this.username = username;
     }

     public String getPassword() {
          return password;
     }

     public void setPassword(String password) {
          this.password = password;
     }
}
