import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcemodelComponent } from './resourcemodel.component';

describe('ResourcemodelComponent', () => {
  let component: ResourcemodelComponent;
  let fixture: ComponentFixture<ResourcemodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcemodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourcemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
