import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  items: MenuItem[] = [
    { label: $localize`Users` },
    { label: $localize`New user` }
  ]

  home = {icon: 'pi pi-home', routerLink: '/'};

  constructor() { }

  ngOnInit(): void {
  }

}
