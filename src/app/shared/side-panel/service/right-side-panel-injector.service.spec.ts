import { TestBed } from '@angular/core/testing';

import { RightSidePanelInjectorService } from './right-side-panel-injector.service';

describe('RightSidePanelInjectorService', () => {
  let service: RightSidePanelInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RightSidePanelInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
