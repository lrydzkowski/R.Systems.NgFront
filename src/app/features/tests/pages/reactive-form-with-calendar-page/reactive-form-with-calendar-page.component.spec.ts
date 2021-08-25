import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormWithCalendarPageComponent } from './reactive-form-with-calendar-page.component';

describe('ReactiveFormWithCalendarPageComponent', () => {
  let component: ReactiveFormWithCalendarPageComponent;
  let fixture: ComponentFixture<ReactiveFormWithCalendarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormWithCalendarPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormWithCalendarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
