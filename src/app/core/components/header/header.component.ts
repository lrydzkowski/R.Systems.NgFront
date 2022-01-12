import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '@features/user-auth/services/user.service';
import { AppMenuService } from '../../app-menu.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems: MenuItem[] = [];

  userIsLogged = false;

  constructor(
    private appMenuService: AppMenuService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.handleNavigationEndEvent();
  }

  private handleNavigationEndEvent(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigationEndEvent = event as NavigationEnd;
        this.initMenu(navigationEndEvent.url);
      });
  }

  private initMenu(currentUrl: string): void {
    const isAuthenticated = this.userService.tokensExist();
    this.menuItems = this.appMenuService.getMenu(isAuthenticated, currentUrl);
    this.userIsLogged = isAuthenticated;
  }

}
