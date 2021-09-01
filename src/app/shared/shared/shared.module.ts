import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { NullableFormatPipe } from './pipes/nullable-format.pipe';


@NgModule({
  declarations: [
    BreadcrumbComponent,
    AutofocusDirective,
    ToastMessageComponent,
    NullableFormatPipe
  ],
  imports: [
    CommonModule,

    BreadcrumbModule,
    ToastModule
  ],
  exports: [
    BreadcrumbComponent,
    AutofocusDirective,
    ToastMessageComponent,
    NullableFormatPipe
  ]
})
export class SharedModule { }
