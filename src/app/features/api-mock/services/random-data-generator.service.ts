import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '@features/user-administration/models/role';
import { User } from '@features/user-administration/models/user';
import { MockDataApiService } from '../api/services/mock-data-api.service';

@Injectable({
  providedIn: 'root'
})
export class RandomDataGeneratorService {

  private availableUserRoles: Role[] = [
    {
      roleId: 1,
      name: 'user'
    },
    {
      roleId: 2,
      name: 'admin'
    }
  ];

  constructor(
    private mockDataApiService: MockDataApiService) { }

  generateUsers(numOfUsers: number): Observable<User[]> {
    const observables = {
      words: this.mockDataApiService.getStaticData('words'),
      firstNames: this.mockDataApiService.getStaticData('firstNames'),
      lastNames: this.mockDataApiService.getStaticData('lastNames')
    };
    const usersListObservable: Observable<User[]> = forkJoin(observables).pipe(
      map((data: { [key: string]: string[] }) => {
        const words: string[] = data['words'];
        const firstNames: string[] = data['firstNames'];
        const lastNames: string[] = data['lastNames'];
        const users: User[] = [];
        for (let i = 1; i <= numOfUsers; i++) {
          users.push(this.generateUser(words, firstNames, lastNames, i, numOfUsers));
        }
        return users;
      })
    );
    return usersListObservable;
  }

  generateUser(words: string[], firstNames: string[], lastNames: string[], userId: number, numOfUsers: number): User {
    const wasEdited: boolean = this.tossCoin();
    const user: User = {
      userId,
      login: this.getRandomLogin(words),
      email: words[this.getRandomInteger(0, words.length)] + '@lukaszrydzkowski.pl',
      firstName: firstNames[this.getRandomInteger(0, firstNames.length)],
      lastName: lastNames[this.getRandomInteger(0, lastNames.length)],
      roles: [
        this.availableUserRoles[this.getRandomInteger(0, this.availableUserRoles.length)]
      ],
      createdDateTime: this.getRandomDate(new Date(2010, 0, 1), new Date()),
      creatorId: this.getRandomInteger(1, numOfUsers + 1),
      creatorLogin: this.getRandomLogin(words),
      lastEditedDateTime: wasEdited ? this.getRandomDate(new Date(2010, 0, 1), new Date()) : null,
      lastEditorId: wasEdited ? this.getRandomInteger(1, numOfUsers + 1) : null,
      lastEditorLogin: wasEdited ? this.getRandomLogin(words) : null
    };
    return user;
  }

  private getRandomInteger(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  private getRandomLogin(words: string[]): string {
    return words[this.getRandomInteger(0, words.length)];
  }

  private getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  private tossCoin(): boolean {
    return this.getRandomInteger(0, 2) === 1 ? true : false;
  }
}
