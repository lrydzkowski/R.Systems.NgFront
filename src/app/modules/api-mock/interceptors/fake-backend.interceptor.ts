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
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJzdXBlciIsInVzZXIiXSwiZXhwIjoxNjIzOTUwNjg5fQ.WcH6yfRFs8UWXgvGuv7HCt2OKnV6zKvleOgy1hsk-0E",
        "refreshToken": "yGfbNkAbd8ViQWVbXPPJ/pw/obpPAeJEEv3iAgSIXBw="
      };
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }
    return next.handle(request);
  }
}
