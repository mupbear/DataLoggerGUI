package nl.han.oose.project.business.services;

import jakarta.enterprise.inject.Default;
import jakarta.inject.Inject;
import nl.han.oose.project.business.exceptions.UnauthorizedException;
import nl.han.oose.project.crosscutting_concerns.Authentication;
import nl.han.oose.project.datasource.DAO.IUserDao;
import nl.han.oose.project.presentation.dto.UserDTO;

@Default
public class UserServiceImpl implements UserService {
    private IUserDao userDAO;
    private Authentication authentication;

    @Inject
    public void setUserDAO(IUserDao userDAO) {
        this.userDAO = userDAO;
    }

    @Inject
    public void setAuthentication(Authentication authentication) {this.authentication = authentication;}

    /**
     * Verifies the user login credentials and returns the user ID if the login credentials are valid.
     *
     *
     * @param username de gebruikersnaam van de gebruiker die wil inloggen
     * @param password het wachtwoord dat bij de gebruikersnaam hoort
     * @return de gebruikers-ID als de inloggegevens geldig zijn
     * @throws UnauthorizedException als de gebruikersnaam en wachtwoord combinatie niet juist is
     */
    @Override
    public String login(String username, String password)  {
        UserDTO existingUser = userDAO.findByUsername(username);
        if (existingUser != null){
            return verifyCredentials(existingUser, password);
        }
        else {
            throw new UnauthorizedException("Username and/or password was invalid");
        }
    }

    /**
     * Controleert of het opgegeven wachtwoord overeenkomt met het opgeslagen hashed wachtwoord in de database.
     *
     * @param user     het UserDTO-object van de gebruiker waarvan het wachtwoord wordt gecontroleerd
     * @param password het wachtwoord dat moet worden geverifieerd
     * @return de gebruikers-ID als de verificatie succesvol is
     * @throws UnauthorizedException als de verstrekte inloggegevens onjuist zijn
     */
    @Override
    public String verifyCredentials(UserDTO user, String password) throws UnauthorizedException {
        authentication.checkPassword(password, user.getPassword());
        return user.getId();
    }

    /**
     * Creëert een nieuwe gebruiker met de opgegeven gebruikersnaam en wachtwoord en voegt deze toe aan de database.
     *
     * @param username de gebruikersnaam van de nieuwe gebruiker
     * @param password het wachtwoord van de nieuwe gebruiker
     * @return een UserDTO-object van de aangemaakte gebruiker
     */
    @Override
    public UserDTO createUser(String username, String password) {
        String hashedPass = authentication.hashPassword(password);
        UserDTO newUser = new UserDTO(username, hashedPass);
        userDAO.insertUser(newUser);
        return newUser;
    }

}
