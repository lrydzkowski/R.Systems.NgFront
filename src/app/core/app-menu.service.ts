import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AppMenuService {

  constructor() { }

  getMenu(authenticated: boolean, currentUrl: string = ''): MenuItem[] {
    return [
      {
        label: $localize`Login`,
        routerLink: [$localize`/login`],
        visible: !authenticated,
        styleClass: this.getMenuElementStyleClass($localize`/login`, currentUrl)
      },
      {
        label: $localize`Dashboard`,
        routerLink: [$localize`/dashboard`],
        visible: authenticated,
        styleClass: this.getMenuElementStyleClass($localize`/dashboard`, currentUrl)
      },
      {
        label: $localize`Administration`,
        visible: authenticated,
        styleClass: this.getMenuElementStyleClass($localize`/administration`, currentUrl),
        items: [
          {
            label: $localize`Users`,
            routerLink: [$localize`/administration/users`],
            visible: authenticated
          }
        ]
      },
      {
        label: 'Lexica',
        routerLink: [$localize`/lexica/main`],
        visible: authenticated,
        styleClass: this.getMenuElementStyleClass($localize`/lexica/main`, currentUrl)
      },
      {
        label: 'Mock',
        visible: authenticated,
        styleClass: this.getMenuElementStyleClass($localize`/api-mock`, currentUrl),
        items: [
          {
            label: $localize`Random Data Generator`,
            routerLink: [$localize`/api-mock/random-data-generator`]
          }
        ]
      },
      {
        label: $localize`Tests`,
        visible: authenticated,
        styleClass: this.getMenuElementStyleClass($localize`/tests`, currentUrl),
        items: [
          {
            label: $localize`Reactive Form With Calendar`,
            routerLink: [$localize`/tests/reactive-form-with-calendar`]
          }
        ]
      }
    ];
  }

  private getMenuElementStyleClass(elementUrl: string, currentUrl: string): string | undefined {
    if (currentUrl?.startsWith(elementUrl)) {
      return 'current-page';
    }
    return;
  }
}
