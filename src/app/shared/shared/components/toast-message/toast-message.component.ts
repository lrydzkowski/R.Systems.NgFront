import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionHandlerService } from '@shared/shared/services/subscription-handler.service';
import { ToastMessageService } from '@shared/shared/services/toast-message.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'shared-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css'],
  providers: [MessageService, SubscriptionHandlerService]
})
export class ToastMessageComponent implements OnInit, OnDestroy {

  constructor(
    private messageService: MessageService,
    private toastMessageService: ToastMessageService,
    private subscriptionHandler: SubscriptionHandlerService) { }

  ngOnInit(): void {
    this.handleShowToastMessageEvent();
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribeAll();
  }

  private handleShowToastMessageEvent(): void {
    this.subscriptionHandler.data.showToastMessage = this.toastMessageService.onShowToastMessage().subscribe({
      next: (msg: Message) => {
        this.messageService.add(msg);
      }
    });
  }

}
