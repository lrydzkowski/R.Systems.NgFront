import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LexicaRoutingModule } from './lexica-routing.module';
import { MainComponent } from './pages/main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    LexicaRoutingModule
  ]
})
export class LexicaModule { }
