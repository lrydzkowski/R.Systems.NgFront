import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MsalBroadcastService, MsalGuard, MsalInterceptor, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { TieredMenuModule } from 'primeng/tieredmenu';

import { SidePanelModule } from '@shared/side-panel/side-panel.module';
import { SharedModule } from '@shared/shared/shared.module';
import { LoadingModule } from '@shared/loading/loading.module';

import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainTemplateComponent } from './templates/main-template/main-template.component';
import { TimezoneOffsetInterceptor } from './interceptors/timezone-offset.interceptor';
import { CoreRoutingModule } from './core-routing.module';
import { AboutAppComponent } from './components/about-app/about-app.component';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { ChangelogComponent } from './components/changelog/changelog.component';
import { UserAuthModule } from '@features/user-auth/user-auth.module';
import { MsalInstanceFactory } from '@features/user-auth/factories/msal-instance-factory';
import { MsalGuardConfigFactory } from '@features/user-auth/factories/msal-guard-config-factory';
import { MsalInterceptorConfigFactory } from '@features/user-auth/factories/msal-interceptor-config-factory';


@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    MainTemplateComponent,
    PageNotFoundComponent,
    MainTemplateComponent,
    AboutAppComponent,
    AppMenuComponent,
    ChangelogComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MsalModule,

    MenubarModule,
    ButtonModule,
    SidebarModule,
    SlideMenuModule,
    RippleModule,
    DialogModule,
    TieredMenuModule,

    SidePanelModule,
    SharedModule,
    LoadingModule,
    UserAuthModule,

    CoreRoutingModule
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: MsalInterceptor,
        multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MsalInstanceFactory.build
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MsalGuardConfigFactory.build
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MsalInterceptorConfigFactory.build
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimezoneOffsetInterceptor,
      multi: true
    },
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
