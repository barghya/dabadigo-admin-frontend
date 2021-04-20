import { TestBed } from '@angular/core/testing';

import { CustomerKycVarificationService } from './customer-kyc-varification.service';

describe('CustomerKycVarificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerKycVarificationService = TestBed.get(CustomerKycVarificationService);
    expect(service).toBeTruthy();
  });
});
