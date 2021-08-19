import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@features/user-auth/services/auth-guard.service';
import { PasswordChangeFormPageComponent } from './pages/password-change-form-page/password-change-form-page.component';

const routes: Routes = [
  {
    path: $localize`password-change`,
    component: PasswordChangeFormPageComponent,
    canActivate: [AuthGuardService],
    data: {
      breadcrumb: $localize`Password change`,
      hasBreadcrumb: true
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserAccountRoutingModule { }
