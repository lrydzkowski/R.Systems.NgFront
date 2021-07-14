import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { UserApiService } from '../../api/services/user-api.service';
import { User } from '../../models/user';

@Component({
  selector: 'user-administration-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  cols = [
    { field: 'login', header: $localize`Login`, className: 'login-col', type: 'text' },
    { field: 'email', header: $localize`Email`, className: 'email-col', type: 'text' },
    { field: 'firstName', header: $localize`First name`, className: 'firstName-col', type: 'text' },
    { field: 'lastName', header: $localize`Last name`, className: 'lastName-col', type: 'text' }
  ];

  constructor(private userApi: UserApiService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userApi.getUsers().subscribe({
      next: (users: User[]) => {
        console.log(users);
        this.users = users;
      }
    });
  }

  clear(table: Table): void {
    table.clear();
  }

}
