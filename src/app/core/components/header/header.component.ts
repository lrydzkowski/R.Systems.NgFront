import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DeviceDetectorService } from '../../services/device-detector.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems: MenuItem[] = [];

  mobileMenuVisible: boolean = false;
  
  constructor(
    private menuService: MenuService,
    private deviceDetectorService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.initMenu();
  }

  initMenu(): void {
    this.menuItems = this.menuService.getMenu();
  }

  showMobileMenu(): void {
    this.mobileMenuVisible = true;
  }

  getMobileMenuHeight(): number {
    return window.innerHeight - 77;
  }

  isTouchDevice(): boolean {
    return this.deviceDetectorService.isTouchDevice();
  }

}
