import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { BreadcrumbHandlerService } from 'src/app/shared/services/breadcrumb-handler.service';


@Component({
  selector: 'core-main-template',
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.css']
})
export class MainTemplateComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig,
    private breadcrumbHandler: BreadcrumbHandlerService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.breadcrumbHandler.handleNavigationEndEvent();
  }

}
