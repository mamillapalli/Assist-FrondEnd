import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resourcestep1Component } from './resourcestep1.component';

describe('Resourcestep1Component', () => {
  let component: Resourcestep1Component;
  let fixture: ComponentFixture<Resourcestep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Resourcestep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Resourcestep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
