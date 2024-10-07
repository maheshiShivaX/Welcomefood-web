import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailysalesexpensesComponent } from './dailysalesexpenses.component';

describe('DailysalesexpensesComponent', () => {
  let component: DailysalesexpensesComponent;
  let fixture: ComponentFixture<DailysalesexpensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailysalesexpensesComponent]
    });
    fixture = TestBed.createComponent(DailysalesexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
