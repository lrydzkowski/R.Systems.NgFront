import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LexicaRoutingModule } from './lexica-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from '@shared/shared/shared.module';
import { Test1Component } from './components/test1/test1.component';


@NgModule({
  declarations: [
    MainPageComponent,
    Test1Component
  ],
  imports: [
    CommonModule,

    SharedModule,
    LexicaRoutingModule
  ]
})
export class LexicaModule { }
