package nl.han.oose.project.presentation.resources;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import nl.han.oose.project.business.services.UserService;
import nl.han.oose.project.presentation.dto.LoginRequestDTO;
import nl.han.oose.project.presentation.dto.UserDTO;

@Path("/login")
public class LoginResource {
    private UserService userService;

    @Inject
    public void setUserService(UserService userService){
        this.userService = userService;
    }

    /**
     * API-resource die de inloggegevens van een gebruiker op basis van de inloggegevens en retourneert een gebruikers-ID als de inloggegevens geldig zijn.
     *
     * @param loginRequestDTO het LoginRequestDTO-object dat de inloggegevens van de gebruiker bevat
     * @return een HTTP-respons met de gebruikers-ID als de inloggegevens geldig zijn
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response authenticateUser(LoginRequestDTO loginRequestDTO)  {
        String id = userService.login(
                loginRequestDTO.getUsername(),
                loginRequestDTO.getPassword()
        );
        return Response
                .ok()
                .entity(id)
                .build();
    }

    /**
     * Maakt een nieuwe gebruiker aan op basis van de verstrekte gebruikersgegevens en retourneert een succesvolle response met informatie over de aangemaakte gebruiker.
     *
     * @param userDTO het UserDTO-object dat de gegevens van de nieuwe gebruiker bevat
     * @return een HTTP-respons met informatie over de aangemaakte gebruiker als het aanmaken succesvol is
     */
    @POST
    @Path("/new")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createNewUser(UserDTO userDTO)  {
        UserDTO newUser = userService.createUser(userDTO.getUsername(), userDTO.getPassword());
        return Response
                .ok()
                .entity("Created user: " + newUser.getUsername() + "with password: " + newUser.getPassword())
                .build();
    }
}