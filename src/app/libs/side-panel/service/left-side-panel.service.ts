import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeftSidePanelService {

  isOpen: boolean = false;

  isHandled: boolean = false;

  open: Subject<any> = new Subject();

  close: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.handleEvents();
  }

  private handleEvents() {
    this.open.subscribe(() => {
      this.isOpen = true;
    });
    this.close.subscribe(() => {
      this.isOpen = false;
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkLeftSidePanelState();
      });
  }

  private checkLeftSidePanelState(): void {
    const hasLeftSidePanel: boolean = this.getLeftSidePanelInfo(this.activatedRoute.root);
    this.isHandled = hasLeftSidePanel;
    if (this.isOpen && !hasLeftSidePanel) {
      this.close.next();
    }
  }

  private getLeftSidePanelInfo(route: ActivatedRoute, hasLeftSidePanel: boolean = false): boolean {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return hasLeftSidePanel;
    }
    const child = children[0];
    hasLeftSidePanel = child.snapshot.data['hasLeftSidePanel'];
    if (typeof hasLeftSidePanel !== 'boolean') {
      hasLeftSidePanel = false;
    }
    return this.getLeftSidePanelInfo(child, hasLeftSidePanel);
  }
}
