import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringUtilsService {

  constructor() { }

  makeFirstLetterSmall(text: string): string {
    if (text === null) {
      return text;
    }
    return text[0].toLowerCase() + text.slice(1);
  }
}
