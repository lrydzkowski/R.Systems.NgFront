import { Component, OnInit } from '@angular/core';
import { UserService } from '@features/user-auth/services/user.service';

@Component({
  selector: 'user-auth-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private userService: UserService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login();
  }

}
