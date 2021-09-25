import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomDataGeneratorPageComponent } from
  './pages/random-data-generator-page/random-data-generator-page.component';

const routes: Routes = [
  {
    path: $localize`random-data-generator`,
    component: RandomDataGeneratorPageComponent,
    data: {
      breadcrumb: $localize`Random Data Generator`,
      hasBreadcrumb: true
    }
  },
  {
    path: '',
    redirectTo: $localize`random-data-generator`
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiMockRoutingModule { }
