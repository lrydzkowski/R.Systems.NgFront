import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private register: { [key: string]: number } = { };

  constructor() { }

  showLoadingAnimation(key: string): void {
    this.initRegister(key);
    this.register[key]++;
    console.log(this.register[key]);
  }

  hideLoadingAnimation(key: string): void {
    this.initRegister(key);
    this.register[key]--;
    console.log(this.register[key]);
  }

  isVisible(key: string): boolean {
    this.initRegister(key);
    return this.register[key] > 0;
  }

  private initRegister(key: string): void {
    if (typeof this.register[key] === 'undefined') {
      this.register[key] = 0;
    }
  }
}
