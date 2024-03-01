import { ActivatedRoute } from '@angular/router';
import {Observable, map, of} from "rxjs";
import {DataRetrievalStrategy} from "../interfaces/DataRetrievalStrategy";

class LocalDataStrategy implements DataRetrievalStrategy {
  constructor(private route: ActivatedRoute) {}
  getData(): Observable<any> {
    const startTimeParam: string = this.route.snapshot.params['startTime'];
    const endTimeParam: string = this.route.snapshot.params['endTime'];

    const startTime: Date = new Date(startTimeParam);
    const endTime: Date = new Date(endTimeParam);

    const timeValues1: Date[] = this.generateTimeValues(startTime, endTime, 8);
    const yValues1: number[] = this.generateRandomValues(8);

    const timeValues2: Date[] = this.generateTimeValues(startTime, endTime, 8);
    const yValues2: number[] = this.generateRandomValues(8);

    const timeValues3: Date[] = this.generateTimeValues(startTime, endTime, 7); // Fewer points for variety
    const yValues3: number[] = this.generateRandomValues(7);

    const yourLocalData = {
      dataset1: { x: timeValues1, y: yValues1 },
      dataset2: { x: timeValues2, y: yValues2 },
      dataset3: { x: timeValues3, y: yValues3 },
    };

    return of(yourLocalData);
  }

  getDataObservable(): Observable<any> {
    return this.getData().pipe(
      map(localData => {
        return {
          sensors: [
            { sensorName: 'RPM', time: localData.dataset1.x, value: localData.dataset1.y },
            { sensorName: 'TPS', time: localData.dataset2.x, value: localData.dataset2.y },
            { sensorName: 'IAT', time: localData.dataset3.x, value: localData.dataset3.y },
          ]
        };
      })
    );
  }

  private generateTimeValues(startTime: Date, endTime: Date, count: number): Date[] {
    const timeValues: Date[] = [];
    const timeInterval = (endTime.getTime() - startTime.getTime()) / (count - 1);

    for (let i = 0; i < count; i++) {
      const time = new Date(startTime.getTime() + i * timeInterval);
      timeValues.push(time);
    }

    return timeValues;
  }


  private generateRandomValues(count: number): number[] {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 20) + 1);
  }
  startDataFetching() {
  }
  stopDataFetching() {
  }
}

export default LocalDataStrategy;
