import { TestBed } from '@angular/core/testing';

import { AssetInventoryService } from './asset-inventory.service';

describe('AssetInventoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetInventoryService = TestBed.get(AssetInventoryService);
    expect(service).toBeTruthy();
  });
});
