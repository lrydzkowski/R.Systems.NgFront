import { Component, OnInit } from '@angular/core';
import { UserDetailsComponent } from '@features/user-administration/components/user-details/user-details.component';
import { RightSidePanelInjectorService } from '@shared/side-panel/service/right-side-panel-injector.service';

@Component({
  selector: 'user-administration-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.css']
})
export class UsersListPageComponent implements OnInit {

  constructor(private rightSidePanelInjector: RightSidePanelInjectorService) { }

  ngOnInit(): void {
    this.rightSidePanelInjector.setTabs([
      {
        header: $localize`Szczegóły`,
        component: UserDetailsComponent
      }
    ]);
  }

}
