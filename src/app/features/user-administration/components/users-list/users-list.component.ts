import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from '@shared/loading/services/loading.service';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { UserApiService } from '../../api/services/user-api.service';
import { User } from '../../models/user';

@Component({
  selector: 'user-administration-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @ViewChild('tableContainer') tableContainer?: ElementRef;

  loadingAnimationKey: string = 'users-list-loading-animation';

  users: User[] = [];

  cols = [
    { field: 'userId', header: 'Id', className: 'id-col', type: 'text' },
    { field: 'login', header: $localize`Login`, className: 'login-col', type: 'text' },
    { field: 'email', header: $localize`Email`, className: 'email-col', type: 'text' },
    { field: 'firstName', header: $localize`First name`, className: 'firstName-col', type: 'text' },
    { field: 'lastName', header: $localize`Last name`, className: 'lastName-col', type: 'text' },
    { field: 'roles', header: $localize`Roles`, className: 'roles-col', type: 'roles' }
  ];

  constructor(
    private userApi: UserApiService,
    private loadingAnimationService: LoadingService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.loadingAnimationService.showLoadingAnimation(this.loadingAnimationKey);
    this.userApi.getUsers()
      .pipe(finalize(() => this.loadingAnimationService.hideLoadingAnimation(this.loadingAnimationKey)))
      .subscribe({
        next: (users: User[]) => {
          this.users = users;
        }
      });
  }

  clear(table: Table): void {
    table.clear();
  }

}
