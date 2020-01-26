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
export class MeterTypesService {

  constructor(private http: HttpClient) { }

  getAll() {
    const match = { active: true };
    const pagination = { limit: 1000 };
    return this.http.post(`${environment.baseUrl}/metertypes/list`, { match, pagination }, httpOptions)
      .pipe(
        map(data => {
          data['result'].map((item, index) => {
            item.sno = index + 1;
          });
          return data;
        }),
        // tap(data => console.log('Get metertypes called\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  getMeterTypeById(id) {
   
    return this.http.get(`${environment.baseUrl}/metertypes/${id}`)
      .pipe(
        tap(data =>

          console.log('Get a user called\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  createMeterType(user) {
    return this.http.post(`${environment.baseUrl}/metertypes/create`, user, httpOptions)
      .pipe(
        tap(data => console.log('Added user\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  updateMeterType(user) {
    return this.http.put(`${environment.baseUrl}/metertypes/update`, user, httpOptions)
      .pipe(
        tap(data => console.log('updateUser: ', JSON.stringify(data))),
        // Return the User on an update
        // map(() => user),
        catchError(this.errorHandler)
      );
  }

  deleteMeterType(id) {
    return this.http.delete(`${environment.baseUrl}/metertypes/${id}`, httpOptions)
      .pipe(
        tap(data => console.log('deleted user\n' + JSON.stringify(data))),
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
