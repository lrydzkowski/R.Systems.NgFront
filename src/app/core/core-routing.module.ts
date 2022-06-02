import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';



const routes: Routes = [
  {
    path: $localize`dashboard`,
    loadChildren: () => import('../features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'lexica',
    loadChildren: () => import('../features/lexica/lexica.module').then(m => m.LexicaModule)
  },
  {
    path: $localize`api-mock`,
    loadChildren: () => import('../features/api-mock/api-mock.module').then(m => m.ApiMockModule),
    data: {
      breadcrumb: $localize`API Mock`
    }
  },
  {
    path: 'tests',
    loadChildren: () => import('../features/tests/tests.module').then(m => m.TestsModule),
    data: {
      breadcrumb: $localize`Tests`
    }
  },
  {
    path: '',
    redirectTo: $localize`/login`,
    pathMatch: 'full'
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
