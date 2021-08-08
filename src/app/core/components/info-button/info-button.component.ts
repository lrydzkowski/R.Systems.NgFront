import { Component, OnInit } from '@angular/core';
import { ModalWindowHandlerService } from '@shared/shared/services/modal-window-handler.service';

@Component({
  selector: 'core-info-button',
  templateUrl: './info-button.component.html',
  styleUrls: ['./info-button.component.css']
})
export class InfoButtonComponent implements OnInit {

  constructor(private modalWindowHandler: ModalWindowHandlerService) { }

  ngOnInit(): void {
  }

  showDialog(): void {
    this.modalWindowHandler.openWindow('about-app');
  }

}
