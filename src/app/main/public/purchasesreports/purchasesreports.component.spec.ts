import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesreportsComponent } from './purchasesreports.component';

describe('PurchasesreportsComponent', () => {
  let component: PurchasesreportsComponent;
  let fixture: ComponentFixture<PurchasesreportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasesreportsComponent]
    });
    fixture = TestBed.createComponent(PurchasesreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
