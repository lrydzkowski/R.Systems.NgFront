import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AppMenuService {

  constructor() { }

  getMenu(currentUrl: string = ''): MenuItem[] {
    return [
      {
        label: $localize`Dashboard`,
        routerLink: [$localize`/dashboard`],
        styleClass: this.getMenuElementStyleClass($localize`/dashboard`, currentUrl)
      },
      {
        label: 'Lexica',
        routerLink: [$localize`/lexica/main`],
        styleClass: this.getMenuElementStyleClass($localize`/lexica/main`, currentUrl)
      },
      {
        label: 'Mock',
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
