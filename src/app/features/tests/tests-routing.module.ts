import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ReactiveFormWithCalendarPageComponent } from
  './pages/reactive-form-with-calendar-page/reactive-form-with-calendar-page.component';

const routes: Routes = [
  {
    path: $localize`reactive-form-with-calendar`,
    component: ReactiveFormWithCalendarPageComponent,
    canActivate: [MsalGuard],
    data: {
      breadcrumb: $localize`Reactive Form With Calendar`,
      hasBreadcrumb: true,
      hasRightSidePanel: true
    }
  },
  {
    path: '',
    redirectTo: $localize`reactive-form-with-calendar`
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule { }
