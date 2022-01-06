import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.isSupportedUrl(request.url)) {
      return this.authService.handleRequest(request, next);
    }
    return next.handle(request);
  }

  private isSupportedUrl(url: string): boolean {
    const isAuthenticateUrl = url.endsWith('users/authenticate');
    const isRefreshTokenUrl = url.endsWith('users/generate-new-tokens');
    return !isAuthenticateUrl && !isRefreshTokenUrl;
  }
}
