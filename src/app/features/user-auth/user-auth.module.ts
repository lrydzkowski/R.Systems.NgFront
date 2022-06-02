import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { LoadingModule } from '@shared/loading/loading.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileButtonComponent } from './components/profile-button/profile-button.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { UserAuthRoutingModule } from './user-auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';



@NgModule({
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    LogoutButtonComponent,
    ProfileComponent,
    ProfileButtonComponent,
    UserAuthComponent
  ],
  imports: [
    CommonModule,

    DialogModule,
    CardModule,
    ButtonModule,

    LoadingModule,
    UserAuthRoutingModule
  ],
  exports: [
    LogoutButtonComponent,
    ProfileComponent,
    ProfileButtonComponent,
    UserAuthComponent
  ]
})
export class UserAuthModule { }
