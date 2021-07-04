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
    { field: 'login', header: 'Login', className: 'login-col' },
    { field: 'email', header: 'Adres email', className: 'email-col' },
    { field: 'firstName', header: 'Imię', className: 'firstName-col' },
    { field: 'lastName', header: 'Nazwisko', className: 'lastName-col' }
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
