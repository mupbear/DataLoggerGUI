package nl.han.oose.project.business.exceptions;

import static java.net.HttpURLConnection.HTTP_NOT_FOUND;
public class UserNotFoundException extends RuntimeException {
     public static final int STATUS_CODE = HTTP_NOT_FOUND;

     public UserNotFoundException(String message) {
          super(message);
     }
}
