import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomResponse } from '../models/custom-response';

export interface Employee {
    Id?: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone?: string;
    Position: string;
    Department?: string;
    Salary?: number;
}

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private apiUrl = '/api/Employees'; // Proxy-based URL

    constructor(private http: HttpClient) { }

    getAll(): Observable<CustomResponse<Employee[]>> {
        return this.http
            .get<CustomResponse<Employee[]>>(`${this.apiUrl}/GetEmployees`)
            .pipe(catchError(this.handleError));
    }

    getById(id: number): Observable<CustomResponse<Employee>> {
        return this.http
            .get<CustomResponse<Employee>>(`${this.apiUrl}/GetEmployee/${id}`)
            .pipe(catchError(this.handleError));
    }

    create(employee: Employee): Observable<CustomResponse<Employee>> {
        return this.http
            .post<CustomResponse<Employee>>(`${this.apiUrl}/PostEmployee`, employee)
            .pipe(catchError(this.handleError));
    }

    update(id: number, employee: Employee): Observable<CustomResponse<Employee>> {
        return this.http
            .put<CustomResponse<Employee>>(`${this.apiUrl}/PutEmployee/${id}`, employee)
            .pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<CustomResponse<boolean>> {
        return this.http
            .delete<CustomResponse<boolean>>(`${this.apiUrl}/DeleteEmployee/${id}`)
            .pipe(catchError(this.handleError));
    }

    // 🔴 Central error handler
    private handleError(error: any) {
        let message = 'Something went wrong';

        if (error?.error?.Message) {
            message = error.error.Message; // Custom API error
        } else if (error?.message) {
            message = error.message;
        }

        return throwError(() => message);
    }
}
