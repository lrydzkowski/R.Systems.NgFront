import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from '@shared/loading/services/loading.service';
import { MaxHeightCalculatorService } from '@shared/shared/services/max-height-calculator.service';
import { MaxHeightCalculatorMode } from '@shared/shared/models/max-height-calculator-mode';
import { User } from '@features/user-administration/models/user';
import { RandomDataGeneratorService } from '../../services/random-data-generator.service';

@Component({
  selector: 'app-random-data-generator-page',
  templateUrl: './random-data-generator-page.component.html',
  styleUrls: ['./random-data-generator-page.component.css'],
  providers: [
    MaxHeightCalculatorService
  ]
})
export class RandomDataGeneratorPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('jsonContainer') jsonContainer?: ElementRef;

  json: string = '';

  loadingAnimationKey: string = 'randomDataGenerator';

  constructor(
    private randomDataGenerator: RandomDataGeneratorService,
    private loadingService: LoadingService,
    private clipboardService: ClipboardService,
    private maxHeightCalculator: MaxHeightCalculatorService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.maxHeightCalculator.destroy();
  }

  ngAfterViewInit(): void {
    if (this.jsonContainer instanceof ElementRef) {
      this.maxHeightCalculator.init({
        elementRef: this.jsonContainer,
        staticReservedHeight: {
          sm: 19,
          lg: 29
        },
        mode: MaxHeightCalculatorMode.Height
      });
    }
  }

  refreshResult(): void {
    this.json = '';
  }

  generateRandomUsersList(): void {
    this.loadingService.showLoadingAnimation(this.loadingAnimationKey);
    this.randomDataGenerator.generateUsers(500)
      .pipe(
        finalize(() => this.loadingService.hideLoadingAnimation(this.loadingAnimationKey))
      )
      .subscribe({
        next: (users: User[]) => {
          this.json = JSON.stringify(users, null, 2);
        }
      });
  }

  dataExists(): boolean {
    return this.json.length > 0;
  }

  copyJsonToClipboard(): void {
    this.clipboardService.copy(this.json);
  }

}
