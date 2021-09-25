import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'core-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  userMenuItems: MenuItem[] = [];

  private urlPasswordChangeForm: string = $localize`user-account/password-change`;

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
