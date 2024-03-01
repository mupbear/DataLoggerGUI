import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import { DataRetrievalStrategy } from '../interfaces/DataRetrievalStrategy';

export class EndpointDataStrategy implements DataRetrievalStrategy {
  private carName: string = '';
  private startDateParam: string = '';
  private endDateParam: string = '';
  private sensorIdParam: string = '';
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  getData(): Observable<any> {
    this.route.params.subscribe(params => {
      this.carName = params['carName'];
      this.startDateParam = params['startDate'];
      this.endDateParam = params['endDate'];
      this.sensorIdParam = params['sensorId'];
    });

    const endpoint = `http://localhost:8080/online_access_tool/race-data?raceCarName=${this.carName}&startTime=${this.startDateParam}&endTime=${this.endDateParam}&sensorID=${this.sensorIdParam}`;

    return this.http.get(endpoint);
  }
  getDataObservable(): Observable<any> {
    return this.getData();
  }
  startDataFetching() {
  }
  stopDataFetching() {
  }
}
