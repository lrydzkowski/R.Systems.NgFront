import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from '@shared/loading/services/loading.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { JwtTokenService } from './jwt-token.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenRefreshInProgress = false;

  private refreshAccessTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private jwtToken: JwtTokenService,
    private loadingService: LoadingService,
    private userService: UserService) { }

  public isAuthenticated(): Observable<boolean> {
    const token = this.jwtToken.getAccessToken();
    if (token === null) {
      return of(false);
    }
    const isTokenExpired = this.jwtToken.isTokenExpired(token);
    if (!isTokenExpired) {
      return of(true);
    }
    this.jwtToken.removeAccessToken();
    const loadingAnimationKey = 'global';
    this.loadingService.showLoadingAnimation(loadingAnimationKey);
    return this.jwtToken.refreshToken()
      .pipe(
        finalize(() => {
          this.loadingService.hideLoadingAnimation(loadingAnimationKey);
        }),
        catchError(() => {
          this.userService.logout();
          return of(false);
        })
      );
  }

  public handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.accessTokenExists()) {
      return next.handle(request);
    }
    const accessToken = this.jwtToken.getAccessToken() as string;
    if (this.tokenNeedsRefresh(accessToken)) {
      return this.refreshToken(request, next);
    }
    if (this.hasToWaitForRefresh(accessToken)) {
      return this.waitForRefresh(request, next);
    }
    return this.handleRequestWithAuthHeader(request, next, accessToken);
  }

  private accessTokenExists(): boolean {
    return this.jwtToken.accessTokenExists();
  }

  private tokenNeedsRefresh(accessToken: string): boolean {
    return this.jwtToken.isTokenExpired(accessToken) && !this.tokenRefreshInProgress;
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.tokenRefreshInProgress = true;
    this.refreshAccessTokenSubject.next(null);
    return this.jwtToken.refreshToken()
      .pipe(
        finalize(() => this.tokenRefreshInProgress = false),
        catchError(() => of(false)),
        switchMap((result: boolean) => {
          if (!result) {
            this.userService.logout();
            return new Observable<HttpEvent<any>>();
          }
          const refreshedAccessToken = this.jwtToken.getAccessToken() as string;
          this.refreshAccessTokenSubject.next(refreshedAccessToken);
          return this.handleRequestWithAuthHeader(request, next, refreshedAccessToken);
        })
      );
  }

  private hasToWaitForRefresh(accessToken: string): boolean {
    return this.jwtToken.isTokenExpired(accessToken) && this.tokenRefreshInProgress;
  }

  private waitForRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.refreshAccessTokenSubject.pipe(
      filter(result => result !== null),
      take(1),
      switchMap((refreshedAccessToken: string | null) =>
        this.handleRequestWithAuthHeader(request, next, refreshedAccessToken as string)
      )
    );
  }

  private handleRequestWithAuthHeader(
    request: HttpRequest<any>, next: HttpHandler, accessToken: string
  ): Observable<HttpEvent<any>> {
    request = this.addTokenHeader(request, accessToken);
    return next.handle(request);
  }

  private addTokenHeader(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}
