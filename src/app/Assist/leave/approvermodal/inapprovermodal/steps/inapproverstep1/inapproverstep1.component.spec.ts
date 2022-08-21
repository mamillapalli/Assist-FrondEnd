import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inapproverstep1Component } from './inapproverstep1.component';

describe('Inapproverstep1Component', () => {
  let component: Inapproverstep1Component;
  let fixture: ComponentFixture<Inapproverstep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Inapproverstep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inapproverstep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
