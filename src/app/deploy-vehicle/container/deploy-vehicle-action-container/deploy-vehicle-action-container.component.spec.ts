import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployVehicleActionContainerComponent } from './deploy-vehicle-action-container.component';

describe('DeployVehicleActionContainerComponent', () => {
  let component: DeployVehicleActionContainerComponent;
  let fixture: ComponentFixture<DeployVehicleActionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployVehicleActionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployVehicleActionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
