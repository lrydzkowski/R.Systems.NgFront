import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeftSidePanelService {

  open: Subject<any> = new Subject();

  close: Subject<any> = new Subject();

  constructor() { }
}
