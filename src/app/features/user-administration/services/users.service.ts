import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userSelectionSubject = new BehaviorSubject<User[]>([]);

  constructor() { }

  selectUser(users: User[]): void {
    this.userSelectionSubject.next(users);
  }

  onUserSelection(): Observable<User[]> {
    return this.userSelectionSubject.asObservable();
  }
}
