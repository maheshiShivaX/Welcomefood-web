import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxcollectionComponent } from './taxcollection.component';

describe('TaxcollectionComponent', () => {
  let component: TaxcollectionComponent;
  let fixture: ComponentFixture<TaxcollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxcollectionComponent]
    });
    fixture = TestBed.createComponent(TaxcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
