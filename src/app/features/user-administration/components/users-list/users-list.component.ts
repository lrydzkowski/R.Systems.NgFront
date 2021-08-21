import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@shared/loading/services/loading.service';
import { TableCol } from '@shared/table/models/table-col';
import { TableHeightCalculatorService } from '@shared/table/services/table-height-calculator.service';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { UserApiService } from '../../api/services/user-api.service';
import { User } from '../../models/user';

@Component({
  selector: 'user-administration-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [
    TableHeightCalculatorService
  ]
})
export class UsersListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('dt') table?: Table;

  @ViewChild('tableContainer') tableContainer?: ElementRef;

  loadingAnimationKey: string = 'users-list-loading-animation';

  users: User[] = [];

  selectedUsers: User[] = [];

  selectedUserForContextMenu: User | null = null;

  cols: TableCol[] = [
    { field: 'userId', header: 'Id', className: 'id-col', type: 'text', filterType: 'numeric' },
    { field: 'login', header: $localize`Login`, className: 'login-col', type: 'text', filterType: 'text' },
    { field: 'email', header: $localize`Email`, className: 'email-col', type: 'text', filterType: 'text' },
    { field: 'firstName', header: $localize`First name`, className: 'firstName-col', type: 'text', filterType: 'text' },
    { field: 'lastName', header: $localize`Last name`, className: 'lastName-col', type: 'text', filterType: 'text' },
    { field: 'roles', header: $localize`Roles`, className: 'roles-col', type: 'roles', filterType: 'text' }
  ];

  tableMenuItems: MenuItem[] = [];

  tableContextMenuItems: MenuItem[] = [];

  constructor(
    private userApi: UserApiService,
    private loadingAnimationService: LoadingService,
    public tableHeightCalculator: TableHeightCalculatorService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
    this.initTableMenuItems();
    this.initTableContextMenuItems();
  }

  private initTableMenuItems(): void {
    this.tableMenuItems = [
      {
        label: $localize`Add new user`,
        icon: 'pi pi-plus',
        command: () => {
          this.redirectToAddUserForm();
        }
      },
      {
        label: $localize`Delete user`,
        icon: 'pi pi-trash',
        command: () => {
          this.deleteUser(this.getSelectedUsersIds());
        }
      },
      {
        label: $localize`Clear table state`,
        icon: 'pi pi-filter-slash',
        command: () => {
          if (!this.table) {
            return;
          }
          this.clear(this.table);
        }
      }
    ];
  }

  getSelectedUsersIds(): number[] {
    if (this.selectedUsers.length === 0) {
      return [];
    }
    return this.selectedUsers.map(user => user.userId);
  }

  private initTableContextMenuItems(): void {
    this.tableContextMenuItems = [
      {
        label: $localize`Edit`,
        icon: 'pi pi-pencil',
        command: () => {
          if (this.selectedUserForContextMenu === null) {
            return;
          }
          this.redirectToEditUserForm(this.selectedUserForContextMenu.userId);
        }
      },
      {
        label: $localize`Delete`,
        icon: 'pi pi-trash',
        command: () => this.onDeleteButtonClick
      },
      {
        label: $localize`Show details`,
        icon: 'pi pi-eye',
        command: () => {
          if (this.selectedUserForContextMenu === null) {
            return;
          }
          this.showUserDetails(this.selectedUserForContextMenu.userId);
        }
      }
    ]
  }

  onDeleteButtonClick(): void {
    if (this.selectedUserForContextMenu === null) {
      return;
    }
    this.deleteUser([this.selectedUserForContextMenu.userId]);
  }

  ngOnDestroy(): void {
    this.tableHeightCalculator.destroy();
  }

  ngAfterViewInit(): void {
    if (!(this.tableContainer instanceof ElementRef)) {
      return;
    }
    this.tableHeightCalculator.init({
      containerRef: this.tableContainer,
      staticReservedHeight: {
        sm: 12,
        lg: 29
      }
    });
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

  redirectToAddUserForm(): void {
    this.router.navigate([$localize`/administration/users/new`]);
  }

  redirectToEditUserForm(userId: number): void {
    this.router.navigate([$localize`/administration/users/${userId}`]);
  }

  deleteUser(userIds: number[]): void {
    throw new Error('Method not implemented.');
  }

  private showUserDetails(userId: number): void {
    throw new Error('Method not implemented.');
  }

  clear(table: Table): void {
    table.clear();
  }

}
