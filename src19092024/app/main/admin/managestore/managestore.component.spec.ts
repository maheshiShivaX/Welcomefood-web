import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagestoreComponent } from './managestore.component';

describe('ManagestoreComponent', () => {
  let component: ManagestoreComponent;
  let fixture: ComponentFixture<ManagestoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagestoreComponent]
    });
    fixture = TestBed.createComponent(ManagestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
