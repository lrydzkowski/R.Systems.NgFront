import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../api/services/user-api.service';
import { User } from '../../models/user';

@Component({
  selector: 'user-administration-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private userApi: UserApiService) { }

  ngOnInit(): void {
  }

  getUsers(): void {
    this.userApi.getUsers().subscribe({
      next: (users: User[]) => {
        console.log(users);
      }
    });
  }

}
