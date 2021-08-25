import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

import { TestsRoutingModule } from './tests-routing.module';
import { ReactiveFormWithCalendarPageComponent } from
  './pages/reactive-form-with-calendar-page/reactive-form-with-calendar-page.component';


@NgModule({
  declarations: [
    ReactiveFormWithCalendarPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CalendarModule,
    InputTextModule,

    TestsRoutingModule
  ]
})
export class TestsModule { }
