import { TestBed } from '@angular/core/testing';

import { CorporateManagementService } from './corporate-management.service';

describe('CorporateManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorporateManagementService = TestBed.get(CorporateManagementService);
    expect(service).toBeTruthy();
  });
});
