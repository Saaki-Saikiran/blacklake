import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthSigninService } from '../../app/demo/pages/authentication/auth-signin/auth-signin.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private loginService: AuthSigninService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError
      (err => {
        console.log('error: ', err);

        if (err.status === 401 || err.status === 403) {
          // auto logout if 401 response returned from api
          this.loginService.logout();
          // location.reload(true);
        }

        // const error = data.error.message || data.statusText;
        return throwError(err);
      })
    );
  }
}
/**
  return next.handle(request)
      .pipe(
        catchError(error => {
        console.log('error: ', error);
        let errMsg = '';
        // if (error.status === 401 || error.status === 403) {
        //   // auto logout if 401 response returned from api
        //   this.loginService.logout();
        //   // location.reload(true);
        // }
        if (error.error instanceof ErrorEvent) {
          errMsg = `Error: ${error.error.message}`;
        } else {
          errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }

        // const error = data.error.message || data.statusText;
        return throwError(errMsg);
      })
    );
 */
