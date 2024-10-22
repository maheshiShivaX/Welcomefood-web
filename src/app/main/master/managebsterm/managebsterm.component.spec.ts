import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagebstermComponent } from './managebsterm.component';

describe('ManagebstermComponent', () => {
  let component: ManagebstermComponent;
  let fixture: ComponentFixture<ManagebstermComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagebstermComponent]
    });
    fixture = TestBed.createComponent(ManagebstermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
