import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalResourceToComponentComponent } from './external-resource-to-component.component';

describe('ExternalResourceToComponentComponent', () => {
  let component: ExternalResourceToComponentComponent;
  let fixture: ComponentFixture<ExternalResourceToComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalResourceToComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalResourceToComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
