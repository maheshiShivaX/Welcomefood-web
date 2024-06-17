import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageemployeeComponent } from './manageemployee.component';

describe('ManageemployeeComponent', () => {
  let component: ManageemployeeComponent;
  let fixture: ComponentFixture<ManageemployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageemployeeComponent]
    });
    fixture = TestBed.createComponent(ManageemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
