package nl.han.oose.project.presentation.exception_mappers;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import nl.han.oose.project.business.exceptions.UserNotFoundException;

@Provider
public class UserNotFoundExceptionMapper implements ExceptionMapper<UserNotFoundException> {
     /**
      * Zorgt voor een automatische response bij het optreden van een UserNotFoundException.
      *
      * @param e de UserNotFoundException die is opgetreden
      * @return een HTTP-respons met de status en bericht van de UserNotFoundException
      */
     @Override
     public Response toResponse(UserNotFoundException e) {
          return Response.status(UserNotFoundException.STATUS_CODE).entity(e.getMessage()).build();
     }
}
