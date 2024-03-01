package nl.han.oose.project.crosscutting_concerns;


import at.favre.lib.crypto.bcrypt.BCrypt;
import nl.han.oose.project.business.exceptions.UnauthorizedException;

public class Authentication {


     /**
      * Genereert een gehashte versie van het opgegeven wachtwoord met behulp van de library: BCrypt.
      *
      * @param password het wachtwoord dat gehasht moet worden
      * @return een gehashte representatie van het opgegeven wachtwoord
      */
     public String hashPassword(String password){
          return BCrypt.withDefaults().hashToString(12, password.toCharArray());
     }

     /**
      * Controleert of het opgegeven wachtwoord overeenkomt met de gehashte versie van het wachtwoord.
      *
      * @param password        het wachtwoord dat moet worden gecontroleerd
      * @param hashedPassword  de gehashte versie van het oorspronkelijke wachtwoord
      * @throws UnauthorizedException als het opgegeven wachtwoord onjuist is vergeleken met de gehashte versie
      */
     public void checkPassword(String password, String hashedPassword) {
          if (!BCrypt.verifyer().verify(password.toCharArray(), hashedPassword).verified) {
               throw new UnauthorizedException("The password you entered is incorrect.");
          }
     }


}
