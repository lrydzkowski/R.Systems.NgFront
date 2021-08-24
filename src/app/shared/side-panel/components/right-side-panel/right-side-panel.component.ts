import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SubscriptionHandlerService } from '@shared/shared/services/subscription-handler.service';
import { RightSidePanelStateService } from '@shared/side-panel/service/right-side-panel-state.service';
import { RightSidePanelService } from '../../service/right-side-panel.service';

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
export class RightSidePanelComponent implements OnInit {

  transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';

  transformOptions = 'translate3d(100%, 0px, 0px)';

  constructor(
    private rightSidePanelService: RightSidePanelService,
    public rightSidePanelStateService: RightSidePanelStateService) { }

  ngOnInit(): void { }

  closePanel(): void {
    this.rightSidePanelService.close();
  }

}
