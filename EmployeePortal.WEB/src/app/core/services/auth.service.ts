import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CustomResponse } from '../models/custom-response';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = '/api/Auth'; // ✅ Proxy-based URL

    constructor(private http: HttpClient) { }

    login(credentials: any): Observable<CustomResponse> {
        return this.http.post<CustomResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                if (response.IsSuccess && response.Data) {
                    localStorage.setItem('token', response.Data);
                }
            })
        );
    }



    logout() {
        localStorage.removeItem('token');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }
}
