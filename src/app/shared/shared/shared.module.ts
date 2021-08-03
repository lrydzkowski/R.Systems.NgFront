import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbModule } from 'primeng/breadcrumb';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AutofocusDirective } from './directives/autofocus.directive';


@NgModule({
  declarations: [
    BreadcrumbComponent,
    AutofocusDirective
  ],
  imports: [
    CommonModule,

    BreadcrumbModule
  ],
  exports: [
    BreadcrumbComponent,
    AutofocusDirective
  ]
})
export class SharedModule { }
