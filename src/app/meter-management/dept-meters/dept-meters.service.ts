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
export class DeptMetersService {

  constructor(private http: HttpClient) { }
  getAll() {
    const match = { active: true };
    const pagination = { limit: 1000 };
    return this.http.post(`${environment.baseUrl}/deptmeters/list`, { match, pagination }, httpOptions)
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
    debugger
    return this.http.get(`${environment.baseUrl}/metertypes/${id}`)
      .pipe(
        tap(data =>

          console.log('Get a user called\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  createDeptMeter(user) {
    return this.http.post(`${environment.baseUrl}/deptmeters/create`, user, httpOptions)
      .pipe(
        tap(data => console.log('Added user\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  updateDeptMeter(user) {
    return this.http.put(`${environment.baseUrl}/deptmeters/update`, user, httpOptions)
      .pipe(
        tap(data => console.log('updateUser: ', JSON.stringify(data))),
        // Return the User on an update
        // map(() => user),
        catchError(this.errorHandler)
      );
  }

  deleteMeter(id) {
    return this.http.delete(`${environment.baseUrl}/deptmeters/${id}`, httpOptions)
      .pipe(
        tap(data => console.log('deleted user\n' + JSON.stringify(data))),
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
