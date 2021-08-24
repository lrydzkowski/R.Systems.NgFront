import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModalWindowOperationEnum } from '../models/modal-window-operation-enum';

@Injectable({
  providedIn: 'root'
})
export class ModalWindowHandlerService {

  private windowSubjects: { [key: string]: Subject<ModalWindowOperationEnum> } = {};

  constructor() { }

  openWindow(windowName: string): void {
    const windowSubject = this.getWindowSubject(windowName);
    windowSubject.next(ModalWindowOperationEnum.Open);
  }

  onOpenWindow(windowName: string): Observable<ModalWindowOperationEnum> {
    const windowSubject = this.getWindowSubject(windowName);
    return windowSubject.asObservable();
  }

  private getWindowSubject(windowName: string): Subject<ModalWindowOperationEnum> {
    if (!this.windowSubjects.hasOwnProperty(windowName)) {
      this.windowSubjects[windowName] = new Subject<ModalWindowOperationEnum.Open>();
    }
    return this.windowSubjects[windowName];
  }
}
