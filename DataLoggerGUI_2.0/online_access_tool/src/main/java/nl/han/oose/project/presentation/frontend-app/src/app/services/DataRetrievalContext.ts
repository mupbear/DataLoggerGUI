import { DataRetrievalStrategy } from "../interfaces/DataRetrievalStrategy";
import { Observable } from "rxjs";  // Make sure to import Observable if not imported

export class DataRetrievalContext {
  private strategy: DataRetrievalStrategy;

  constructor(initialStrategy: DataRetrievalStrategy) {
    this.strategy = initialStrategy;
  }

  public setStrategy(newStrategy: DataRetrievalStrategy) {
    this.strategy = newStrategy;
  }

  public getDataObservable(): Observable<any> {
    return this.strategy.getDataObservable();
  }
  public startDataFetch(){
    this.strategy.startDataFetching();
  }

  public stopDataFetch(){
    this.strategy.stopDataFetching()
  }
  public getStrategy(){
    return this.strategy
  }
}
