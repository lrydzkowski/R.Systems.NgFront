import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../modules/user-auth/services/auth-guard.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';



const routes: Routes = [
  {
    path: $localize`dashboard`,
    loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuardService]
  },
  {
    path: $localize`administration`,
    loadChildren: () => import('../modules/user-administration/user-administration.module').then(m => m.UserAdministrationModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'lexica',
    loadChildren: () => import('../modules/lexica/lexica.module').then(m => m.LexicaModule),
    canActivate: [AuthGuardService]
  },
  {
    path: $localize`api-mock`,
    loadChildren: () => import('../modules/api-mock/api-mock.module').then(m => m.ApiMockModule),
    data: {
      breadcrumb: $localize`API Mock`
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
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
export class CoreRoutingModule { }
