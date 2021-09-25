import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'loading-animation',
  templateUrl: './loading-animation.component.html',
  styleUrls: ['./loading-animation.component.css']
})
export class LoadingAnimationComponent implements OnInit {

  @Input() loadingAnimationKey = 'global';

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
  }

  isVisible(): boolean {
    return this.loadingService.isVisible(this.loadingAnimationKey);
  }

}
