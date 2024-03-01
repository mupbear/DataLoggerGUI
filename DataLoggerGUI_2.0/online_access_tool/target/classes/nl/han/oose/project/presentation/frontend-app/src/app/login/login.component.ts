import { Component } from '@angular/core';
import {DataServicesService} from "../services/data-services.service";
import {RoutingService} from "../services/routing.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login {
  userLoginData = {
    "username": '',
    "password": ''
  }
  isUnauthorized : boolean = false;
  errorMsg: string = '';


  constructor(
    private dataServices:DataServicesService,
    private routingService: RoutingService
  ) {}

  /**
   * Performs a user login operation by sending user login data to the server.
   * Upon successful login, stores the user ID in the local storage and navigates to the home page.
   *
   * @remarks
   * This method utilizes `postData` from `dataServices` to send login data to the server.
   *
   */
  loginUser(): void {
    this.dataServices.postData(this.userLoginData,"login")
      .subscribe({
        next: (userId) => {
          localStorage.setItem("user_id", userId.toString())
        },
        error: (e) => {
          if(e.status === 401){
            this.isUnauthorized = true;
            this.errorMsg = "The provided username and password combination is invalid."
          } else if (e.status === 404){
            this.isUnauthorized = true;
            this.errorMsg = "No user found with the provided username."
          }
        },
        complete: () => {
          this.routingService.navigateToDefaultUrl();
        }
      });
  }
}
