import { Component, OnInit } from '@angular/core';
import { Test1Component } from '@features/lexica/components/test1/test1.component';
import { RightSidePanelInjectorService } from '@shared/side-panel/service/right-side-panel-injector.service';

@Component({
  selector: 'lexica-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private rightSidePanelInjector: RightSidePanelInjectorService) { }

  ngOnInit(): void {
    this.rightSidePanelInjector.setTabs([
      {
        header: $localize`Test 1`,
        component: Test1Component
      }
    ]);
  }

}
