import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OperationEnum } from '../models/operation-enum';

@Injectable({
  providedIn: 'root'
})
export class RightSidePanelService {

  isOpen: boolean = false;

  private isHandled: boolean = false;

  private operationSubject = new Subject<OperationEnum>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.handleEvents();
  }

  isShowed(): boolean {
    return this.isHandled && !this.isOpen;
  }

  open(): void {
    this.operationSubject.next(OperationEnum.Open);
  }

  onOpen(): Observable<OperationEnum> {
    return this.operationSubject.asObservable()
      .pipe(filter((operation: OperationEnum) => operation === OperationEnum.Open));
  }

  close(): void {
    this.operationSubject.next(OperationEnum.Close);
  }

  onClose(): Observable<OperationEnum> {
    return this.operationSubject.asObservable()
      .pipe(filter((operation: OperationEnum) => operation === OperationEnum.Close));
  }

  private handleEvents() {
    this.operationSubject.subscribe((operation: OperationEnum) => {
      if (operation == OperationEnum.Open) {
        this.isOpen = true;
      }
    });
    this.operationSubject.subscribe((operation: OperationEnum) => {
      if (operation == OperationEnum.Close) {
        this.isOpen = false;
      }
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
    if (this.isOpen && !this.isHandled) {
      this.close();
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
