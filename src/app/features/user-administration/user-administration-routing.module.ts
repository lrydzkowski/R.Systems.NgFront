import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '@features/user-auth/routes-guards/authenticated.guard';
import { UserFormPageComponent } from './pages/user-form-page/user-form-page.component';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';

const routes: Routes = [
  {
    path: $localize`users`,
    data: {
      breadcrumb: $localize`Users`
    },
    children: [
      {
        path: '',
        component: UsersListPageComponent,
        canActivate: [AuthenticatedGuard],
        data: {
          breadcrumb: null,
          hasRightSidePanel: true,
          hasBreadcrumb: true
        }
      },
      {
        path: $localize`new`,
        component: UserFormPageComponent,
        canActivate: [AuthenticatedGuard],
        data: {
          breadcrumb: $localize`New user`,
          hasBreadcrumb: true
        }
      },
      {
        path: ':id',
        component: UserFormPageComponent,
        canActivate: [AuthenticatedGuard],
        data: {
          breadcrumb: $localize`Existing user`,
          hasBreadcrumb: true
        }
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
