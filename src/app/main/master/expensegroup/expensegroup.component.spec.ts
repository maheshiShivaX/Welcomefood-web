import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensegroupComponent } from './expensegroup.component';

describe('ExpensegroupComponent', () => {
  let component: ExpensegroupComponent;
  let fixture: ComponentFixture<ExpensegroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpensegroupComponent]
    });
    fixture = TestBed.createComponent(ExpensegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
