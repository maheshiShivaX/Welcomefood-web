import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailysalesheetComponent } from './dailysalesheet.component';

describe('DailysalesheetComponent', () => {
  let component: DailysalesheetComponent;
  let fixture: ComponentFixture<DailysalesheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailysalesheetComponent]
    });
    fixture = TestBed.createComponent(DailysalesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
