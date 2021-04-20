import { TestBed } from '@angular/core/testing';

import { FranchisePricingService } from './franchise-pricing.service';

describe('FranchisePricingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FranchisePricingService = TestBed.get(FranchisePricingService);
    expect(service).toBeTruthy();
  });
});
