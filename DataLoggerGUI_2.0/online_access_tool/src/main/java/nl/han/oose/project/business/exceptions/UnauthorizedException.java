package nl.han.oose.project.business.exceptions;


import static java.net.HttpURLConnection.*;

public class UnauthorizedException extends RuntimeException{
     public static final int STATUS_CODE = HTTP_UNAUTHORIZED;
     public UnauthorizedException(String message) {
          super(message);
     }
}
