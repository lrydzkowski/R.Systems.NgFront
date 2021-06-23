import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeftSidePanelService {

  isOpen: boolean = false;

  open: Subject<any> = new Subject();

  close: Subject<any> = new Subject();

  constructor() {
    this.open.subscribe(() => {
      this.isOpen = true;
    });
    this.close.subscribe(() => {
      this.isOpen = false;
    });
  }
}
