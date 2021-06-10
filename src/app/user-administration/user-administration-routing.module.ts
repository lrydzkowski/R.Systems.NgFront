import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormPageComponent } from './pages/user-form-page/user-form-page.component';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';

const routes: Routes = [
  { 
    path: $localize`users`,
    children: [
      {
        path: '',
        component: UsersListPageComponent,
      },
      {
        path: $localize`new`,
        component: UserFormPageComponent
      },
      {
        path: ':id',
        component: UserFormPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdministrationRoutingModule { }
