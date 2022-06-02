import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: $localize`main`,
    component: MainPageComponent,
    canActivate: [MsalGuard],
    data: {
      breadcrumb: 'Lexica',
      hasBreadcrumb: true,
      hasRightSidePanel: true
    }
  },
  {
    path: '',
    redirectTo: $localize`main`
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LexicaRoutingModule { }
