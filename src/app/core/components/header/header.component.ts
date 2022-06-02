import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppMenuService } from '../../app-menu.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from '@features/user-auth/services/user.service';
import { AppMenuState } from '@app/core/models/app-menu-state';

@Component({
  selector: 'core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems: MenuItem[] = [];

  constructor(
    private appMenuService: AppMenuService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.handleNavigationEndEvent();
    this.handleIsLoggedStatusChangeEvent();
  }

  private handleNavigationEndEvent(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigationEndEvent = event as NavigationEnd;
        this.initMenu({currentUrl: navigationEndEvent.url, isLogged: null});
      });
  }

  private handleIsLoggedStatusChangeEvent(): void {
    this.userService.getIsLoggedStatus()
      .subscribe({
        next: (isLogged: boolean) => {
          this.initMenu({currentUrl: null, isLogged});
        }
      });
  }

  private initMenu(appMenuState: AppMenuState): void {
    this.menuItems = this.appMenuService.getMenu(appMenuState);
  }

}
