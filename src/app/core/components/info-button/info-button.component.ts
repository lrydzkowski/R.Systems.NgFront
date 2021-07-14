import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'core-info-button',
  templateUrl: './info-button.component.html',
  styleUrls: ['./info-button.component.css']
})
export class InfoButtonComponent implements OnInit {

  dialogIsShowed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showDialog(): void {
    this.dialogIsShowed = true;
  }

  getYearsRange(): string {
    const startYear = 2021;
    const currentYear: number = new Date().getFullYear();
    if (startYear === currentYear) {
      return startYear.toString();
    }
    return `${startYear} - ${currentYear}`;
  }

}
