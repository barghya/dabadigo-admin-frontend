import { TestBed } from '@angular/core/testing';

import { FsqManagementService } from './fsq-management.service';

describe('FsqManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FsqManagementService = TestBed.get(FsqManagementService);
    expect(service).toBeTruthy();
  });
});
