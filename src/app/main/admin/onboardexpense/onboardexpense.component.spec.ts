import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardexpenseComponent } from './onboardexpense.component';

describe('OnboardexpenseComponent', () => {
  let component: OnboardexpenseComponent;
  let fixture: ComponentFixture<OnboardexpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnboardexpenseComponent]
    });
    fixture = TestBed.createComponent(OnboardexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
