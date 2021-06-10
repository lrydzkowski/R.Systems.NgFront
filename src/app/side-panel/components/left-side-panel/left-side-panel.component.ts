import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionHandlerService } from 'src/app/shared/services/subscription-handler.service';
import { LeftSidePanelService } from '../../service/left-side-panel.service';

@Component({
  selector: 'left-side-panel',
  templateUrl: './left-side-panel.component.html',
  // animations: [
  //   trigger('panelState', [
  //     transition('void => visible', [
  //         useAnimation(showAnimation)
  //     ]),
  //     transition('visible => void', [
  //         useAnimation(hideAnimation)
  //     ])
  //   ])
  // ],
  styleUrls: ['./left-side-panel.component.css'],
  providers: [SubscriptionHandlerService]
})
export class LeftSidePanelComponent implements OnInit, OnDestroy {

  isOpened: boolean = false;

  constructor(
    private leftSidePanelService: LeftSidePanelService,
    private subscriptionHandlerService: SubscriptionHandlerService) { }

  ngOnInit(): void {
    this.handleEvents();
  }

  ngOnDestroy(): void {
    this.subscriptionHandlerService.unsubscribeAll();
  }

  handleEvents(): void {
    this.subscriptionHandlerService.data.panelOpening = this.leftSidePanelService.open.subscribe(() => {
      this.isOpened = true;
    });
    this.subscriptionHandlerService.data.panelClosing = this.leftSidePanelService.close.subscribe(() => {
      this.isOpened = false;
    });
  }

  closePanel(): void {
    this.leftSidePanelService.close.next();
  }

}
