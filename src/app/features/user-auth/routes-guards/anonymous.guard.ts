import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { map, Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {

  constructor(
    private msalGuard: MsalGuard,
    private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.msalGuard.canLoad().pipe(
      map(
        (canActivate: boolean|UrlTree) => {
          if (!canActivate) {
            return true;
          }
          this.userService.redirectAfterLogin();
          return false;
        }
      )
    );
  }
}
