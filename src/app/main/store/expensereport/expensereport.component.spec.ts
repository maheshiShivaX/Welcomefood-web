import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensereportComponent } from './expensereport.component';

describe('ExpensereportComponent', () => {
  let component: ExpensereportComponent;
  let fixture: ComponentFixture<ExpensereportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpensereportComponent]
    });
    fixture = TestBed.createComponent(ExpensereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
