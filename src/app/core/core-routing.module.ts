import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';



const routes: Routes = [
  {
    path: $localize`dashboard`,
    loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: $localize`administration`,
    loadChildren: () => import('../modules/user-administration/user-administration.module').then(m => m.UserAdministrationModule)
  },
  {
    path: 'lexica',
    loadChildren: () => import('../modules/lexica/lexica.module').then(m => m.LexicaModule)
  },
  { path: '**', component: PageNotFoundComponent }
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
