import { TestBed } from '@angular/core/testing';

import { StateTaxService } from './state-tax.service';

describe('StateTaxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateTaxService = TestBed.get(StateTaxService);
    expect(service).toBeTruthy();
  });
});
