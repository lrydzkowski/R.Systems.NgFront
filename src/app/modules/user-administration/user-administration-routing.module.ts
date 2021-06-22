import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../user-auth/services/auth-guard.service';
import { UserFormPageComponent } from './pages/user-form-page/user-form-page.component';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';

const routes: Routes = [
  {
    path: $localize`users`,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: UsersListPageComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: $localize`new`,
        component: UserFormPageComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: ':id',
        component: UserFormPageComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: '',
    redirectTo: $localize`users`
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdministrationRoutingModule { }
