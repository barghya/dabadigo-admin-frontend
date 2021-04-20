import { TestBed } from '@angular/core/testing';

import { PricingManagementService } from './pricing-management.service';

describe('PricingManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PricingManagementService = TestBed.get(PricingManagementService);
    expect(service).toBeTruthy();
  });
});
