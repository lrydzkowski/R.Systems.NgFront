import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { UserAccountRoutingModule } from './user-account-routing.module';
import { PasswordChangeFormPageComponent } from './pages/password-change-form-page/password-change-form-page.component';
import { PasswordChangeFormComponent } from './components/password-change-form/password-change-form.component';


@NgModule({
  declarations: [
    PasswordChangeFormComponent,
    PasswordChangeFormPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,

    UserAccountRoutingModule
  ]
})
export class UserAccountModule { }
