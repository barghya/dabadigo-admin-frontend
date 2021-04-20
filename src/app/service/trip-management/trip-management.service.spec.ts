import { TestBed } from '@angular/core/testing';

import { TripManagementService } from './trip-management.service';

describe('TripManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripManagementService = TestBed.get(TripManagementService);
    expect(service).toBeTruthy();
  });
});
