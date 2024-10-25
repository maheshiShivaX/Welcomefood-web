import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashreconcilComponent } from './cashreconcil.component';

describe('CashreconcilComponent', () => {
  let component: CashreconcilComponent;
  let fixture: ComponentFixture<CashreconcilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashreconcilComponent]
    });
    fixture = TestBed.createComponent(CashreconcilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
