import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslationSet } from '@features/lexica/models/translation-set';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetApiService {

  constructor(private http: HttpClient) { }

  getSet(setName: string): Observable<TranslationSet> {
    return this.http.get<TranslationSet>(`/api/lexica/sets/${setName}`);
  }

  getSets(): Observable<TranslationSet> {
    return this.http.get<TranslationSet>('/api/lexica/sets');
  }
}
