import { TestBed } from '@angular/core/testing';

import { LeftSidePanelService } from './left-side-panel.service';

describe('LeftSidePanelService', () => {
  let service: LeftSidePanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeftSidePanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
