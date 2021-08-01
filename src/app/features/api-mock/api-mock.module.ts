import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

import { LoadingModule } from 'src/app/libs/loading/loading.module';
import { RandomDataGeneratorPageComponent } from './pages/random-data-generator-page/random-data-generator-page.component';
import { ApiMockRoutingModule } from './api-mock-routing.module';



@NgModule({
  declarations: [
    RandomDataGeneratorPageComponent
  ],
  imports: [
    CommonModule,

    ButtonModule,
    CardModule,
    DividerModule,

    LoadingModule,
    ApiMockRoutingModule
  ]
})
export class ApiMockModule { }
