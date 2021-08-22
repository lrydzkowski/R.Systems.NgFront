import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSidePanelButtonComponent } from './right-side-panel-button.component';

describe('RightSidePanelButtonComponent', () => {
  let component: RightSidePanelButtonComponent;
  let fixture: ComponentFixture<RightSidePanelButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightSidePanelButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSidePanelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
