import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { UserAccountRoutingModule } from './user-account-routing.module';
import { PasswordChangePageComponent } from './pages/password-change-page/password-change-page.component';
import { PasswordChangeFormComponent } from './components/password-change-form/password-change-form.component';


@NgModule({
  declarations: [
    PasswordChangeFormComponent,
    PasswordChangePageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ProgressSpinnerModule,

    UserAccountRoutingModule
  ]
})
export class UserAccountModule { }
