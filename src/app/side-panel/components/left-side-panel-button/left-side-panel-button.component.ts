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

  isVisible: boolean = true;

  constructor(
    private leftSidePanelService: LeftSidePanelService,
    private subscriptionHandlerService: SubscriptionHandlerService) { }

  ngOnInit(): void {
    this.handleEvents();
  }

  ngOnDestroy(): void {
    this.subscriptionHandlerService.unsubscribeAll();
  }

  openLeftSidePanel(): void {
    this.leftSidePanelService.open.next();
  }

  private handleEvents(): void {
    this.subscriptionHandlerService.data.panelOpening = this.leftSidePanelService.open.subscribe(() => {
      this.isVisible = false;
    });
    this.subscriptionHandlerService.data.panelClosing = this.leftSidePanelService.close.subscribe(() => {
      this.isVisible = true;
    });
  }

}
