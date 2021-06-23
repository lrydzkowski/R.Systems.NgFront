import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbHandlerService {

  items: MenuItem[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  handleNavigationEndEvent(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.items = this.createBreadcrumbs(this.activatedRoute.root);
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }
    const child = children[0];
    const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
    if (routeURL !== '') {
      url += `/${routeURL}`;
    }
    const label = child.snapshot.data['breadcrumb'];
    if (typeof label === 'string') {
      breadcrumbs.push({label, routerLink: [url]});
    }

    return this.createBreadcrumbs(child, url, breadcrumbs);
  }
}
