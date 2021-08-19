import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeFormPageComponent } from './password-change-form-page.component';

describe('PasswordChangeFormPageComponent', () => {
  let component: PasswordChangeFormPageComponent;
  let fixture: ComponentFixture<PasswordChangeFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordChangeFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangeFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
