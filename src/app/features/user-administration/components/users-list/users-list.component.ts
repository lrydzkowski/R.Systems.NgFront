import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@shared/loading/services/loading.service';
import { CustomMenuItem } from '@shared/shared/models/custom-menu-item';
import { MaxHeightCalculatorMode } from '@shared/shared/models/max-height-calculator-mode';
import { MaxHeightCalculatorService } from '@shared/shared/services/max-height-calculator.service';
import { ToastMessageService } from '@shared/shared/services/toast-message.service';
import { TableCol } from '@shared/table/models/table-col';
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
    MaxHeightCalculatorService
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
    { field: 'userId', header: 'Id', className: 'standard-col flex-grow-0 id-col', type: 'text',
      filterType: 'numeric' },
    { field: 'login', header: $localize`Login`, className: 'standard-col flex-grow-1 login-col', type: 'text',
      filterType: 'text' },
    { field: 'email', header: $localize`Email`, className: 'standard-col flex-grow-1 email-col', type: 'text',
      filterType: 'text' },
    { field: 'firstName', header: $localize`First name`, className: 'standard-col flex-grow-1 firstName-col',
      type: 'text', filterType: 'text' },
    { field: 'lastName', header: $localize`Last name`, className: 'standard-col flex-grow-1 lastName-col',
      type: 'text', filterType: 'text' },
    { field: 'roles', header: $localize`Roles`, className: 'standard-col roles-col', type: 'roles',
      filterType: 'text' }
  ];

  tableMenuItems: CustomMenuItem[] = [];

  tableContextMenuItems: MenuItem[] = [];

  constructor(
    private userApi: UserApiService,
    private loadingAnimationService: LoadingService,
    private router: Router,
    private maxHeightCalculator: MaxHeightCalculatorService,
    private toastMessageService: ToastMessageService) { }

  ngOnInit(): void {
    this.getUsers();
    this.initTableMenuItems();
    this.initTableContextMenuItems();
  }

  ngOnDestroy(): void {
    this.maxHeightCalculator.destroy();
  }

  ngAfterViewInit(): void {
    if (!(this.tableContainer instanceof ElementRef)) {
      return;
    }
    this.maxHeightCalculator.init({
      elementRef: this.tableContainer,
      staticReservedHeight: {
        sm: 12,
        lg: 29
      },
      mode: MaxHeightCalculatorMode.Height
    });
  }

  private initTableMenuItems(): void {
    this.tableMenuItems = [
      {
        label: $localize`Add user`,
        icon: 'pi pi-plus',
        command: () => {
          this.redirectToAddUserForm();
        },
        data: {
          tooltip: $localize`Add new user`,
          className: 'p-button-outlined p-button-success mr-2'
        }
      },
      {
        label: $localize`Edit user`,
        icon: 'pi pi-pencil',
        command: () => {
          this.onEditButtonClick();
        },
        data: {
          tooltip: $localize`Edit existing user`,
          className: 'p-button-outlined mr-2'
        }
      },
      {
        label: $localize`Delete user`,
        icon: 'pi pi-trash',
        command: () => {
          this.deleteUser(this.getSelectedUsersIds());
        },
        data: {
          tooltip: $localize`Delete existing user`,
          className: 'p-button-outlined p-button-danger mr-2'
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
        },
        data: {
          tooltip: $localize`Clear table state`,
          className: 'p-button-outlined'
        }
      }
    ];
  }

  getButtonLabel(menuItem: CustomMenuItem): string {
    if (!menuItem.label) {
      return '';
    }
    return menuItem.label;
  }

  getButtonIcon(menuItem: CustomMenuItem): string {
    if (!menuItem.icon) {
      return '';
    }
    return menuItem.icon;
  }

  handleMenuButtonClick(menuItem: CustomMenuItem): void {
    if (!menuItem.command) {
      return;
    }
    menuItem.command();
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

  onEditButtonClick(): void {
    this.toastMessageService.clearToastMessage();
    if (this.selectedUsers?.length !== 1) {
      this.toastMessageService.showToastMessage({
        severity: 'error',
        summary: $localize`Error`,
        detail: $localize`You have to select exactly one user.`,
        life: 5000
      });
      return;
    }
    this.redirectToEditUserForm(this.selectedUsers[0].userId);
  }

  onDeleteButtonClick(): void {
    if (this.selectedUserForContextMenu === null) {
      return;
    }
    this.deleteUser([this.selectedUserForContextMenu.userId]);
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

  identifyUser(index: number, user: User): number {
    return user.userId;
  }

  handlePageEvent(event: { first: number; rows: number; }): void {
    this.clearSelection();
  }

  private clearSelection(): void {
    this.selectedUsers = [];
  }

}
