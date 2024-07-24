import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GesinvoiceComponent } from './gesinvoice.component';

describe('GesinvoiceComponent', () => {
  let component: GesinvoiceComponent;
  let fixture: ComponentFixture<GesinvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GesinvoiceComponent]
    });
    fixture = TestBed.createComponent(GesinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
