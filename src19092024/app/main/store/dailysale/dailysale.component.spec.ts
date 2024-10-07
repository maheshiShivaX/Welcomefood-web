import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailysaleComponent } from './dailysale.component';

describe('DailysaleComponent', () => {
  let component: DailysaleComponent;
  let fixture: ComponentFixture<DailysaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailysaleComponent]
    });
    fixture = TestBed.createComponent(DailysaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
