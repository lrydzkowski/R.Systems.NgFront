import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RightSidePanelStateService } from './right-side-panel-state.service';

describe('RightSidePanelService', () => {
  let service: RightSidePanelStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ]
    });
    service = TestBed.inject(RightSidePanelStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
