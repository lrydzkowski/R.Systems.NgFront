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
        label: $localize`Changelog`,
        icon: '',
        command: () => {
          this.modalWindowHandler.openWindow('changelog');
        }
      },
      {
        label: $localize`About app`,
        icon: '',
        command: () => {
          this.modalWindowHandler.openWindow('about-app');
        }
      }
    ];
  }

}
