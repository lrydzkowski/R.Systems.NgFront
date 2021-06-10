import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CoreRoutingModule } from './core-routing.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainTemplateComponent } from './templates/main-template/main-template.component';
import { UserAuthModule } from '../user-auth/user-auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SidePanelModule } from '../side-panel/side-panel.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TimezoneOffsetInterceptor } from './interceptors/timezone-offset.interceptor';





@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    MainTemplateComponent,
    PageNotFoundComponent,
    MainTemplateComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    MenubarModule,
    ButtonModule,
    SidebarModule,
    SlideMenuModule,

    SidePanelModule,
    UserAuthModule,
    CoreRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimezoneOffsetInterceptor,
      multi: true
    }

  ],
  exports: [
    MainTemplateComponent
  ]
})
export class CoreModule { }
