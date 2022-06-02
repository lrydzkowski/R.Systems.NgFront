import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileType } from '@features/user-auth/models/profile-type';
import { UserService } from '@features/user-auth/services/user.service';
import { ModalWindowOperationEnum } from '@shared/shared/models/modal-window-operation-enum';
import { ModalWindowHandlerService } from '@shared/shared/services/modal-window-handler.service';
import { SubscriptionHandlerService } from '@shared/shared/services/subscription-handler.service';

@Component({
  selector: 'user-auth-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    SubscriptionHandlerService
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {

  visible = false;

  loadingAnimationKey = 'userProfile';

  profile: ProfileType | null = null;

  constructor(
    private modalWindowHandler: ModalWindowHandlerService,
    private subscriptionHandler: SubscriptionHandlerService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.subscribeOpenWindowEvent();
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribeAll();
  }

  private subscribeOpenWindowEvent(): void {
    this.modalWindowHandler.onOpenWindow('user-profile').subscribe({
      next: (modalWindowOperation: ModalWindowOperationEnum) => {
        if (modalWindowOperation !== ModalWindowOperationEnum.Open) {
          return;
        }
        this.visible = true;
        this.getProfile();
      }
    });
  }

  private getProfile(): void {
    const activeAccount = this.userService.getActiveAccount();
    if (activeAccount === null) {
      return;
    }
    this.profile = {
      username: activeAccount.username,
      name: activeAccount.name
    };
  }

}
