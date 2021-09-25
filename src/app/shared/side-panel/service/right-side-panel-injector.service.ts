import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TabInfo } from '../models/tab-info';

@Injectable({
  providedIn: 'root'
})
export class RightSidePanelInjectorService {

  private modifyingTabsSubject = new Subject<TabInfo[]>();

  constructor() { }

  setTabs(tabs: TabInfo[]): void {
    this.modifyingTabsSubject.next(tabs);
  }

  onSettingTabs(): Observable<TabInfo[]> {
    return this.modifyingTabsSubject.asObservable();
  }
}
