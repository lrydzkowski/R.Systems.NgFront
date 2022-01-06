import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateRequest } from '../models/authenticate-request';
import { AuthenticateResponse } from '../models/authenticate-response';
import { GenerateNewTokensRequest } from '../models/generate-new-tokens-request';
import { GenerateNewTokensResponse } from '../models/generate-new-tokens-response';

@Injectable({
  providedIn: 'root'
})
export class UserAuthApiService {

  constructor(
    private http: HttpClient) { }

  authenticate(request: AuthenticateRequest): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>('/api/auth/users/authenticate', request);
  }

  generateNewTokens(request: GenerateNewTokensRequest): Observable<GenerateNewTokensResponse> {
    return this.http.post<GenerateNewTokensResponse>('/api/auth/users/generate-new-tokens', request);
  }
}
