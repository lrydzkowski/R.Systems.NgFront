import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    public user: UserService) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated()
      .pipe(
        map(
          (isAuthenticated) => {
            if (!isAuthenticated) {
              this.user.logout();
              return false;
            }
            return true;
          }
        )
      );
  }

}
