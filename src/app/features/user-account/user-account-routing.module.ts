import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '@features/user-auth/routes-guards/authenticated.guard';
import { PasswordChangePageComponent } from './pages/password-change-page/password-change-page.component';

const routes: Routes = [
  {
    path: $localize`password-change`,
    component: PasswordChangePageComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      breadcrumb: $localize`Password change`,
      hasBreadcrumb: true
    }
  },
  {
    path: '',
    redirectTo: $localize`password-change`
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
