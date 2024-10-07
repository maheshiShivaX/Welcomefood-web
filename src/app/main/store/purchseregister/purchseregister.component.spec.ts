import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchseregisterComponent } from './purchseregister.component';

describe('PurchseregisterComponent', () => {
  let component: PurchseregisterComponent;
  let fixture: ComponentFixture<PurchseregisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchseregisterComponent]
    });
    fixture = TestBed.createComponent(PurchseregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
