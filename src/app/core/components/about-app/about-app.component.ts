import { Component, OnDestroy, OnInit } from '@angular/core';
import { VersionService as LexicaVersionService } from '@features/lexica/api/services/version.service';
import { VersionService as AuthVersionService } from '@features/user-auth/api/services/version.service';
import { ModalWindowOperationEnum } from '@shared/shared/models/modal-window-operation-enum';
import { ModalWindowHandlerService } from '@shared/shared/services/modal-window-handler.service';
import { Subscription } from 'rxjs';
import { SubscriptionHandlerService } from '@shared/shared/services/subscription-handler.service';
import { environment } from 'src/environments/environment';
import { App } from '@shared/shared/models/app';

@Component({
  selector: 'core-about-app',
  templateUrl: './about-app.component.html',
  styleUrls: ['./about-app.component.css'],
  providers: [
    SubscriptionHandlerService
  ]
})
export class AboutAppComponent implements OnInit, OnDestroy {

  visible = false;

  version: string = environment.version;

  backendVersion = {
    auth: '-',
    lexica: '-'
  };

  build: string = environment.build;

  private openWindowSubscription: Subscription | null = null;

  constructor(
    private modalWindowHandler: ModalWindowHandlerService,
    private subscriptionHandler: SubscriptionHandlerService,
    private lexicaVersionService: LexicaVersionService,
    private authVersionService: AuthVersionService) { }

  ngOnInit(): void {
    this.subscribeOpenWindowEvent();
    this.getAuthVersion();
    this.getLexicaVersion();
  }

  ngOnDestroy(): void {
    this.unsubscribeOpenWindowEvent();
  }

  getYearsRange(): string {
    const startYear = 2021;
    const currentYear: number = new Date().getFullYear();
    if (startYear === currentYear) {
      return startYear.toString();
    }
    return `${startYear} - ${currentYear}`;
  }

  private subscribeOpenWindowEvent(): void {
    this.modalWindowHandler.onOpenWindow('about-app').subscribe({
      next: (modalWindowOperation: ModalWindowOperationEnum) => {
        if (modalWindowOperation !== ModalWindowOperationEnum.Open) {
          return;
        }
        this.visible = true;
      }
    });
  }

  private getAuthVersion(): void {
    this.subscriptionHandler.data['getAuthVersion'] = this.authVersionService.getVersion()
      .subscribe({
        next: (app: App): void => {
          this.backendVersion.auth = app.version;
        }
      });
  }

  private getLexicaVersion(): void {
    this.subscriptionHandler.data['getLexicaVersion'] = this.lexicaVersionService.getVersion()
      .subscribe({
        next: (app: App): void => {
          this.backendVersion.lexica = app.version;
        }
      });
  }

  private unsubscribeOpenWindowEvent(): void {
    if (this.openWindowSubscription === null) {
      return;
    }
    this.openWindowSubscription.unsubscribe();
  }

}
