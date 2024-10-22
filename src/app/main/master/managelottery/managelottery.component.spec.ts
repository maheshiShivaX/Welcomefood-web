import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagelotteryComponent } from './managelottery.component';

describe('ManagelotteryComponent', () => {
  let component: ManagelotteryComponent;
  let fixture: ComponentFixture<ManagelotteryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagelotteryComponent]
    });
    fixture = TestBed.createComponent(ManagelotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
