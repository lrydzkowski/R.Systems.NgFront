import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppMenuService {

  constructor() { }

  updateState: Subject<boolean> = new Subject<boolean>();

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
        routerLink: [$localize`/api-mock`],
        visible: authenticated
      }
    ];
  }
}
