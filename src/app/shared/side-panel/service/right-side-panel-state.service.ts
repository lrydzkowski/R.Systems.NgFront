import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { RightSidePanelService } from './right-side-panel.service';

@Injectable({
  providedIn: 'root'
})
export class RightSidePanelStateService {

  panelExists: boolean = false;

  panelIsOpen: boolean = false;

  private subscriptions: { [key: string]: Subscription } = {};

  constructor(public rightSidePanelService: RightSidePanelService) {
    this.handleRightPanelEvents();
  }

  destroy(): void {
    for (const subscriptionKey in this.subscriptions) {
      if (Object.prototype.hasOwnProperty.call(this.subscriptions, subscriptionKey)) {
        const element = this.subscriptions[subscriptionKey];
        element.unsubscribe();
      }
    }
    this.subscriptions = {};
  }

  handleRightPanelEvents(): void {
    this.subscriptions.activateRightSidePanel = this.rightSidePanelService.onActivate()
      .subscribe({
        next: () => {
          this.panelExists = true;
        }
      });
    this.subscriptions.deactivateRightSidePanel = this.rightSidePanelService.onDeactivate()
      .subscribe({
        next: () => {
          this.panelExists = false;
        }
      });
    this.subscriptions.openRightSidePanel = this.rightSidePanelService.onOpen()
      .subscribe({
        next: () => {
          this.panelIsOpen = true;
        }
      });
    this.subscriptions.closeRightSidePanel = this.rightSidePanelService.onClose()
      .subscribe({
        next: () => {
          this.panelIsOpen = false;
        }
      });
  }
}
