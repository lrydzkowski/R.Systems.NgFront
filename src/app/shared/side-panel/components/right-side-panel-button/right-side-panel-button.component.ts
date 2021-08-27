import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { SubscriptionHandlerService } from '@shared/shared/services/subscription-handler.service';
import { RightSidePanelStateService } from '../../service/right-side-panel-state.service';

@Component({
  selector: 'right-side-panel-button',
  templateUrl: './right-side-panel-button.component.html',
  styleUrls: ['./right-side-panel-button.component.css'],
  providers: [
    SubscriptionHandlerService
  ]
})
export class RightSidePanelButtonComponent implements OnInit, OnDestroy {

  buttonExists = false;

  buttonIsVisible = true;

  constructor(
    private subscriptionHandler: SubscriptionHandlerService,
    private rightSidePanelState: RightSidePanelStateService) { }

  ngOnInit(): void {
    this.handleRightPanelEvents();
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribeAll();
  }

  openRightSidePanel(): void {
    this.rightSidePanelState.open();
  }

  private handleRightPanelEvents(): void {
    this.subscriptionHandler.data.activateRightSidePanel = this.rightSidePanelState.onActivate()
      .subscribe({
        next: () => {
          this.buttonExists = true;
        }
      });
    this.subscriptionHandler.data.deactivateRightSidePanel = this.rightSidePanelState.onDeactivate()
      .subscribe({
        next: () => {
          this.buttonExists = false;
        }
      });
    this.subscriptionHandler.data.openRightSidePanel = this.rightSidePanelState.onOpen()
      .subscribe({
        next: () => {
          this.buttonIsVisible = false;
        }
      });
    this.subscriptionHandler.data.closeRightSidePanel = this.rightSidePanelState.onClose()
      .subscribe({
        next: () => {
          this.buttonIsVisible = true;
        }
      });
  }
}
