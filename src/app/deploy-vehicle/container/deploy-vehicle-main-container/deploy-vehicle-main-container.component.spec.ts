import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployVehicleMainContainerComponent } from './deploy-vehicle-main-container.component';

describe('DeployVehicleMainContainerComponent', () => {
  let component: DeployVehicleMainContainerComponent;
  let fixture: ComponentFixture<DeployVehicleMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployVehicleMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployVehicleMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
