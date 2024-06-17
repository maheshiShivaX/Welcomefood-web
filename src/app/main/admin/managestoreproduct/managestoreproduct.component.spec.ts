import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagestoreproductComponent } from './managestoreproduct.component';

describe('ManagestoreproductComponent', () => {
  let component: ManagestoreproductComponent;
  let fixture: ComponentFixture<ManagestoreproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagestoreproductComponent]
    });
    fixture = TestBed.createComponent(ManagestoreproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
