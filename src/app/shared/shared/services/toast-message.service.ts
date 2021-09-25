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
