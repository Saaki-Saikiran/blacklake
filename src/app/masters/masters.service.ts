import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MastersService {

  constructor(private http: HttpClient) { }
  getAllMeterModelMaster() {
    const match = { active: true };
    const pagination = { limit: 1000 };
    return this.http.post(`${environment.baseUrl}/metermaster/list`, { match, pagination }, httpOptions)
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

  createMeterModelMaster(user) {
    return this.http.post(`${environment.baseUrl}/metermaster/create`, user, httpOptions)
      .pipe(
        tap(data => console.log('Added user\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  updateMeterModelMaster(user) {
    return this.http.put(`${environment.baseUrl}/metermaster/update`, user, httpOptions)
      .pipe(
        tap(data => console.log('updateUser: ', JSON.stringify(data))),
        // Return the User on an update
        // map(() => user),
        catchError(this.errorHandler)
      );
  }

  deleteMeterModelMaster(id) {
    return this.http.delete(`${environment.baseUrl}/metermaster/${id}`, httpOptions)
      .pipe(
        tap(data => console.log('deleted user\n' + JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  // For MeterParameters

  getAllMeterParameters() {
    const match = { active: true, isSupported: true };
    const pagination = { limit: 1000 };
    return this.http.post(`${environment.baseUrl}/meterparamsmaster/list`, { match, pagination }, httpOptions)
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

  createMeterParameters(user) {
    return this.http.post(`${environment.baseUrl}/meterparamsmaster/create`, user, httpOptions)
      .pipe(
        tap(data => console.log('Added user\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  updateMeterParameters(user) {
    return this.http.put(`${environment.baseUrl}/meterparamsmaster/update`, user, httpOptions)
      .pipe(
        tap(data => console.log('updateUser: ', JSON.stringify(data))),
        // Return the User on an update
        // map(() => user),
        catchError(this.errorHandler)
      );
  }

  deleteMeterParameters(id) {
    return this.http.delete(`${environment.baseUrl}/meterparamsmaster/${id}`, httpOptions)
      .pipe(
        tap(data => console.log('deleted user\n' + JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  // for  Panel 

  getAllPanel() {
    const match = { active: true };
    const pagination = { limit: 1000 };
    return this.http.post(`${environment.baseUrl}/panelmaster/list`, { match, pagination }, httpOptions)
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

  createPanel(user) {
    return this.http.post(`${environment.baseUrl}/panelmaster/create`, user, httpOptions)
      .pipe(
        tap(data => console.log('Added user\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  updatePanel(user) {
    return this.http.put(`${environment.baseUrl}/panelmaster/update`, user, httpOptions)
      .pipe(
        tap(data => console.log('updateUser: ', JSON.stringify(data))),
        // Return the User on an update
        // map(() => user),
        catchError(this.errorHandler)
      );
  }

  deletePanel(id) {
    return this.http.delete(`${environment.baseUrl}/panelmaster/${id}`, httpOptions)
      .pipe(
        tap(data => console.log('deleted user\n' + JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  // For Source Master
  getAllSource() {
    const match = { active: true };
    const pagination = { limit: 1000 };
    return this.http.post(`${environment.baseUrl}/sourcemaster/list`, { match, pagination }, httpOptions)
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

  createSource(user) {
    return this.http.post(`${environment.baseUrl}/sourcemaster/create`, user, httpOptions)
      .pipe(
        tap(data => console.log('Added user\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  updateSource(user) {
    return this.http.put(`${environment.baseUrl}/sourcemaster/update`, user, httpOptions)
      .pipe(
        tap(data => console.log('updateUser: ', JSON.stringify(data))),
        // Return the User on an update
        // map(() => user),
        catchError(this.errorHandler)
      );
  }

  deleteSource(id) {
    return this.http.delete(`${environment.baseUrl}/sourcemaster/${id}`, httpOptions)
      .pipe(
        tap(data => console.log('deleted user\n' + JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }


  //for gateway

  getAllGateway() {
    const match = { active: true };
    const pagination = { limit: 1000 };
    return this.http.post(`${environment.baseUrl}/gatewaymaster/list`, { match, pagination }, httpOptions)
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

  createGateway(user) {
    return this.http.post(`${environment.baseUrl}/gatewaymaster/create`, user, httpOptions)
      .pipe(
        tap(data => console.log('Added user\n', JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  updateGateway(user) {
    return this.http.put(`${environment.baseUrl}/gatewaymaster/update`, user, httpOptions)
      .pipe(
        tap(data => console.log('updateUser: ', JSON.stringify(data))),
        // Return the User on an update
        // map(() => user),
        catchError(this.errorHandler)
      );
  }

  deleteGateway(id) {
    return this.http.delete(`${environment.baseUrl}/gatewaymaster/${id}`, httpOptions)
      .pipe(
        tap(data => console.log('deleted user\n' + JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }
  //for floors

  getAllFloors() {
    const match = { active: true };
    const pagination = { limit: 1000 };
    return this.http.post(`${environment.baseUrl}/floors/list`, { match, pagination }, httpOptions)
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
