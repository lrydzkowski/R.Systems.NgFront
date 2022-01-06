import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OperationTypeEnum } from '../models/operation-type-enum';
import { RouteInfo } from '../models/route-info';

@Injectable({
  providedIn: 'root'
})
export class RightSidePanelStateService {

  private openCloseSubject = new BehaviorSubject<OperationTypeEnum>(OperationTypeEnum.Initialization);

  private activateDeactivateSubject = new BehaviorSubject<OperationTypeEnum>(OperationTypeEnum.Initialization);

  private cache: { [url: string]: boolean } = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.restoreStateFromLocalStorage();
      this.handleEvents();
  }

  open(): void {
    this.openCloseSubject.next(OperationTypeEnum.Open);
  }

  close(): void {
    this.openCloseSubject.next(OperationTypeEnum.Close);
  }

  onOpen(): Observable<OperationTypeEnum> {
    return this.getOperationSubjectObservable(this.openCloseSubject, OperationTypeEnum.Open);
  }

  onClose(): Observable<OperationTypeEnum> {
    return this.getOperationSubjectObservable(this.openCloseSubject, OperationTypeEnum.Close);
  }

  onActivate(): Observable<OperationTypeEnum> {
    return this.getOperationSubjectObservable(this.activateDeactivateSubject, OperationTypeEnum.Activate);
  }

  onDeactivate(): Observable<OperationTypeEnum> {
    return this.getOperationSubjectObservable(this.activateDeactivateSubject, OperationTypeEnum.Deactivate);
  }

  private activate(): void {
    this.activateDeactivateSubject.next(OperationTypeEnum.Activate);
  }

  private deactivate(): void {
    this.activateDeactivateSubject.next(OperationTypeEnum.Deactivate);
  }

  private handleEvents(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkRightSidePanelState();
      });
    this.onOpen().subscribe({
      next: () => {
        const routeInfo: RouteInfo = this.getRightSidePanelInfo(this.activatedRoute);
        this.saveCache(routeInfo.url, true);
      }
    });
    this.onClose().subscribe({
      next: () => {
        const routeInfo: RouteInfo = this.getRightSidePanelInfo(this.activatedRoute);
        this.saveCache(routeInfo.url, false);
      }
    });
  }

  private checkRightSidePanelState(): void {
    const routeInfo: RouteInfo = this.getRightSidePanelInfo(this.activatedRoute.root);
    if (routeInfo.hasRightSidePanel) {
      this.activate();
      this.restoreCache(routeInfo.url);
    } else {
      this.deactivate();
    }
  }

  private getRightSidePanelInfo(route: ActivatedRoute, hasRightSidePanel: boolean = false): RouteInfo {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      const url = route.pathFromRoot
        .filter(v => v.routeConfig !== null)
        .map(v => v.routeConfig?.path)
        .join('/');
      return {
        url,
        hasRightSidePanel
      };
    }
    const child: ActivatedRoute = children[0];
    hasRightSidePanel = child.snapshot.data['hasRightSidePanel'];
    if (typeof hasRightSidePanel !== 'boolean') {
      hasRightSidePanel = false;
    }
    return this.getRightSidePanelInfo(child, hasRightSidePanel);
  }

  private getOperationSubjectObservable(
    subject: Subject<OperationTypeEnum>,
    expectedOperation: OperationTypeEnum
  ): Observable<OperationTypeEnum> {
    return subject.asObservable()
      .pipe(
        filter((operation: OperationTypeEnum) => operation === expectedOperation)
      );
  }

  private restoreCache(url: string): void {
    if (this.cache.hasOwnProperty(url) && this.cache[url]) {
      this.open();
    } else {
      this.close();
    }
  }

  private saveCache(url: string, state: boolean): void {
    this.cache[url] = state;
    this.saveStateInLocalStorage();
  }

  private restoreStateFromLocalStorage(): void {
    const rightSidePanelState: string | null = localStorage.getItem('rightSidePanelState');
    if (rightSidePanelState === null) {
      return;
    }
    this.cache = JSON.parse(rightSidePanelState);
  }

  private saveStateInLocalStorage(): void {
    localStorage.setItem('rightSidePanelState', JSON.stringify(this.cache));
  }
}
