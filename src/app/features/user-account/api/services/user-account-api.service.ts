import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordChangeRequest } from '../models/password-change-request';

@Injectable({
  providedIn: 'root'
})
export class UserAccountApiService {

  constructor(
    private http: HttpClient) { }

  changePassword(request: PasswordChangeRequest): Observable<any> {
    return this.http.post('/api/auth/users/change-password', request);
  }
}
