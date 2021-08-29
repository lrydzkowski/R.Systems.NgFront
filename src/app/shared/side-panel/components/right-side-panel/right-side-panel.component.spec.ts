import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from 'primeng/button';

import { RightSidePanelComponent } from './right-side-panel.component';

describe('RightSidePanelComponent', () => {
  let component: RightSidePanelComponent;
  let fixture: ComponentFixture<RightSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightSidePanelComponent ],
      imports: [ RouterTestingModule, ButtonModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
