import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyinComponent } from './moneyin.component';

describe('MoneyinComponent', () => {
  let component: MoneyinComponent;
  let fixture: ComponentFixture<MoneyinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoneyinComponent]
    });
    fixture = TestBed.createComponent(MoneyinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
