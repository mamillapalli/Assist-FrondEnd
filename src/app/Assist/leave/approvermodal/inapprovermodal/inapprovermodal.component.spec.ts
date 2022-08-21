import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InapprovermodalComponent } from './inapprovermodal.component';

describe('InapprovermodalComponent', () => {
  let component: InapprovermodalComponent;
  let fixture: ComponentFixture<InapprovermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InapprovermodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InapprovermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
