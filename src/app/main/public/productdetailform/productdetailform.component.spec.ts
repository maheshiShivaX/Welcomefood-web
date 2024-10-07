import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdetailformComponent } from './productdetailform.component';

describe('ProductdetailformComponent', () => {
  let component: ProductdetailformComponent;
  let fixture: ComponentFixture<ProductdetailformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductdetailformComponent]
    });
    fixture = TestBed.createComponent(ProductdetailformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
