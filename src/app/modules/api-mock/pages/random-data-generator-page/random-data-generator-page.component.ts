import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/user-administration/models/user';
import { RandomDataGeneratorService } from '../../services/random-data-generator.service';

@Component({
  selector: 'app-random-data-generator-page',
  templateUrl: './random-data-generator-page.component.html',
  styleUrls: ['./random-data-generator-page.component.css']
})
export class RandomDataGeneratorPageComponent implements OnInit {

  result: string = '';

  constructor(
    private randomDataGenerator: RandomDataGeneratorService
  ) { }

  ngOnInit(): void {
  }

  refreshResult(): void {
    this.result = '';
  }

  generateRandomUsersList(): void {
    this.randomDataGenerator.generateUsers(10000).subscribe({
      next: (users: User[]) => {
        this.result = JSON.stringify(users, null, 2);
      }
    });
  }

}
