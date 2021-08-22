import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionHandlerService } from '@shared/shared/services/subscription-handler.service';
import { RightSidePanelService } from '../../service/right-side-panel.service';

@Component({
  selector: 'right-side-panel-button',
  templateUrl: './right-side-panel-button.component.html',
  styleUrls: ['./right-side-panel-button.component.css'],
  providers: [SubscriptionHandlerService]
})
export class RightSidePanelButtonComponent implements OnInit, OnDestroy {

  constructor(
    public leftSidePanelService: RightSidePanelService,
    private subscriptionHandlerService: SubscriptionHandlerService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptionHandlerService.unsubscribeAll();
  }

  isShowed(): boolean {
    return this.leftSidePanelService.isShowed();
  }

  openLeftSidePanel(): void {
    this.leftSidePanelService.open();
  }

}
