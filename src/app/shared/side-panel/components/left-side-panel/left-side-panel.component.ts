import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionHandlerService } from '@shared/shared/services/subscription-handler.service';
import { LeftSidePanelService } from '../../service/left-side-panel.service';

const showAnimation = animation([
  style({ transform: '{{transform}}', opacity: 0 }),
  animate('{{transition}}')
]);

const hideAnimation = animation([
  animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);

@Component({
  selector: 'left-side-panel',
  templateUrl: './left-side-panel.component.html',
  styleUrls: ['./left-side-panel.component.css'],
  animations: [
    trigger('panelState', [
      transition('void => visible', [
        useAnimation(showAnimation)
      ])/*,
      transition('visible => void', [
        useAnimation(hideAnimation)
      ])*/
    ])
  ],
  providers: [SubscriptionHandlerService]
})
export class LeftSidePanelComponent implements OnInit, OnDestroy {

  transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';

  transformOptions: any = "translate3d(-100%, 0px, 0px)";

  constructor(
    public leftSidePanelService: LeftSidePanelService,
    private subscriptionHandlerService: SubscriptionHandlerService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptionHandlerService.unsubscribeAll();
  }

  closePanel(): void {
    this.leftSidePanelService.close();
  }

}
