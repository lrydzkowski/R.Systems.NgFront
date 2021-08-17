import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '@features/user-auth/services/user.service';
import { AppMenuService } from '../../app-menu.service';

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
    private appMenuService: AppMenuService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.handleMenuUpdate();
    this.initMenu();
  }

  handleMenuUpdate(): void {
    this.appMenuService.updateState.subscribe((authenticated: boolean) => {
      this.initMenu(authenticated);
    });
  }

  initMenu(authenticated: boolean | null = null): void {
    if (authenticated === null) {
      authenticated = this.userService.tokensExist();
    }
    this.menuItems = this.appMenuService.getMenu(authenticated);
    this.userIsLogged = authenticated;
  }

  logout(): void {
    this.userService.logout();
  }

}
