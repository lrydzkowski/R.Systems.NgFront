import { Component, OnInit } from '@angular/core';
import { BreadcrumbHandlerService } from '../../services/breadcrumb-handler.service';
import { SubscriptionHandlerService } from '../../services/subscription-handler.service';

@Component({
  selector: 'shared-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  providers: [
    SubscriptionHandlerService
  ]
})
export class BreadcrumbComponent implements OnInit {

  home = {icon: 'pi pi-home', routerLink: '/'};

  constructor(
    public breadcrumbHandler: BreadcrumbHandlerService) { }

  ngOnInit(): void { }

}
