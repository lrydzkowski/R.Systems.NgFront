import { HttpClient, HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/requests/login-request';

@Injectable({
  providedIn: 'root'
})
export class UserAuthApiService {

  constructor(
    private http: HttpClient
  ) { }

  login(request: LoginRequest): Observable<HttpResponse<Token>> {
    return this.http.post<HttpResponse<Token>>('/users/login', request);
  }
}
