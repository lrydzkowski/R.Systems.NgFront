import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-common';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginUrls } from '../models/login-urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLoggedStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private msalService: MsalService,
    private router: Router) { }

  getIsLoggedStatus(): Observable<boolean> {
    return this.isLoggedStatus.asObservable();
  }

  setIsLoggedStatus(isLogged: boolean): void {
    this.isLoggedStatus.next(isLogged);
  }

  login(): void {
    this.msalService.loginRedirect();
  }

  redirectAfterLogin(): void {
    this.router.navigate([LoginUrls.urlAfterLogin]);
  }

  logout(): void {
    this.msalService.logoutRedirect();
  }

  getActiveAccount(): AccountInfo | null {
    return this.msalService.instance.getActiveAccount();
  }

}
