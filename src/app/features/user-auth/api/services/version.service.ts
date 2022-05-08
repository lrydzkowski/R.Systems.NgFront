import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App } from '@shared/shared/models/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient) { }

  getVersion(): Observable<App> {
    return this.http.get<App>('/api/auth/version');
  }
}
