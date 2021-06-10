import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidePanelComponent } from './left-side-panel.component';

describe('LeftSidePanelComponent', () => {
  let component: LeftSidePanelComponent;
  let fixture: ComponentFixture<LeftSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftSidePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
