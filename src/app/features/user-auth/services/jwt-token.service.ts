import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenerateNewTokensRequest } from '../api/models/generate-new-tokens-request';
import { GenerateNewTokensResponse } from '../api/models/generate-new-tokens-response';
import { UserAuthApiService } from '../api/services/user-auth-api.service';
import { TokenInfo } from '../models/token-info';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  private accessTokenKey = 'accessToken';

  private refreshTokenKey = 'refreshToken';

  constructor(
    private userAuthApi: UserAuthApiService) { }

  tokensExist(): boolean {
    return this.accessTokenExists() && this.refreshTokenExists();
  }

  accessTokenExists(): boolean {
    return this.getAccessToken() !== null;
  }

  refreshTokenExists(): boolean {
    return this.getRefreshToken() !== null;
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  isTokenExpired(accessToken: string): boolean {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(accessToken);
  }

  setTokens(tokenInfo: TokenInfo): void {
    localStorage.setItem(this.accessTokenKey, tokenInfo.accessToken);
    localStorage.setItem(this.refreshTokenKey, tokenInfo.refreshToken);
  }

  removeTokens(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.refreshTokenKey);
  }

  refreshToken(): Observable<boolean> {
    const refreshToken = this.getRefreshToken();
    if (refreshToken === null) {
      return of(false);
    }
    const request: GenerateNewTokensRequest = {
      refreshToken: refreshToken as string
    };
    return this.userAuthApi.generateNewTokens(request)
      .pipe(
        map((response: GenerateNewTokensResponse) => {
          this.setTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
          });
          return true;
        })
      );
  }
}
