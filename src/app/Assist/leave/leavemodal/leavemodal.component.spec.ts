import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavemodalComponent } from './leavemodal.component';

describe('LeavemodalComponent', () => {
  let component: LeavemodalComponent;
  let fixture: ComponentFixture<LeavemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavemodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
