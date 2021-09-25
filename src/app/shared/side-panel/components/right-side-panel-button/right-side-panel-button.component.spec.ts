import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from 'primeng/button';

import { RightSidePanelButtonComponent } from './right-side-panel-button.component';

describe('RightSidePanelButtonComponent', () => {
  let component: RightSidePanelButtonComponent;
  let fixture: ComponentFixture<RightSidePanelButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightSidePanelButtonComponent ],
      imports: [ RouterTestingModule, ButtonModule ]
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
