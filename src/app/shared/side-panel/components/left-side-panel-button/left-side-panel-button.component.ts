import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionHandlerService } from '@shared/shared/services/subscription-handler.service';
import { LeftSidePanelService } from '../../service/left-side-panel.service';

@Component({
  selector: 'left-side-panel-button',
  templateUrl: './left-side-panel-button.component.html',
  styleUrls: ['./left-side-panel-button.component.css'],
  providers: [SubscriptionHandlerService]
})
export class LeftSidePanelButtonComponent implements OnInit, OnDestroy {

  constructor(
    public leftSidePanelService: LeftSidePanelService,
    private subscriptionHandlerService: SubscriptionHandlerService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptionHandlerService.unsubscribeAll();
  }

  isShowed(): boolean {
    return this.leftSidePanelService.isHandled && !this.leftSidePanelService.isOpen;
  }

  openLeftSidePanel(): void {
    this.leftSidePanelService.open.next();
  }

}
