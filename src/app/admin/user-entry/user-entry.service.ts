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

  deleteUser(id): Observable<User> {
    return this.http.delete<User>(`${environment.baseUrl}/users/${id}`, httpOptions)
      .pipe(
        tap(),
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
