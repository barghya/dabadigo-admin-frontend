import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployVehicleMainComponent } from './deploy-vehicle-main.component';

describe('DeployVehicleMainComponent', () => {
  let component: DeployVehicleMainComponent;
  let fixture: ComponentFixture<DeployVehicleMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployVehicleMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployVehicleMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
