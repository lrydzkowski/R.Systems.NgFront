import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionHandlerService } from 'src/app/shared/services/subscription-handler.service';
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

  openLeftSidePanel(): void {
    this.leftSidePanelService.open.next();
  }

}
