import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import tokens from '../data/tokens.json';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handleRequest(request, next);
  }

  private handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url;
    const method = request.method;
    console.log(url);
    if (url === '/login' && method === 'POST') {
      const body = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      };
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }
    return next.handle(request);
  }
}
