import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconsiletypeComponent } from './reconsiletype.component';

describe('ReconsiletypeComponent', () => {
  let component: ReconsiletypeComponent;
  let fixture: ComponentFixture<ReconsiletypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReconsiletypeComponent]
    });
    fixture = TestBed.createComponent(ReconsiletypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
