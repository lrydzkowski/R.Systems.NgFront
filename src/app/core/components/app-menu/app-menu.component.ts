import { Component, OnInit } from '@angular/core';
import { ModalWindowHandlerService } from '@shared/shared/services/modal-window-handler.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'core-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {

  appMenuItems: MenuItem[] = [];

  constructor(private modalWindowHandler: ModalWindowHandlerService) { }

  ngOnInit(): void {
    this.initAppMenuItems();
  }

  initAppMenuItems(): void {
    this.appMenuItems = [
      {
        label: 'O aplikacji',
        icon: '',
        command: () => {
          this.modalWindowHandler.openWindow('about-app');
        }
      }
    ];
  }

}
