import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../user-auth/services/auth-guard.service';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: $localize`main`,
    component: MainPageComponent,
    canActivate: [AuthGuardService]
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
