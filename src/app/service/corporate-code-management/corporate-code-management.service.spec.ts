import { TestBed } from '@angular/core/testing';

import { CorporateCodeManagementService } from './corporate-code-management.service';

describe('CorporateCodeManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorporateCodeManagementService = TestBed.get(CorporateCodeManagementService);
    expect(service).toBeTruthy();
  });
});
