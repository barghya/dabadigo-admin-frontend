import { TestBed } from '@angular/core/testing';
import { CorporateBillingService } from './corporate-billing.service';


describe('CorporateBillingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorporateBillingService = TestBed.get(CorporateBillingService);
    expect(service).toBeTruthy();
  });
});
