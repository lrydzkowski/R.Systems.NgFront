import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionHandlerService } from '@shared/shared/services/subscription-handler.service';
import { RightSidePanelStateService } from '../../service/right-side-panel-state.service';

const showAnimation = animation([
  style({ transform: '{{transform}}', opacity: 0 }),
  animate('{{transition}}')
]);

@Component({
  selector: 'right-side-panel',
  templateUrl: './right-side-panel.component.html',
  styleUrls: ['./right-side-panel.component.css'],
  animations: [
    trigger('panelState', [
      transition('void => visible', [
        useAnimation(showAnimation)
      ])
    ])
  ],
  providers: [
    SubscriptionHandlerService
  ]
})
export class RightSidePanelComponent implements OnInit, OnDestroy {

  transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';

  transformOptions = 'translate3d(100%, 0px, 0px)';

  panelExists = false;

  panelIsOpen = false;

  constructor(
    private subscriptionHandler: SubscriptionHandlerService,
    private rightSidePanelState: RightSidePanelStateService) { }

  ngOnInit(): void {
    console.log('right-side-panel-init');
    this.handleRightPanelEvents();
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribeAll();
  }

  closePanel(): void {
    this.rightSidePanelState.close();
  }

  private handleRightPanelEvents(): void {
    this.subscriptionHandler.data.activateRightSidePanel = this.rightSidePanelState.onActivate()
      .subscribe({
        next: () => {
          this.panelExists = true;
        }
      });
    this.subscriptionHandler.data.deactivateRightSidePanel = this.rightSidePanelState.onDeactivate()
      .subscribe({
        next: () => {
          this.panelExists = false;
        }
      });
    this.subscriptionHandler.data.openRightSidePanel = this.rightSidePanelState.onOpen()
      .subscribe({
        next: () => {
          this.panelIsOpen = true;
        }
      });
    this.subscriptionHandler.data.closeRightSidePanel = this.rightSidePanelState.onClose()
      .subscribe({
        next: () => {
          this.panelIsOpen = false;
        }
      });
  }

}
