import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignstoreComponent } from './assignstore.component';

describe('AssignstoreComponent', () => {
  let component: AssignstoreComponent;
  let fixture: ComponentFixture<AssignstoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignstoreComponent]
    });
    fixture = TestBed.createComponent(AssignstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
