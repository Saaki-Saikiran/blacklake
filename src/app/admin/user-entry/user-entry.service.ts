import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { User } from './user';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const match = { isActive: true };
    const pagination = { limit: 1000 };

    return this.http.post<User[]>(`${environment.baseUrl}/users/list`, { match, pagination }, httpOptions)
      .pipe(
        map(data => {
          data['result'].map((item, index) => {
            item.sno = index + 1;
          });
          return data;
        }),
        // tap(data => console.log('Get users called\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  getUser(id): Observable<User> {
    debugger
    return this.http.get<User>(`${environment.baseUrl}/users/${id}`)
      .pipe(
        tap(data =>

          console.log('Get a user called\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/users/create`, user, httpOptions)
      .pipe(
        tap(data => console.log('Added user\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  updateUser(user: User): Observable<{}> {
    return this.http.put<User>(`${environment.baseUrl}/users/update`, user, httpOptions)
      .pipe(
        tap(data => console.log('updateUser: ', JSON.stringify(data))),
        // Return the User on an update
        // map(() => user),
        catchError(this.errorHandler)
      );
  }

  deleteUser(id): Observable<{}> {
    return this.http.delete<User>(`${environment.baseUrl}/users/delete/${id}`, httpOptions)
      .pipe(
        tap(data => console.log('deleted user\n' + JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  getCompanies() {
    return this.http.get(`${environment.baseUrl}/company/list`)
      .pipe(
        map(data => {
          data['result'].map((item, index) => {
            item.sno = index + 1;
          });
          return data;
        }),
        catchError(this.errorHandler)
      );
  }

  // getCountries() {
  //   const match = { active: true };
  //   return this.http.post(`${environment.baseUrl}/country/list`, { match })
  //     .pipe(
  //       tap(data => console.log('deleted user\n' + JSON.stringify(data))),
  //       catchError(this.errorHandler)
  //     );
  // }

  // getStates(countryId: any) {
  //   const match = { country: countryId, active: true };
  //   return this.http.post(`${environment.baseUrl}/state/list`, { match })
  //     .pipe(
  //       tap(data => console.log('deleted user\n' + JSON.stringify(data))),
  //       catchError(this.errorHandler)
  //     );
  // }

  // getCitys(stateId: any) {
  //   const match = { state: stateId, active: true };
  //   return this.http.post(`${environment.baseUrl}/district/list`, { match })
  //     .pipe(
  //       tap(data => console.log('deleted user\n' + JSON.stringify(data))),
  //       catchError(this.errorHandler)
  //     );
  // }

  createCompany(company: any) {
    return this.http.post<User>(`${environment.baseUrl}/company/create`, company, httpOptions)
      .pipe(
        tap(data => console.log('Added company\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  updateCompany(company: any) {
    return this.http.put<User>(`${environment.baseUrl}/company/update`, company, httpOptions)
      .pipe(
        tap(data => console.log('update company: ', JSON.stringify(data))),
        // Return the User on an update
        // map(() => user),
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
