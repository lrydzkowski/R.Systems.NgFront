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
    this.handleClearToastMessageEvent();
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribeAll();
  }

  private handleShowToastMessageEvent(): void {
    this.subscriptionHandler.data.showToastMessage = this.toastMessageService.onShowToastMessage().subscribe({
      next: (msg: Message | null) => {
        if (msg === null) {
          return;
        }
        this.messageService.add(msg);
      }
    });
  }

  private handleClearToastMessageEvent(): void {
    this.subscriptionHandler.data.clearToastMessage = this.toastMessageService.onClearToastMessage().subscribe({
      next: () => {
        this.messageService.clear();
      }
    });
  }

}
