import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockDataApiService {

  private url = '/assets/words/';

  private cache: { [key: string]: { fileName: string; data: string[] } } = {
    words: {
      fileName: 'words.txt',
      data: []
    },
    firstNames: {
      fileName: 'first_names.txt',
      data: []
    },
    lastNames: {
      fileName: 'last_names.txt',
      data: []
    }
  };

  constructor(private httpClient: HttpClient) { }

  getStaticData(key: string, useCache: boolean = true): Observable<string[]> {
    if (this.canUseCache(key, useCache)) {
      return of(this.cache[key].data);
    } else {
      return this.httpClient.get(`${this.url}${this.cache[key].fileName}`, {responseType: 'text'})
        .pipe(
          map((data: string) => data.split('\r\n')),
          tap((data: string[]) => this.cache[key].data = data)
        );
    }
  }

  private canUseCache(key: string, useCache: boolean) {
    return useCache && this.cache[key].data.length > 0;
  }
}
