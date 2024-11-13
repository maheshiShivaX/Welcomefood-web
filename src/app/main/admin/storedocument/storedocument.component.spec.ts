import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredocumentComponent } from './storedocument.component';

describe('StoredocumentComponent', () => {
  let component: StoredocumentComponent;
  let fixture: ComponentFixture<StoredocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoredocumentComponent]
    });
    fixture = TestBed.createComponent(StoredocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
