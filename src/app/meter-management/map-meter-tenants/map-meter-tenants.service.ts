import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MapMeterTenantsService {

  constructor(private http: HttpClient) { }

  getAll() {
    const match = {};
    const pagination = { limit: 1000 };
    return this.http.post(`${environment.baseUrl}/mapmetertenant/list`, { match, pagination }, httpOptions)
      .pipe(
        map(data => {
          data['result'].map((item, index) => {
            // console.log(item.tenantID);
            item.sno = index + 1;
            if (item.tenantID != null) {
              console.log(item.tenantID);
              item.tenantName = item.tenantID.tenantName;
              item.tenantStatus = item.tenantID.active;
            }
            if ((item.inactiveTenant != '') && (item.inactiveTenant != undefined)) {
              console.log(item.inactiveTenant, '--------inactiveTenant--------');
              item.tenantName = item.inactiveTenant;
              item.tenantStatus = false;
            }
          });
          console.log(data);
          return data;
        }),
        // tap(data => console.log('Get mapmetertenant called\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  getMeterById(id) {
    return this.http.get(`${environment.baseUrl}/mapmetertenant/${id}`)
      .pipe(
        tap(data =>

          console.log('Get a meter called\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  createMeter(user) {
    return this.http.post(`${environment.baseUrl}/mapmetertenant/create`, user, httpOptions)
      .pipe(
        tap(data => console.log('Added meter\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  updateMeter(user) {
    console.log(user, '===================');
    return this.http.put(`${environment.baseUrl}/mapmetertenant/update`, user, httpOptions)
      .pipe(
        tap(data => console.log('updateMeter: ', JSON.stringify(data))),
        // Return the User on an update
        // map(() => user),
        catchError(this.errorHandler)
      );
  }

  deleteMeter(id) {
    return this.http.delete(`${environment.baseUrl}/mapmetertenant/${id}`, httpOptions)
      .pipe(
        tap(data => console.log('deleted meter\n' + JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  private errorHandler(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, Error Message: ${err.statusText}`;
    }
    return throwError(errorMessage);
  }
}
