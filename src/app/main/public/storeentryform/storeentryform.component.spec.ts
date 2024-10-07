import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreentryformComponent } from './storeentryform.component';

describe('StoreentryformComponent', () => {
  let component: StoreentryformComponent;
  let fixture: ComponentFixture<StoreentryformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreentryformComponent]
    });
    fixture = TestBed.createComponent(StoreentryformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
