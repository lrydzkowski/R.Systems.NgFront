import { Component, OnInit } from '@angular/core';
import { UserService } from '@features/user-auth/services/user.service';

@Component({
  selector: 'user-auth-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void { }

  logout(): void {
    this.userService.logout();
  }

}
