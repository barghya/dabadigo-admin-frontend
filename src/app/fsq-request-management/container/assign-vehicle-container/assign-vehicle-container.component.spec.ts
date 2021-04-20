import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignVehicleContainerComponent } from './assign-vehicle-container.component';

describe('AssignVehicleContainerComponent', () => {
  let component: AssignVehicleContainerComponent;
  let fixture: ComponentFixture<AssignVehicleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignVehicleContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignVehicleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
