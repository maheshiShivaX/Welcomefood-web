import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreemployeeComponent } from './storeemployee.component';

describe('StoreemployeeComponent', () => {
  let component: StoreemployeeComponent;
  let fixture: ComponentFixture<StoreemployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreemployeeComponent]
    });
    fixture = TestBed.createComponent(StoreemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
