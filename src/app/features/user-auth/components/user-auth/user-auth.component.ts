import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { UserService } from '@features/user-auth/services/user.service';
import { SubscriptionHandlerService } from '@shared/shared/services/subscription-handler.service';
import { filter } from 'rxjs';

@Component({
  selector: 'user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
  providers: [SubscriptionHandlerService]
})
export class UserAuthComponent implements OnInit, OnDestroy {

  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private userService: UserService,
    private subscriptionHandler: SubscriptionHandlerService
  ) { }

  ngOnInit(): void {
    this.msalService.instance.enableAccountStorageEvents();
    this.handleMsalSubjectEvents();
    this.handleInProgressEvents();
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribeAll();
  }

  private handleMsalSubjectEvents(): void {
    this.subscriptionHandler.data['msalSubject'] = this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED
          || msg.eventType === EventType.ACCOUNT_REMOVED),
      )
      .subscribe((result: EventMessage) => {
        this.userService.setIsLoggedStatus(this.isLogged());
      });
  }

  private handleInProgressEvents(): void {
    this.subscriptionHandler.data['inProgress'] = this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.userService.setIsLoggedStatus(this.isLogged());
        this.checkAndSetActiveAccount();
      });
  }

  private checkAndSetActiveAccount(): void {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    const activeAccount = this.msalService.instance.getActiveAccount();

    if (!activeAccount && this.isLogged()) {
      const accounts = this.msalService.instance.getAllAccounts();
      this.msalService.instance.setActiveAccount(accounts[0]);
    }
  }

  private isLogged(): boolean {
    return this.msalService.instance.getAllAccounts().length > 0;
  }

}
