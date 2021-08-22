import { TestBed } from '@angular/core/testing';

import { RightSidePanelStateService } from './right-side-panel-state.service';

describe('RightSidePanelStateService', () => {
  let service: RightSidePanelStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RightSidePanelStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
