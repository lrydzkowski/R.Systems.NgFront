import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalWindowOperationEnum } from '@shared/shared/models/modal-window-operation-enum';
import { ModalWindowHandlerService } from '@shared/shared/services/modal-window-handler.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'core-about-app',
  templateUrl: './about-app.component.html',
  styleUrls: ['./about-app.component.css']
})
export class AboutAppComponent implements OnInit, OnDestroy {

  visible = false;

  version: string = environment.version;

  build: string = environment.build;

  private openWindowSubscription: Subscription | null = null;

  constructor(private modalWindowHandler: ModalWindowHandlerService) { }

  ngOnInit(): void {
    this.subscribeOpenWindowEvent();
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

  private unsubscribeOpenWindowEvent(): void {
    if (this.openWindowSubscription === null) {
      return;
    }
    this.openWindowSubscription.unsubscribe();
  }

}
