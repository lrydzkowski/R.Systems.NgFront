import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ToastMessageOperation } from '../models/toast-message-operation';
import { ToastMessageOperationTypeEnum } from '../models/toast-message-operation-type-enum';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  private toastMessageSubject = new Subject<ToastMessageOperation>();

  constructor() { }

  showUnexpectedErrorMessage(clearExistingToastMessage: boolean = true): void {
    this.showErrorMessage($localize`An unexpected error has occured.`, clearExistingToastMessage);
  }

  showConnectionErrorMessage(clearExistingToastMessage: boolean = true): void {
    this.showErrorMessage($localize`A connection error has occured.`, clearExistingToastMessage);
  }

  showNoPermissionErrorMessage(clearExistingToastMessage: boolean = true): void {
    this.showErrorMessage($localize`You don't have permission.`, clearExistingToastMessage);
  }

  showErrorMessage(msg: string, clearExistingToastMessage: boolean = true): void {
    if (clearExistingToastMessage) {
      this.clearToastMessage();
    }
    this.showToastMessage({
      severity: 'error',
      summary: $localize`Error`,
      detail: msg,
      sticky: true
    });
  }

  showConfirmationMessage(msg: string, clearExistingToastMessage: boolean = true): void {
    if (clearExistingToastMessage) {
      this.clearToastMessage();
    }
    this.showToastMessage({
      severity: 'success',
      summary: $localize`Confirmation`,
      detail: msg
    });
  }

  showToastMessage(message: Message): void {
    this.toastMessageSubject.next({
      operationType: ToastMessageOperationTypeEnum.Show,
      message
    });
  }

  clearToastMessage(): void {
    this.toastMessageSubject.next({
      operationType: ToastMessageOperationTypeEnum.Clear
    });
  }

  onShowToastMessage(): Observable<Message | null> {
    return this.toastMessageSubject.asObservable()
      .pipe(
        filter((operation: ToastMessageOperation) => operation.operationType === ToastMessageOperationTypeEnum.Show),
        map((operation: ToastMessageOperation) => operation?.message ?? null)
      );
  }

  onClearToastMessage(): Observable<null> {
    return this.toastMessageSubject.asObservable()
      .pipe(
        filter((operation: ToastMessageOperation) => operation.operationType === ToastMessageOperationTypeEnum.Clear),
        map((operation: ToastMessageOperation) => null)
      );
  }
}
