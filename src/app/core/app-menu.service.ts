import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppMenuService {

  updateState: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  getMenu(authenticated: boolean): MenuItem[] {
    return [
      {
        label: $localize`Login`,
        routerLink: [$localize`/login`],
        visible: !authenticated
      },
      {
        label: $localize`Dashboard`,
        routerLink: [$localize`/dashboard`],
        visible: authenticated
      },
      {
        label: $localize`Administration`,
        visible: authenticated,
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
        visible: authenticated
      },
      {
        label: 'Mock',
        visible: authenticated,
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
        items: [
          {
            label: $localize`Reactive Form With Calendar`,
            routerLink: [$localize`/tests/reactive-form-with-calendar`]
          }
        ]
      }
    ];
  }
}
