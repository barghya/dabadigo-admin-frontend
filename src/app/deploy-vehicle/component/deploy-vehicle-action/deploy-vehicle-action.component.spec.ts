import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployVehicleActionComponent } from './deploy-vehicle-action.component';

describe('DeployVehicleActionComponent', () => {
  let component: DeployVehicleActionComponent;
  let fixture: ComponentFixture<DeployVehicleActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployVehicleActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployVehicleActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
