import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '@features/user-auth/routes-guards/authenticated.guard';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: $localize`main`,
    component: MainPageComponent,
    canActivate: [AuthenticatedGuard],
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
