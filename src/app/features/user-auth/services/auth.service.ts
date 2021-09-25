import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private jwtTokenService: JwtTokenService,
    private jwtHelper: JwtHelperService) { }

  isAuthenticated(): Observable<boolean> {
    const token = this.jwtTokenService.getToken();
    if (token === null || token.length === 0) {
      return of(false);
    }
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {

    }
    return of(true);
  }
}
