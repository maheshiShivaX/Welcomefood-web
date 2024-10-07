import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresummaryComponent } from './storesummary.component';

describe('StoresummaryComponent', () => {
  let component: StoresummaryComponent;
  let fixture: ComponentFixture<StoresummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoresummaryComponent]
    });
    fixture = TestBed.createComponent(StoresummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
