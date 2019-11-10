import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Role } from './roles';
import { environment } from '../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    constructor(private http: HttpClient) { }

    getRoles(): Observable<Role[]> {
        const match = { isActive: true };
        const pagination = { limit: 1000 };

        return this.http.post<Role[]>(`${environment.baseUrl}/roles/list`, { match, pagination }, httpOptions)
            .pipe(
                map(data => {
                    data['result'].map((item, index) => {
                        item.sno = index + 1;
                    });
                    return data;
                }),
                // tap(data => console.log('Get Roles called\n', JSON.stringify(data))),
                catchError(this.errorHandler)
            );
    }

    getRole(id): Observable<Role> {
        return this.http.get<Role>(`${environment.baseUrl}/roles/${id}`)
            .pipe(
                tap(data => console.log('Get a Role called\n', JSON.stringify(data))),
                catchError(this.errorHandler)
            );
    }

    createRole(role: Role): Observable<Role> {
        return this.http.post<Role>(`${environment.baseUrl}/roles/create`, role, httpOptions)
            .pipe(
                tap(data => console.log('Added Role\n', JSON.stringify(data))),
                catchError(this.errorHandler)
            );
    }

    updateRole(role: Role): Observable<{}> {
        return this.http.put<Role>(`${environment.baseUrl}/roles/update`, role, httpOptions)
            .pipe(
                tap(data => console.log('Updated Role: ', JSON.stringify(data))),
                // Return the Role on an update
                // map(() => Role),
                catchError(this.errorHandler)
            );
    }

    deleteRole(id): Observable<{}> {
        return this.http.delete<Role>(`${environment.baseUrl}/roles/${id}`, httpOptions)
            .pipe(
                tap(data => console.log('deleted role\n' + JSON.stringify(data))),
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
