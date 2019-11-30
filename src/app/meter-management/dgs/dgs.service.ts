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
export class DgsService {

  constructor(private http: HttpClient) { }

  getAll() {
    const match = {};
    const pagination = { limit: 1000 };
    return this.http.post(`${environment.baseUrl}/dgs/list`, { match, pagination }, httpOptions)
      .pipe(
        map(data => {
          data['result'].map((item, index) => {
            item.sno = index + 1;
          });
          return data;
        }),
        // tap(data => console.log('Get dgs called\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  getDgById(id) {
    debugger
    return this.http.get(`${environment.baseUrl}/dgs/${id}`)
      .pipe(
        tap(data =>

          console.log('Get a dg called\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  createDg(user) {
    return this.http.post(`${environment.baseUrl}/dgs/create`, user, httpOptions)
      .pipe(
        tap(data => console.log('Added dg\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  updateDg(user) {
    return this.http.put(`${environment.baseUrl}/dgs/update`, user, httpOptions)
      .pipe(
        tap(data => console.log('update dg: ', JSON.stringify(data))),
        // Return the User on an update
        // map(() => user),
        catchError(this.errorHandler)
      );
  }

  deleteDg(id) {
    return this.http.delete(`${environment.baseUrl}/dgs/${id}`, httpOptions)
      .pipe(
        tap(data => console.log('deleted dg\n' + JSON.stringify(data))),
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
