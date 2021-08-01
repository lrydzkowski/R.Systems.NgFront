import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidePanelButtonComponent } from './left-side-panel-button.component';

describe('ButtonComponent', () => {
  let component: LeftSidePanelButtonComponent;
  let fixture: ComponentFixture<LeftSidePanelButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftSidePanelButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidePanelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
