import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../services/data-services.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RoutingService} from "../services/routing.service";

/**
 * Component responsible for displaying and selecting race cars.
 */
@Component({
  selector: 'app-carpicker',
  templateUrl: './carpicker.component.html',
  styleUrls: ['./carpicker.component.css']
})
export class CarpickerComponent implements OnInit {
  protected carNames: string[] = [];
  private carName: string = '';
  private startDateParam: string = '';
  private endDateParam: string = '';
  private sensorIdParam: string = '';

  constructor(private dataServices: DataServicesService,   private route: ActivatedRoute, private routingService: RoutingService) { }

  /**
   * Lifecycle hook called after Angular has initialized all data-bound properties.
   */
  ngOnInit(): void {
     this.route.params.subscribe(params => {
      this.carName = params['carName'];
      this.startDateParam = params['startDate'];
      this.endDateParam = params['endDate'];
      this.sensorIdParam = params['sensorId'];
    });
    this.getAllCars();
  }

  /**
   * Fetches the list of all available race cars.
   */
  protected getAllCars(): void {
    this.dataServices.getData("", "")
      .subscribe({
        next: (cars: any) => {
          this.carNames = cars;
        },
        error: (e) => {
          console.log(e.getMessage())
        },
        complete: () => {}
      });
  }

  setCarName(carName: string): void {
    this.carName = carName;
  }

  /**
   * Handler method triggered when a car name is clicked.
   * Sets the selected car name and navigates using RoutingService.
   *
   * @param carName - The selected car name.
   */
  protected onCarNameClick(carName: string): void {
    this.setCarName(carName);
    this.routingService.navigate(this.carName, this.startDateParam, this.endDateParam, this.sensorIdParam)
  }
}
