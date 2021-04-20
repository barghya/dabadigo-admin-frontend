import { TestBed } from '@angular/core/testing';

import { ParameterManagementService } from './parameter-management.service';

describe('ParameterManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParameterManagementService = TestBed.get(ParameterManagementService);
    expect(service).toBeTruthy();
  });
});
