import {Component} from '@angular/core';
import {RoutingService} from "../services/routing.service";
import {ActivatedRoute, } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
isMenuOpen: boolean = false;
  constructor(private routingService: RoutingService, private route: ActivatedRoute) {}



  protected logOut(){
    localStorage.removeItem("user_id");
    this.routingService.navigateToLoginPage();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  protected navigate(sensorId: string){
    this.route.params.subscribe(params => {
      const carName = params['carName'];
      const startDateParam = params['startDate'];
      const endDateParam = params['endDate'];
      this.routingService.navigate(carName, startDateParam, endDateParam, sensorId)
    });
  }
}
