package nl.han.oose.project.presentation.exception_mappers;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import nl.han.oose.project.business.exceptions.UnauthorizedException;

@Provider
public class UnauthorizedExceptionMapper implements ExceptionMapper<UnauthorizedException> {

     /**
      * Zorgt voor een automatische response bij het optreden van een UnauthorizedException.
      *
      * @param e de UnauthorizedException die is opgetreden
      * @return een HTTP-respons met de status en bericht van de UnauthorizedException
      */
     @Override
     public Response toResponse(UnauthorizedException e) {
          return Response.status(UnauthorizedException.STATUS_CODE).entity(e.getMessage()).build();
     }
}
