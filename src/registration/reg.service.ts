import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegService {


  constructor(private http: HttpClient) { }

  private registrationUrl = 'https://localhost:7089/api/register';
  register(userData: any): Observable<any> {
    return this.http.post<any>(this.registrationUrl, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  private loginUrl = 'https://localhost:7089/api/login';
  login(loginUserData: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginUserData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  private getcarUrl = 'https://localhost:7089/api/Car/list';
  getcar(SearchByModelName: string, SearchByModelCode: string, OrderbyManufacturingDate: boolean = true, SortByUpdatedDate: boolean = true): Observable<any> {
    const cardata = {
      SearchByModelName,
      SearchByModelCode,
      OrderbyManufacturingDate,
      SortByUpdatedDate
    };
    return this.http.post<any>(this.getcarUrl, cardata, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
