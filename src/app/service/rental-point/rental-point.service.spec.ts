import { TestBed } from '@angular/core/testing';

import { RentalPointService } from './rental-point.service';

describe('RentalPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RentalPointService = TestBed.get(RentalPointService);
    expect(service).toBeTruthy();
  });
});
