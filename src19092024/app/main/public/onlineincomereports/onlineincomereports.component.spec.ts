import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineincomereportsComponent } from './onlineincomereports.component';

describe('OnlineincomereportsComponent', () => {
  let component: OnlineincomereportsComponent;
  let fixture: ComponentFixture<OnlineincomereportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineincomereportsComponent]
    });
    fixture = TestBed.createComponent(OnlineincomereportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
