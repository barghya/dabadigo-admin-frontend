import { TestBed } from '@angular/core/testing';

import { CorporateRequestManagementService } from './corporate-request-management.service';

describe('CorporateRequestManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorporateRequestManagementService = TestBed.get(CorporateRequestManagementService);
    expect(service).toBeTruthy();
  });
});
