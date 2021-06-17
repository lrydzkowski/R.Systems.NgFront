import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/core/services/menu.service';
import { TokenInfo } from '../models/token-info';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlAfterLogin: string = $localize`/dashboard`;

  private urlAfterLoginOut: string = $localize`/login`;

  constructor(
    private jwtTokenService: JwtTokenService,
    private router: Router,
    private menuService: MenuService
  ) { }

  login(tokenInfo: TokenInfo): void {
    this.jwtTokenService.setTokens(tokenInfo);
    this.redirectAfterLogin();
    this.menuService.updateState.next(true);
  }

  redirectAfterLogin(): void {
    this.router.navigate([this.urlAfterLogin]);
  }

  logout(): void {
    this.clearTokens();
    this.redirectAfterLogout();
    this.menuService.updateState.next(false);
  }

  redirectAfterLogout(): void {
    this.router.navigate([this.urlAfterLoginOut]);
  }

  clearTokens(): void {
    this.jwtTokenService.removeTokens();
  }

  tokensExist(): boolean {
    return this.jwtTokenService.tokensExist();
  }
}