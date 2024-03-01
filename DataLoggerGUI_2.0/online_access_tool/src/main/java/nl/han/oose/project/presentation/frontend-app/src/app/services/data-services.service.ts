import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  constructor(private http:HttpClient) {}

  public postData(body: any, path: string)
  {
    return this.http.post(`http://localhost:8080/online_access_tool/${path}`, body);
  }

  getData(body: any, path: string)
  {
    return this.http.get(`http://localhost:8080/online_access_tool/${path}`, body);
  }
}
