import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorereportsComponent } from './storereports.component';

describe('StorereportsComponent', () => {
  let component: StorereportsComponent;
  let fixture: ComponentFixture<StorereportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorereportsComponent]
    });
    fixture = TestBed.createComponent(StorereportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
