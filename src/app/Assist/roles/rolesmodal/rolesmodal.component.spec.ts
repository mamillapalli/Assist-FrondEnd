import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesmodalComponent } from './rolesmodal.component';

describe('RolesmodalComponent', () => {
  let component: RolesmodalComponent;
  let fixture: ComponentFixture<RolesmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
