import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { LoadingAnimationComponent } from './components/loading-animation/loading-animation.component';



@NgModule({
  declarations: [
    LoadingAnimationComponent
  ],
  imports: [
    CommonModule,

    ProgressSpinnerModule
  ],
  exports: [
    LoadingAnimationComponent
  ]
})
export class LoadingModule { }
