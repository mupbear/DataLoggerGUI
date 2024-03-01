import {Observable} from "rxjs";

export interface DataRetrievalStrategy {
  getData(): Observable<any>;
  getDataObservable(): Observable<any>;
  startDataFetching() :void;
  stopDataFetching() :void;
}
