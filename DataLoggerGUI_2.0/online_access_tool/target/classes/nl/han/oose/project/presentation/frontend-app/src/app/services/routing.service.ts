import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoutingService   {
  private defaultCarName : string = "raceCar01";
  private startDate = '2023-11-04%2012:00:00';
  private endDate = '2023-11-04%2021:00:00';

  constructor( private router: Router) {}

  public navigate(carName: string, startDateParam: string, endDateParam: string, sensorIdParam: string = ''): void {
    this.router.navigate([carName, startDateParam, endDateParam, sensorIdParam]);
  }

  public navigateToDefaultUrl(): void {
    this.navigate(this.defaultCarName, this.startDate, this.endDate)
  }

  public navigateToLoginPage(): void {
    this.router.navigate(["/login"])
  }
}
