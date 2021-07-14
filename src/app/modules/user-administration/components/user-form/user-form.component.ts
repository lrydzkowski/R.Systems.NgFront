import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-administration-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  usersLink: string = $localize`/administration/users`;

  constructor() { }

  ngOnInit(): void {
  }

}
