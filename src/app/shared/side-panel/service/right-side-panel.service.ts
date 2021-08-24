import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OperationTypeEnum } from '../models/operation-type-enum';

@Injectable({
  providedIn: 'root'
})
export class RightSidePanelService {

  private operationSubject = new BehaviorSubject<OperationTypeEnum>(OperationTypeEnum.Initialization);

  private isCurrentlyOpen = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.handleEvents();
  }

  open(): void {
    this.operationSubject.next(OperationTypeEnum.Open);
  }

  close(): void {
    this.operationSubject.next(OperationTypeEnum.Close);
  }

  onOpen(): Observable<OperationTypeEnum> {
    return this.getOperationSubjectObservable(OperationTypeEnum.Open);
  }

  onClose(): Observable<OperationTypeEnum> {
    return this.getOperationSubjectObservable(OperationTypeEnum.Close);
  }

  onActivate(): Observable<OperationTypeEnum> {
    return this.getOperationSubjectObservable(OperationTypeEnum.Activate);
  }

  onDeactivate(): Observable<OperationTypeEnum> {
    return this.getOperationSubjectObservable(OperationTypeEnum.Deactivate);
  }

  private activate(): void {
    this.operationSubject.next(OperationTypeEnum.Activate);
  }

  private deactivate(): void {
    this.operationSubject.next(OperationTypeEnum.Deactivate);
  }

  private handleEvents(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkLeftSidePanelState();
      });
  }

  private checkLeftSidePanelState(): void {
    const hasLeftSidePanel: boolean = this.getLeftSidePanelInfo(this.activatedRoute.root);
    if (hasLeftSidePanel) {
      this.activate();
      return;
    }
    this.deactivate();
    if (this.isCurrentlyOpen) {
      this.close();
    }
  }

  private getLeftSidePanelInfo(route: ActivatedRoute, hasLeftSidePanel: boolean = false): boolean {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return hasLeftSidePanel;
    }
    const child = children[0];
    hasLeftSidePanel = child.snapshot.data.hasLeftSidePanel;
    if (typeof hasLeftSidePanel !== 'boolean') {
      hasLeftSidePanel = false;
    }
    return this.getLeftSidePanelInfo(child, hasLeftSidePanel);
  }

  private getOperationSubjectObservable(expectedOperation: OperationTypeEnum): Observable<OperationTypeEnum> {
    return this.operationSubject.asObservable()
      .pipe(
        filter((operation: OperationTypeEnum) => operation === expectedOperation)
      );
  }
}
