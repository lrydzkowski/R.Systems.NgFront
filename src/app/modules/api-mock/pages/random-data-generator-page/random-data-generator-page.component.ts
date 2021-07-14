import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-random-data-generator-page',
  templateUrl: './random-data-generator-page.component.html',
  styleUrls: ['./random-data-generator-page.component.css']
})
export class RandomDataGeneratorPageComponent implements OnInit {

  result: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  refreshResult(): void {
    this.result = '';
  }

  generateRandomUsersList(): void {

  }

}
