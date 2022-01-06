import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';

import { LexicaRoutingModule } from './lexica-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from '@shared/shared/shared.module';
import { Test1Component } from './components/test1/test1.component';
import { RequestsComponent } from './components/requests/requests.component';


@NgModule({
  declarations: [
    MainPageComponent,
    Test1Component,
    RequestsComponent
  ],
  imports: [
    CommonModule,

    ButtonModule,

    SharedModule,
    LexicaRoutingModule
  ]
})
export class LexicaModule { }
