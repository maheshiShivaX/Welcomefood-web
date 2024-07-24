import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlsheetComponent } from './plsheet.component';

describe('PlsheetComponent', () => {
  let component: PlsheetComponent;
  let fixture: ComponentFixture<PlsheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlsheetComponent]
    });
    fixture = TestBed.createComponent(PlsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
