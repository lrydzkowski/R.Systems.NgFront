import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomDataGeneratorPageComponent } from './random-data-generator-page.component';

describe('RandomDataGeneratorPageComponent', () => {
  let component: RandomDataGeneratorPageComponent;
  let fixture: ComponentFixture<RandomDataGeneratorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomDataGeneratorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomDataGeneratorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
