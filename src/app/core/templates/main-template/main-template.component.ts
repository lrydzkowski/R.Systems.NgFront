import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbHandlerService } from '@shared/shared/services/breadcrumb-handler.service';
import { SubscriptionHandlerService } from '@shared/shared/services/subscription-handler.service';


@Component({
  selector: 'core-main-template',
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.css'],
  providers: [SubscriptionHandlerService]
})
export class MainTemplateComponent implements OnInit, OnDestroy {

  constructor(
    private subscriptionHandler: SubscriptionHandlerService,
    public breadcrumbHandler: BreadcrumbHandlerService) { }

  ngOnInit(): void {
    this.breadcrumbHandler.handleNavigationEndEvent();
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribeAll();
  }

}
