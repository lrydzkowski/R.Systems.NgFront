import { Injectable } from '@angular/core';
import { TokenInfo } from '../models/token-info';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  tokensExist(): boolean {
    return this.getToken() !== null && this.getRefreshToken() !== null;
  }

  setTokens(tokenInfo: TokenInfo): void {
    localStorage.setItem('token', tokenInfo.accessToken);
    localStorage.setItem('refreshToken', tokenInfo.refreshToken);
  }

  removeTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}
