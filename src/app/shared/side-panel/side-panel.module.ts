import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';

import { RightSidePanelComponent } from './components/right-side-panel/right-side-panel.component';
import { RightSidePanelButtonComponent } from './components/right-side-panel-button/right-side-panel-button.component';


@NgModule({
  declarations: [
    RightSidePanelButtonComponent,
    RightSidePanelComponent
  ],
  imports: [
    CommonModule,

    ButtonModule,
    TabViewModule
  ],
  exports: [
    RightSidePanelButtonComponent,
    RightSidePanelComponent
  ]
})
export class SidePanelModule { }
