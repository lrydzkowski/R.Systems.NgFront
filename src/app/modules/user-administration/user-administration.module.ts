import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { UserAdministrationRoutingModule } from './user-administration-routing.module';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';
import { SharedModule } from '../../shared/shared.module';
import { UserFormPageComponent } from './pages/user-form-page/user-form-page.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SidePanelModule } from '../../side-panel/side-panel.module';
import { UsersListComponent } from './components/users-list/users-list.component';


@NgModule({
  declarations: [
    UsersListPageComponent,
    UserFormPageComponent,
    UserFormComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,

    CardModule,
    ButtonModule,
    InputTextModule,

    SharedModule,
    SidePanelModule,
    UserAdministrationRoutingModule
  ]
})
export class UserAdministrationModule { }
