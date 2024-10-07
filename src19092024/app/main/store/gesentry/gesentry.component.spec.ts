import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GesentryComponent } from './gesentry.component';

describe('GesentryComponent', () => {
  let component: GesentryComponent;
  let fixture: ComponentFixture<GesentryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GesentryComponent]
    });
    fixture = TestBed.createComponent(GesentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
