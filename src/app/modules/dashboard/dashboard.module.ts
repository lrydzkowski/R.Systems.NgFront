import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TileComponent } from './components/tile/tile.component';


@NgModule({
  declarations: [
    MainPageComponent,
    TileComponent
  ],
  imports: [
    CommonModule,

    CardModule,

    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
