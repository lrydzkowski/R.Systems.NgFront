import { Component, OnInit } from '@angular/core';
import { UserService } from '@features/user-auth/services/user.service';

@Component({
  selector: 'user-auth-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {

  isVisible = false;

  constructor(
    private userService: UserService) { }

  ngOnInit(): void {
    this.handleMsalEvents();
  }

  logout(): void {
    this.userService.logout();
  }

  private handleMsalEvents() {
    this.userService.getIsLoggedStatus().subscribe({
      next: (isLogged: boolean) => {
        this.isVisible = isLogged;
      }
    });
  }

}
