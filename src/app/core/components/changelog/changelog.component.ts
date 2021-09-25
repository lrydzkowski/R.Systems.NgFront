import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalWindowOperationEnum } from '@shared/shared/models/modal-window-operation-enum';
import { ModalWindowHandlerService } from '@shared/shared/services/modal-window-handler.service';
import { Subscription } from 'rxjs';
import changelog from '@assets/changelog/changelog.json';

@Component({
  selector: 'core-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent implements OnInit, OnDestroy {

  changelog = changelog;

  visible = false;

  private openWindowSubscription: Subscription | null = null;

  constructor(private modalWindowHandler: ModalWindowHandlerService) { }

  ngOnInit(): void {
    this.subscribeOpenWindowEvent();
  }

  ngOnDestroy(): void {
    this.unsubscribeOpenWindowEvent();
  }

  private subscribeOpenWindowEvent(): void {
    this.modalWindowHandler.onOpenWindow('changelog').subscribe({
      next: (modalWindowOperation: ModalWindowOperationEnum) => {
        if (modalWindowOperation !== ModalWindowOperationEnum.Open) {
          return;
        }
        this.visible = true;
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
