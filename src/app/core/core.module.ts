import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';

import { SidePanelModule } from '@shared/side-panel/side-panel.module';
import { SharedModule } from '@shared/shared/shared.module';

import { FakeBackendInterceptor } from '@features/api-mock/interceptors/fake-backend.interceptor';
import { UserAuthModule } from '@features/user-auth/user-auth.module';

import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainTemplateComponent } from './templates/main-template/main-template.component';
import { InfoButtonComponent } from './components/info-button/info-button.component';
import { TimezoneOffsetInterceptor } from './interceptors/timezone-offset.interceptor';
import { CoreRoutingModule } from './core-routing.module';
import { AboutAppComponent } from './components/about-app/about-app.component';


@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    MainTemplateComponent,
    PageNotFoundComponent,
    MainTemplateComponent,
    InfoButtonComponent,
    AboutAppComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    MenubarModule,
    ButtonModule,
    SidebarModule,
    SlideMenuModule,
    RippleModule,
    DialogModule,

    SidePanelModule,
    SharedModule,
    
    UserAuthModule,
    CoreRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimezoneOffsetInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true
    }
  ],
  exports: [
    MainTemplateComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
