import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rolesstep1Component } from './rolesstep1.component';

describe('Rolesstep1Component', () => {
  let component: Rolesstep1Component;
  let fixture: ComponentFixture<Rolesstep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rolesstep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rolesstep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
