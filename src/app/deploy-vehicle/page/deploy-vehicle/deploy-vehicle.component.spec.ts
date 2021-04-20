import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployVehicleComponent } from './deploy-vehicle.component';

describe('DeployVehicleComponent', () => {
  let component: DeployVehicleComponent;
  let fixture: ComponentFixture<DeployVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
