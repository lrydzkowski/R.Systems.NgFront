import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'user-auth-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  private urlPasswordChangeForm: string = $localize`user-account/password-change`;

  userMenuItems: MenuItem[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initUserMenuItems();
  }

  initUserMenuItems(): void {
    this.userMenuItems = [
      {
        label: $localize`Password change`,
        icon: '',
        command: () => {
          this.router.navigate([this.urlPasswordChangeForm]);
        }
      }
    ];
  }

}
