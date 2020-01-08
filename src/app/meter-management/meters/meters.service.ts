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
export class MetersService {

  constructor(private http: HttpClient) { }

  getAll() {
    const match = {};
    const pagination = { limit: 1000 };
    return this.http.post(`${environment.baseUrl}/meters/list`, { match, pagination }, httpOptions)
      .pipe(
        map(data => {
          data['result'].map((item, index) => {
            item.sno = index + 1;
          });
          return data;
        }),
        // tap(data => console.log('Get meters called\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  getMetersForMapMeterTenant() {
    const match = { "assignedToTenant": false };
    const pagination = { limit: 1000 };
    return this.http.post(`${environment.baseUrl}/meters/list`, { match, pagination }, httpOptions)
      .pipe(
        map(data => {
          data['result'].map((item, index) => {
            item.sno = index + 1;
          });
          return data;
        }),
        // tap(data => console.log('Get meters called\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  createMeter(user) {
    return this.http.post(`${environment.baseUrl}/meters/create`, user, httpOptions)
      .pipe(
        tap(data => console.log('Added meter\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  updateMeter(user) {
    return this.http.put(`${environment.baseUrl}/meters/update`, user, httpOptions)
      .pipe(
        tap(data => console.log('updateMeter: ', JSON.stringify(data))),
        // Return the User on an update
        // map(() => user),
        catchError(this.errorHandler)
      );
  }

  deleteMeter(id) {
    return this.http.delete(`${environment.baseUrl}/meters/${id}`, httpOptions)
      .pipe(
        tap(data => console.log('deleted meter\n' + JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  private errorHandler(err: HttpErrorResponse) {
    let errorMessage = '';
    debugger
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, Error Message: ${err.statusText}`;
    }
    return throwError(errorMessage);
  }
}
