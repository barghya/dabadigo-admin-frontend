import { TestBed } from '@angular/core/testing';

import { FranchiseVehicleService } from './franchise-vehicle.service';

describe('FranchiseVehicleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FranchiseVehicleService = TestBed.get(FranchiseVehicleService);
    expect(service).toBeTruthy();
  });
});
