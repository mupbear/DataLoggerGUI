import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { DataRetrievalStrategy } from '../interfaces/DataRetrievalStrategy';
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root',
})
export class LiveDataRetrievalStrategy implements DataRetrievalStrategy {
  private pollingInterval = 3000;
  private timeoutId: any;
  private accumulatedData: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  public getData(): Observable<any> {
    const raceCarName: string = this.route.snapshot.params['raceCarName'];
    const startTime: string = this.route.snapshot.params['startTime'];
    const endTime: string = this.route.snapshot.params['endTime'];
    const sensorID: string = this.route.snapshot.params['sensorID'];

    const endpoint = `http://localhost:8080/online_access_tool/live-race-data?raceCarName=${raceCarName}&startTime=${startTime}&endTime=${endTime}&sensorID=${sensorID}`;

    return this.http.get(endpoint).pipe(
        catchError(error => {
          console.error('Error fetching data:', error);
          return throwError(error);
        })
    );
  }

  getDataObservable(): Observable<any> {
    return new Observable(observer => {
      this.fetchDataPeriodically(observer);
    });
  }

  private fetchDataPeriodically(observer: any) {
    this.getData().subscribe(
        data => {
          this.accumulatedData.push(data);
          observer.next(this.accumulatedData[this.accumulatedData.length - 1]);

          this.timeoutId = setTimeout(() => this.fetchDataPeriodically(observer), this.pollingInterval);
        },
        error => {
          console.error('Error fetching data:', error);

          this.timeoutId = setTimeout(() => this.fetchDataPeriodically(observer), this.pollingInterval);
        }
    );
  }

  startDataFetching() {
    this.getDataObservable().subscribe();
  }

  stopDataFetching() {
    clearTimeout(this.timeoutId);
  }
}
