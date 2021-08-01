import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenInfo } from '../../models/token-info';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root'
})
export class UserAuthApiService {

  constructor(
    private http: HttpClient
  ) { }

  login(request: LoginRequest): Observable<TokenInfo> {
    return this.http.post<TokenInfo>('/login', request);
  }
}
