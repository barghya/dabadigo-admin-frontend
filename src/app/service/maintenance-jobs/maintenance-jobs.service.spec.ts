import { TestBed } from '@angular/core/testing';

import { MaintenanceJobsService } from './maintenance-jobs.service';

describe('MaintenanceJobsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaintenanceJobsService = TestBed.get(MaintenanceJobsService);
    expect(service).toBeTruthy();
  });
});
