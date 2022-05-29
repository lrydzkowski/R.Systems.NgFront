import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
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

  constructor(
    private appMenuService: AppMenuService,
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
    this.menuItems = this.appMenuService.getMenu(currentUrl);
  }

}
