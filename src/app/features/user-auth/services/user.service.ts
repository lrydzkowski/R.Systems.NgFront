import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppMenuService } from '@app/core/app-menu.service';
import { LoginUrls } from '../models/login-urls';
import { TokenInfo } from '../models/token-info';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private jwtTokenService: JwtTokenService,
    private router: Router,
    private appMenuService: AppMenuService) { }

  login(tokenInfo: TokenInfo): void {
    this.jwtTokenService.setTokens(tokenInfo);
    this.redirectAfterLogin();
    this.appMenuService.updateState.next(true);
  }

  redirectAfterLogin(): void {
    this.router.navigate([LoginUrls.urlAfterLogin]);
  }

  logout(): void {
    this.clearTokens();
    this.redirectAfterLogout();
    this.appMenuService.updateState.next(false);
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
