import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TooltipModule } from 'primeng/tooltip';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { UserAdministrationRoutingModule } from './user-administration-routing.module';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';
import { SharedModule } from '@shared/shared/shared.module';
import { UserFormPageComponent } from './pages/user-form-page/user-form-page.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SidePanelModule } from '@shared/side-panel/side-panel.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { LoadingModule } from '@shared/loading/loading.module';
import { UserRolesPipe } from './pipes/user-roles.pipe';
import { UserDetailsComponent } from './components/user-details/user-details.component';


@NgModule({
  declarations: [
    UsersListPageComponent,
    UserFormPageComponent,
    UserFormComponent,
    UsersListComponent,
    UserRolesPipe,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,

    CardModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TieredMenuModule,
    TooltipModule,
    ContextMenuModule,
    ConfirmDialogModule,

    SharedModule,
    SidePanelModule,
    LoadingModule,
    UserAdministrationRoutingModule
  ]
})
export class UserAdministrationModule { }
