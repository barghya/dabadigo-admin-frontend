import { TestBed } from '@angular/core/testing';

import { TransferPartsService } from './transfer-parts.service';

describe('TransferPartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransferPartsService = TestBed.get(TransferPartsService);
    expect(service).toBeTruthy();
  });
});
