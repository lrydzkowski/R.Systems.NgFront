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
        this.checkRightSidePanelState();
      });
  }

  private checkRightSidePanelState(): void {
    const hasRightSidePanel: boolean = this.getRightSidePanelInfo(this.activatedRoute.root);
    if (hasRightSidePanel) {
      this.activate();
      return;
    }
    this.deactivate();
    if (this.isCurrentlyOpen) {
      this.close();
    }
  }

  private getRightSidePanelInfo(route: ActivatedRoute, hasRightSidePanel: boolean = false): boolean {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return hasRightSidePanel;
    }
    const child = children[0];
    hasRightSidePanel = child.snapshot.data.hasRightSidePanel;
    if (typeof hasRightSidePanel !== 'boolean') {
      hasRightSidePanel = false;
    }
    return this.getRightSidePanelInfo(child, hasRightSidePanel);
  }

  private getOperationSubjectObservable(expectedOperation: OperationTypeEnum): Observable<OperationTypeEnum> {
    return this.operationSubject.asObservable()
      .pipe(
        filter((operation: OperationTypeEnum) => operation === expectedOperation)
      );
  }
}
