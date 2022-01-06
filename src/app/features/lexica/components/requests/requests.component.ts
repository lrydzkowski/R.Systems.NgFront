import { Component, OnInit } from '@angular/core';
import { SetApiService } from '@features/lexica/api/services/set-api.service';
import { TranslationSet } from '@features/lexica/models/translation-set';

@Component({
  selector: 'lexica-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private setApi: SetApiService) { }

  ngOnInit(): void {
  }

  sendRequest(): void {
    this.setApi.getSet('test1.txt')
      .subscribe({
        next: (response: TranslationSet) => {
          const debug = true;
        },
        error: (error) => {
          const debug = true;
        }
      });
  }

}
