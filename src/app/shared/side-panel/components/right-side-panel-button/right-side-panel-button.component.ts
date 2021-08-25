import { Component,  OnInit } from '@angular/core';
import { SubscriptionHandlerService } from '@shared/shared/services/subscription-handler.service';
import { RightSidePanelStateService } from '@shared/side-panel/service/right-side-panel-state.service';
import { RightSidePanelService } from '../../service/right-side-panel.service';

@Component({
  selector: 'right-side-panel-button',
  templateUrl: './right-side-panel-button.component.html',
  styleUrls: ['./right-side-panel-button.component.css'],
  providers: [
    SubscriptionHandlerService
  ]
})
export class RightSidePanelButtonComponent implements OnInit {

  constructor(
    private rightSidePanelService: RightSidePanelService,
    public rightSidePanelStateService: RightSidePanelStateService) { }

  ngOnInit(): void { }

  openRightSidePanel(): void {
    this.rightSidePanelService.open();
  }
}
