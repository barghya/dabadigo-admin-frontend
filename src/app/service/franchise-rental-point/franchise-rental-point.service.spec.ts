import { TestBed } from '@angular/core/testing';

import { FranchiseRentalPointService } from './franchise-rental-point.service';

describe('FranchiseRentalPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FranchiseRentalPointService = TestBed.get(FranchiseRentalPointService);
    expect(service).toBeTruthy();
  });
});
