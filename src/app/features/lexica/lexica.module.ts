import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LexicaRoutingModule } from './lexica-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,

    SharedModule,
    LexicaRoutingModule
  ]
})
export class LexicaModule { }
