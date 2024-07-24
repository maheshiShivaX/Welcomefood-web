import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncometypeComponent } from './incometype.component';

describe('IncometypeComponent', () => {
  let component: IncometypeComponent;
  let fixture: ComponentFixture<IncometypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncometypeComponent]
    });
    fixture = TestBed.createComponent(IncometypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
