import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseheadComponent } from './expensehead.component';

describe('ExpenseheadComponent', () => {
  let component: ExpenseheadComponent;
  let fixture: ComponentFixture<ExpenseheadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseheadComponent]
    });
    fixture = TestBed.createComponent(ExpenseheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
