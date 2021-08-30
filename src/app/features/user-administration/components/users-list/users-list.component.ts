import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@features/user-administration/services/users.service';
import { LoadingService } from '@shared/loading/services/loading.service';
import { CustomMenuItem } from '@shared/shared/models/custom-menu-item';
import { MaxHeightCalculatorMode } from '@shared/shared/models/max-height-calculator-mode';
import { MaxHeightCalculatorService } from '@shared/shared/services/max-height-calculator.service';
import { ToastMessageService } from '@shared/shared/services/toast-message.service';
import { TableCol } from '@shared/table/models/table-col';
import { TableHeightCalculatorService } from '@shared/table/services/table-height-calculator.service';
import { ConfirmationService, ConfirmEventType, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { UserApiService } from '../../api/services/user-api.service';
import { User } from '../../models/user';

@Component({
  selector: 'user-administration-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [
    MaxHeightCalculatorService,
    TableHeightCalculatorService,
    ConfirmationService
  ]
})
export class UsersListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('dt') table?: Table;

  @ViewChild('tableContainer') tableContainer?: ElementRef;

  loadingAnimationKey = 'users-list-loading-animation';

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
    public tableHeightCalculator: TableHeightCalculatorService,
    private toastMessageService: ToastMessageService,
    private confirmationService: ConfirmationService,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
    this.initTableMenuItems();
    this.initTableContextMenuItems();
  }

  ngOnDestroy(): void {
    this.maxHeightCalculator.destroy();
    this.tableHeightCalculator.destroy();
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
    this.tableHeightCalculator.init({
      containerRef: this.tableContainer,
      staticReservedHeight: {
        sm: 12,
        lg: 29
      }
    });
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

  onDeleteButtonClick(selectedUsers: User[]): void {
    this.toastMessageService.clearToastMessage();
    if (selectedUsers.length === 0) {
      this.toastMessageService.showToastMessage({
        severity: 'error',
        summary: $localize`Error`,
        detail: $localize`You have to select at least one user.`,
        life: 5000
      });
      return;
    }
    this.confirmationService.confirm({
      message: $localize`Are you sure that you want to delete selected users?`,
      header: $localize`Delete confirmation`,
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteUser(this.selectedUsers.map(selectedUser => selectedUser.userId));
      },
      reject: (type: ConfirmEventType) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.toastMessageService.showToastMessage(
              { severity: 'warn', summary: $localize`Rejected`, detail: $localize`You have rejected.` }
            );
          break;
          case ConfirmEventType.CANCEL:
            this.toastMessageService.showToastMessage(
              { severity: 'warn', summary: $localize`Cancelled`, detail: $localize`You have cancelled.` }
            );
          break;
        }
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
    console.log(userIds);
    this.toastMessageService.showToastMessage({
      severity: 'success',
      summary: $localize`Success`,
      detail: $localize`The operation has been successful.`,
      life: 5000
    });
  }

  clearTableState(table: Table): void {
    this.clear(table);
    this.selectedUsers = [];
  }

  clear(table: Table): void {
    table.clear();
  }

  identifyUser(index: number, user: User): number {
    return user.userId;
  }

  handlePageEvent(): void {
    this.clearSelection();
  }

  handleSortEvent(): void {
    this.clearSelection();
  }

  handleFilterEvent(): void {
    this.clearSelection();
  }

  handleRowSelect(event: { originalEvent: PointerEvent; data: User[]; index: number }): void {
    this.usersService.selectUser(this.selectedUsers);
  }

  handleRowUnselect(event: { originalEvent: PointerEvent; data: User[] }): void {
    this.usersService.selectUser(this.selectedUsers);
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
          this.onDeleteButtonClick(this.selectedUsers);
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
          this.clearTableState(this.table);
        },
        data: {
          tooltip: $localize`Clear table state`,
          className: 'p-button-outlined'
        }
      }
    ];
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
        command: () => {
          if (this.selectedUserForContextMenu === null) {
            return;
          }
          this.onDeleteButtonClick([this.selectedUserForContextMenu]);
        }
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
    ];
  }

  private showUserDetails(userId: number): void {
    throw new Error('Method not implemented.');
  }

  private clearSelection(): void {
    this.selectedUsers = [];
  }

}
