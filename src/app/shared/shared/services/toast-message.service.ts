import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  private toastMessageSubject = new Subject<Message>();

  constructor() { }

  showToastMessage(message: Message): void {
    this.toastMessageSubject.next(message);
  }

  onShowToastMessage(): Observable<Message> {
    return this.toastMessageSubject.asObservable();
  }
}
