import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-administration-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.css']
})
export class UsersListPageComponent implements OnInit {

  newUserFormLink: string = $localize`/administration/users/new`;

  constructor() { }

  ngOnInit(): void {
  }

}
