import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagelogindetailsComponent } from './managelogindetails.component';

describe('ManagelogindetailsComponent', () => {
  let component: ManagelogindetailsComponent;
  let fixture: ComponentFixture<ManagelogindetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagelogindetailsComponent]
    });
    fixture = TestBed.createComponent(ManagelogindetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
