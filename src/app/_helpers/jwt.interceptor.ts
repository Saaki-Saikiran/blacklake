import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    console.log('jwt interceptor called');
    if (loggedUser && loggedUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${loggedUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}
