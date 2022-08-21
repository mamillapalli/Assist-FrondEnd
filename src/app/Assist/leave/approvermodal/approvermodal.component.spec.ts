import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovermodalComponent } from './approvermodal.component';

describe('ApprovermodalComponent', () => {
  let component: ApprovermodalComponent;
  let fixture: ComponentFixture<ApprovermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovermodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
