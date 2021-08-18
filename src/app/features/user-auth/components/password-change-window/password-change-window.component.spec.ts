import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeWindowComponent } from './password-change-window.component';

describe('PasswordChangeWindowComponent', () => {
  let component: PasswordChangeWindowComponent;
  let fixture: ComponentFixture<PasswordChangeWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordChangeWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangeWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
