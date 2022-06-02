import { Component, OnInit } from '@angular/core';
import { UserService } from '@features/user-auth/services/user.service';
import { ModalWindowHandlerService } from '@shared/shared/services/modal-window-handler.service';

@Component({
  selector: 'user-auth-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.css']
})
export class ProfileButtonComponent implements OnInit {

  isVisible = false;

  constructor(
    private modalWindowHandler: ModalWindowHandlerService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.handleMsalEvents();
  }

  showUserProfileWindow(): void {
    this.modalWindowHandler.openWindow('user-profile');
  }

  private handleMsalEvents() {
    this.userService.getIsLoggedStatus().subscribe({
      next: (isLogged: boolean) => {
        this.isVisible = isLogged;
      }
    });
  }

}
