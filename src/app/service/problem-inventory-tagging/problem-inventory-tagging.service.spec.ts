import { TestBed } from '@angular/core/testing';

import { ProblemInventoryTaggingService } from './problem-inventory-tagging.service';

describe('ProblemInventoryTaggingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProblemInventoryTaggingService = TestBed.get(ProblemInventoryTaggingService);
    expect(service).toBeTruthy();
  });
});
