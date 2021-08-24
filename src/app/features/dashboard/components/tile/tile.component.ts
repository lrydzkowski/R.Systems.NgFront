import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() linkUrl = '';

  @Input() header = '';

  @Input() description = '';

  constructor() { }

  ngOnInit(): void {
  }

}
