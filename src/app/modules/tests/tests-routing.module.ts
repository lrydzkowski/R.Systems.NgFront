import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: $localize`main`,
    component: MainPageComponent,
    data: {
      breadcrumb: 'Main',
      hasBreadcrumb: true
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
export class TestsRoutingModule { }
