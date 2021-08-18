import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';


@NgModule({
  declarations: [
    BreadcrumbComponent,
    AutofocusDirective,
    ToastMessageComponent
  ],
  imports: [
    CommonModule,

    BreadcrumbModule,
    ToastModule
  ],
  exports: [
    BreadcrumbComponent,
    AutofocusDirective,
    ToastMessageComponent
  ]
})
export class SharedModule { }
