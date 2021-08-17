import { Component, Input, OnInit } from '@angular/core';
import { ModalWindowHandlerService } from '@shared/shared/services/modal-window-handler.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'user-auth-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  userMenuItems: MenuItem[] = [];

  constructor(private modalWindowHandler: ModalWindowHandlerService) { }

  ngOnInit(): void {
    this.initUserMenuItems();
  }

  initUserMenuItems(): void {
    this.userMenuItems = [
      {
        label: $localize`Password change`,
        icon: '',
        command: () => {
          this.modalWindowHandler.openWindow('password-change-form');
        }
      }
    ];
  }

}
