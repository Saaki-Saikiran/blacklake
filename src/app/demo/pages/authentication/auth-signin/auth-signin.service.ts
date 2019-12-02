import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ providedIn: 'root' })
export class AuthSigninService {
  constructor(private httpClient: HttpClient, public router: Router) { }

  login(username: string, password: string) {
    return this.httpClient.post<any>(`${environment.baseUrl}/users/auth/login`, { username, password }, httpOptions)
      .pipe(map
        (user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            console.log(user);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('loggedUser', JSON.stringify(user));
          }

          return user;
        }),
        catchError(this.errorHandler)
      );
  }
  ChangePassworrd(currentPassword: string, newPassword: string) {
    return this.httpClient.put<any>(`${environment.baseUrl}/users/changePassword`, { currentPassword, newPassword }, httpOptions)
      .pipe(map
        (user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            console.log(user);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('loggedUser', JSON.stringify(user));
          }

          return user;
        }),
        catchError(this.errorHandler)
      );
  }
  ResetPassworrd(email: string) {
    return this.httpClient.post<any>(`${environment.baseUrl}/users/forgotPassword`, { email }, httpOptions)
      .pipe(map
        (user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            console.log(user);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('loggedUser', JSON.stringify(user));
          }

          return user;
        }),
        catchError(this.errorHandler)
      );
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // forgotPassword(email: string) {
  //   return this.httpClient.post<any>(`${environment.baseUrl}/users/forgotPassword`, { email })
  //     .pipe(map
  //       (data => { return data; }),
  //       catchError(this.errorHandler)
  //     );
  // }

  public get loggedIn(): boolean {
    return (localStorage.getItem('loggedUser') !== null);
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
