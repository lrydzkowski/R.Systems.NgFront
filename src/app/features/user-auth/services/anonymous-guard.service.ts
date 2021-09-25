import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated()
      .pipe(map(
        (isAuthenticated: boolean) => {
          if (isAuthenticated) {
            this.userService.redirectAfterLogin();
            return false;
          }
          this.userService.clearTokens();
          return true;
        }
      ));
  }
}
