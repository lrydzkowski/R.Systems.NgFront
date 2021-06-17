import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/modules/user-auth/services/user.service';
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

  userIsLogged: boolean = false;

  constructor(
    private menuService: MenuService,
    private deviceDetectorService: DeviceDetectorService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.handleMenuUpdate();
    this.initMenu();
  }

  handleMenuUpdate(): void {
    this.menuService.updateState.subscribe((authenticated: boolean) => {
      this.initMenu(authenticated);
    });
  }

  initMenu(authenticated: boolean | null = null): void {
    if (authenticated === null) {
      authenticated = this.userService.tokensExist();
    }
    this.menuItems = this.menuService.getMenu(authenticated);
    this.userIsLogged = authenticated;
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

  logout(): void {
    this.userService.logout();
  }

}
