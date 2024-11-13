import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasreportComponent } from './gasreport.component';

describe('GasreportComponent', () => {
  let component: GasreportComponent;
  let fixture: ComponentFixture<GasreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GasreportComponent]
    });
    fixture = TestBed.createComponent(GasreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
