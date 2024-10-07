import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcategoryformComponent } from './productcategoryform.component';

describe('ProductcategoryformComponent', () => {
  let component: ProductcategoryformComponent;
  let fixture: ComponentFixture<ProductcategoryformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductcategoryformComponent]
    });
    fixture = TestBed.createComponent(ProductcategoryformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
