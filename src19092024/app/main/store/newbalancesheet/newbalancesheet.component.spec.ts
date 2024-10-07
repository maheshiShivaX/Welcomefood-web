import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbalancesheetComponent } from './newbalancesheet.component';

describe('NewbalancesheetComponent', () => {
  let component: NewbalancesheetComponent;
  let fixture: ComponentFixture<NewbalancesheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewbalancesheetComponent]
    });
    fixture = TestBed.createComponent(NewbalancesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
