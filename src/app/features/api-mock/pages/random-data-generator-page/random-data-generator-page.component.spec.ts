import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';

import { RandomDataGeneratorPageComponent } from './random-data-generator-page.component';

describe('RandomDataGeneratorPageComponent', () => {
  let component: RandomDataGeneratorPageComponent;
  let fixture: ComponentFixture<RandomDataGeneratorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomDataGeneratorPageComponent ],
      imports: [ HttpClientModule, ButtonModule ]
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
