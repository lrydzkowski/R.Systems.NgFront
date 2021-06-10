import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';

import { LoginComponent } from './pages/login/login.component';
import { UserAuthRoutingModule } from './user-auth-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,

    PasswordModule,
    CardModule,
    ButtonModule,
    InputTextModule,

    UserAuthRoutingModule
  ]
})
export class UserAuthModule { }
