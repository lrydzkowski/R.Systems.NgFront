import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionHandlerService } from 'src/app/shared/services/subscription-handler.service';
import { LeftSidePanelService } from '../../service/left-side-panel.service';

@Component({
  selector: 'left-side-panel',
  templateUrl: './left-side-panel.component.html',
  animations: [
    trigger('slideRightLeft', [
      transition(':enter', [style({ width: 0 }), animate(200)]),
      transition(':leave', [animate(200, style({ width: 0 }))])
    ])
  ],
  styleUrls: ['./left-side-panel.component.css'],
  providers: [SubscriptionHandlerService]
})
export class LeftSidePanelComponent implements OnInit, OnDestroy {

  constructor(
    public leftSidePanelService: LeftSidePanelService,
    private subscriptionHandlerService: SubscriptionHandlerService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptionHandlerService.unsubscribeAll();
  }

  closePanel(): void {
    this.leftSidePanelService.close.next();
  }

}
