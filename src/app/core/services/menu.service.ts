import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenu(): MenuItem[] {
    return [
      {
        label: $localize`Login`,
        routerLink: [$localize`/login`]
      },
      {
        label: $localize`Administration`,
        items: [
          {
            label: $localize`Users`,
            routerLink: [$localize`/administration/users`]
          }
        ]
      },
      {
        label: 'Lexica',
        routerLink: [$localize`/lexica/main`]
      }
    ];
  }
}
