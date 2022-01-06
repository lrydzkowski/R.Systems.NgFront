import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from '@features/user-administration/models/user';
import { UsersService } from '@features/user-administration/services/users.service';
import { MaxHeightCalculatorMode } from '@shared/shared/models/max-height-calculator-mode';
import { MaxHeightCalculatorService } from '@shared/shared/services/max-height-calculator.service';
import { SubscriptionHandlerService } from '@shared/shared/services/subscription-handler.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [
    SubscriptionHandlerService,
    MaxHeightCalculatorService
  ]
})
export class UserDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('container') container: ElementRef | null = null;

  users: User[] = [];

  titleProperty: keyof User = 'login';

  properties: (keyof User)[] = ['userId', 'email', 'firstName', 'lastName'];

  labels: { [key: string]: string } = {
    login: $localize`Login`,
    userId: $localize`User id`,
    email: $localize`Email`,
    firstName: $localize`First name`,
    lastName: $localize`Last name`
  };

  constructor(
    private subscriptionHandler: SubscriptionHandlerService,
    private usersService: UsersService,
    private maxHeightCalculator: MaxHeightCalculatorService
  ) { }

  ngOnInit(): void {
    this.handleUserSelection();
    this.initMaxHeightCalculator();
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribeAll();
    this.maxHeightCalculator.destroy();
  }

  ngAfterViewInit(): void {
    this.initMaxHeightCalculator();
  }

  private handleUserSelection(): void {
    this.subscriptionHandler.data['userSelection'] = this.usersService.onUserSelection()
      .subscribe({
        next: (users: User[]) => {
          this.users = users;
        }
      });
  }

  private initMaxHeightCalculator(): void {
    if (!(this.container instanceof ElementRef)) {
      return;
    }
    this.maxHeightCalculator.init({
      elementRef: this.container,
      staticReservedHeight: {
        sm: 14,
        md: 14,
        lg: 14
      },
      mode: MaxHeightCalculatorMode.MaxHeight
    });
  }
}
