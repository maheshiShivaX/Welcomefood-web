import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardstoreComponent } from './onboardstore.component';

describe('OnboardstoreComponent', () => {
  let component: OnboardstoreComponent;
  let fixture: ComponentFixture<OnboardstoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnboardstoreComponent]
    });
    fixture = TestBed.createComponent(OnboardstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
