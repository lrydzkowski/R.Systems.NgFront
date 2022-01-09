import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUrls } from '../models/login-urls';
import { TokenInfo } from '../models/token-info';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private jwtTokenService: JwtTokenService,
    private router: Router) { }

  login(tokenInfo: TokenInfo): void {
    this.jwtTokenService.setTokens(tokenInfo);
    this.redirectAfterLogin();
  }

  redirectAfterLogin(): void {
    this.router.navigate([LoginUrls.urlAfterLogin]);
  }

  logout(): void {
    this.clearTokens();
    this.redirectAfterLogout();
  }

  redirectAfterLogout(): void {
    this.router.navigate([LoginUrls.urlAfterLogout]);
  }

  clearTokens(): void {
    this.jwtTokenService.removeTokens();
  }

  tokensExist(): boolean {
    return this.jwtTokenService.tokensExist();
  }
}
