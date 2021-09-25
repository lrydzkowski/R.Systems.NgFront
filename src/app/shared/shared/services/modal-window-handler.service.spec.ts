import { TestBed } from '@angular/core/testing';

import { ModalWindowHandlerService } from './modal-window-handler.service';

describe('ModalWindowHandlerService', () => {
  let service: ModalWindowHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalWindowHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
