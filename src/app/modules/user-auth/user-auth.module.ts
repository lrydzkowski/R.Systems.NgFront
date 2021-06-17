import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FocusTrapModule } from 'primeng/focustrap';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserAuthRoutingModule } from './user-auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { JwtTokenService } from './services/jwt-token.service';


export function jwtOptionsFactory(jwtTokenService: JwtTokenService) {
  return {
    tokenGetter: () => {
      return jwtTokenService.getToken();
    }
  }
}

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

    PasswordModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    FocusTrapModule,
    SharedModule,

    UserAuthRoutingModule,

    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [JwtTokenService]
      }
    })
  ]
})
export class UserAuthModule { }
