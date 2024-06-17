import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesreportsComponent } from './expensesreports.component';

describe('ExpensesreportsComponent', () => {
  let component: ExpensesreportsComponent;
  let fixture: ComponentFixture<ExpensesreportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpensesreportsComponent]
    });
    fixture = TestBed.createComponent(ExpensesreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
