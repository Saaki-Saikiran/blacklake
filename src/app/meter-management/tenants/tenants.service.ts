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
export class TenantsService {

  constructor(private http: HttpClient) { }
  getAll() {
    debugger
    const match = { active: true };
    const pagination = { limit: 1000 };
    return this.http.post(`${environment.baseUrl}/tenants/list`, { match, pagination }, httpOptions)
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

  createTenant(user) {
    return this.http.post(`${environment.baseUrl}/tenants/create`, user, httpOptions)
      .pipe(
        tap(data => console.log('Added user\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  updateTenant(user) {
    return this.http.put(`${environment.baseUrl}/tenants/update`, user, httpOptions)
      .pipe(
        tap(data => console.log('updateUser: ', JSON.stringify(data))),
        // Return the User on an update
        // map(() => user),
        catchError(this.errorHandler)
      );
  }

  deleteTenant(id) {
    return this.http.delete(`${environment.baseUrl}/tenants/${id}`, httpOptions)
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
