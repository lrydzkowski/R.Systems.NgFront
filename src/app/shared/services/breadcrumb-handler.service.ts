import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { BreadcrumbInfo } from '../models/breadcrumb-info';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbHandlerService {

  isShowed: boolean = false;

  items: MenuItem[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  handleNavigationEndEvent(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let breadcrumbInfo: BreadcrumbInfo = { items: [], hasBreadcrumb: false };
        breadcrumbInfo = this.createBreadcrumbs(this.activatedRoute.root, '', breadcrumbInfo);
        this.isShowed = breadcrumbInfo.hasBreadcrumb;
        this.items = breadcrumbInfo.items;
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string, breadcrumbInfo: BreadcrumbInfo): BreadcrumbInfo {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbInfo;
    }
    const child = children[0];
    url = this.updateUrl(child.snapshot, url);
    this.addBreadcrumbItem(child.snapshot, breadcrumbInfo, url);
    this.setBreadcrumbVisibility(child.snapshot, breadcrumbInfo);

    return this.createBreadcrumbs(child, url, breadcrumbInfo);
  }

  private updateUrl(activatedRouteSnapshot: ActivatedRouteSnapshot, url: string): string {
    const routeURL: string = activatedRouteSnapshot.url.map(segment => segment.path).join('/');
    if (routeURL !== '') {
      url += `/${routeURL}`;
    }
    return url
  }

  private addBreadcrumbItem(activatedRouteSnapshot: ActivatedRouteSnapshot, breadcrumbInfo: BreadcrumbInfo, url: string): void {
    const label = activatedRouteSnapshot.data['breadcrumb'];
    if (typeof label === 'string') {
      breadcrumbInfo.items.push({label, routerLink: [url]});
    }
  }

  private setBreadcrumbVisibility(activatedRouteSnapshot: ActivatedRouteSnapshot, breadcrumbInfo: BreadcrumbInfo): void {
    let hasBreadcrumb = activatedRouteSnapshot.data['hasBreadcrumb'];
    if (typeof hasBreadcrumb !== 'boolean') {
      hasBreadcrumb = false;
    }
    breadcrumbInfo.hasBreadcrumb = hasBreadcrumb;
  }

}
