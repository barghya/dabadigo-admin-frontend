import { TestBed } from '@angular/core/testing';

import { FranchiseeBillingService } from './franchisee-billing.service';

describe('FranchiseeBillingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FranchiseeBillingService = TestBed.get(FranchiseeBillingService);
    expect(service).toBeTruthy();
  });
});
