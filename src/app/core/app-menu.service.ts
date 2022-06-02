import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppMenuState } from './models/app-menu-state';

@Injectable({
  providedIn: 'root'
})
export class AppMenuService {

  private isLogged = false;

  private currentUrl = '';

  constructor() { }

  getMenu(appMenuState: AppMenuState): MenuItem[] {
    this.isLogged = this.getIsLoggedStatus(appMenuState);
    this.currentUrl = this.getCurrentUrl(appMenuState);
    return [
      {
        label: $localize`Dashboard`,
        routerLink: [$localize`/dashboard`],
        visible: this.isLogged,
        styleClass: this.getMenuElementStyleClass($localize`/dashboard`, this.currentUrl)
      },
      {
        label: 'Lexica',
        routerLink: [$localize`/lexica/main`],
        visible: this.isLogged,
        styleClass: this.getMenuElementStyleClass($localize`/lexica/main`, this.currentUrl)
      },
      {
        label: 'Mock',
        visible: this.isLogged,
        styleClass: this.getMenuElementStyleClass($localize`/api-mock`, this.currentUrl),
        items: [
          {
            label: $localize`Random Data Generator`,
            routerLink: [$localize`/api-mock/random-data-generator`]
          }
        ]
      },
      {
        label: $localize`Tests`,
        visible: this.isLogged,
        styleClass: this.getMenuElementStyleClass($localize`/tests`, this.currentUrl),
        items: [
          {
            label: $localize`Reactive Form With Calendar`,
            routerLink: [$localize`/tests/reactive-form-with-calendar`]
          }
        ]
      }
    ];
  }

  private getIsLoggedStatus(appMenuState: AppMenuState): boolean {
    if (appMenuState.isLogged === null) {
      return this.isLogged;
    }
    return appMenuState.isLogged;
  }

  private getCurrentUrl(appMenuState: AppMenuState): string {
    if (appMenuState.currentUrl === null) {
      return this.currentUrl;
    }
    return appMenuState.currentUrl;
  }

  private getMenuElementStyleClass(elementUrl: string, currentUrl: string): string | undefined {
    if (currentUrl?.startsWith(elementUrl)) {
      return 'current-page';
    }
    return;
  }
}
