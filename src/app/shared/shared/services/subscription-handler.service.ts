import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionHandlerService {

  data: {[key: string]: Subscription} = {};

  constructor() { }

  unsubscribeAll(): void {
    for (const name in this.data) {
      if (this.data.hasOwnProperty(name)) {
        this.unsubscribe(name);
      }
    }
  }

  unsubscribe(name: string): void {
    if (this.data.hasOwnProperty(name)) {
      const element = this.data[name];
      if (element !== null) {
        element.unsubscribe();
      }
    }
  }
}
