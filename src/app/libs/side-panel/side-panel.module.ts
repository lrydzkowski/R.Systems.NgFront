import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';

import { LeftSidePanelComponent } from './components/left-side-panel/left-side-panel.component';
import { LeftSidePanelButtonComponent } from './components/left-side-panel-button/left-side-panel-button.component';


@NgModule({
  declarations: [
    LeftSidePanelButtonComponent,
    LeftSidePanelComponent
  ],
  imports: [
    CommonModule,

    ButtonModule,
    TabViewModule
  ],
  exports: [
    LeftSidePanelButtonComponent,
    LeftSidePanelComponent
  ]
})
export class SidePanelModule { }
