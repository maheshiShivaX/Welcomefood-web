import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogindetailComponent } from './logindetail.component';

describe('LogindetailComponent', () => {
  let component: LogindetailComponent;
  let fixture: ComponentFixture<LogindetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogindetailComponent]
    });
    fixture = TestBed.createComponent(LogindetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
