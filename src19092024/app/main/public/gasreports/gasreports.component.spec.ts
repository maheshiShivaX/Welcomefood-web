import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasreportsComponent } from './gasreports.component';

describe('GasreportsComponent', () => {
  let component: GasreportsComponent;
  let fixture: ComponentFixture<GasreportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GasreportsComponent]
    });
    fixture = TestBed.createComponent(GasreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
