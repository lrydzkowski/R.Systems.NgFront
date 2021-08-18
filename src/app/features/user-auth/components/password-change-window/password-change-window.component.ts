import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalWindowOperationEnum } from '@shared/shared/models/modal-window-operation-enum';
import { ModalWindowHandlerService } from '@shared/shared/services/modal-window-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-auth-password-change-window',
  templateUrl: './password-change-window.component.html',
  styleUrls: ['./password-change-window.component.css']
})
export class PasswordChangeWindowComponent implements OnInit, OnDestroy {

  visible: boolean = false;

  contentIsRendered: boolean = false;

  private openWindowSubscription: Subscription | null = null;

  constructor(
    private modalWindowHandler: ModalWindowHandlerService) { }

  ngOnInit(): void {
    this.subscribeOpenWindowEvent();
  }

  ngOnDestroy(): void {
    this.unsubscribeOpenWindowEvent();
  }

  private subscribeOpenWindowEvent(): void {
    this.modalWindowHandler.onOpenWindow('password-change-form').subscribe({
      next: (modalWindowOperation: ModalWindowOperationEnum) => {
        if (modalWindowOperation != ModalWindowOperationEnum.Open) {
          return;
        }
        this.visible = true;
        this.contentIsRendered = true;
      }
    });
  }

  private unsubscribeOpenWindowEvent(): void {
    if (this.openWindowSubscription === null) {
      return;
    }
    this.openWindowSubscription.unsubscribe();
  }
}
