import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Leavestep1Component } from './leavestep1.component';

describe('Leavestep1Component', () => {
  let component: Leavestep1Component;
  let fixture: ComponentFixture<Leavestep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Leavestep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Leavestep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
