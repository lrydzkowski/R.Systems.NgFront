import { Component, OnInit } from '@angular/core';
import { BreadcrumbHandlerService } from 'src/app/shared/services/breadcrumb-handler.service';


@Component({
  selector: 'core-main-template',
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.css']
})
export class MainTemplateComponent implements OnInit {

  constructor(
    private breadcrumbHandler: BreadcrumbHandlerService) { }

  ngOnInit(): void {
    this.breadcrumbHandler.handleNavigationEndEvent();
  }

}
