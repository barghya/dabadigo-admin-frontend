import { TestBed } from '@angular/core/testing';

import { DeployVehicleService } from './deploy-vehicle.service';

describe('DeployVehicleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeployVehicleService = TestBed.get(DeployVehicleService);
    expect(service).toBeTruthy();
  });
});
