import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsreportsComponent } from './paymentsreports.component';

describe('PaymentsreportsComponent', () => {
  let component: PaymentsreportsComponent;
  let fixture: ComponentFixture<PaymentsreportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsreportsComponent]
    });
    fixture = TestBed.createComponent(PaymentsreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
