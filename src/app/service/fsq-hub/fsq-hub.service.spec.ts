import { TestBed } from '@angular/core/testing';

import { FsqHubService } from './fsq-hub.service';

describe('FsqHubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FsqHubService = TestBed.get(FsqHubService);
    expect(service).toBeTruthy();
  });
});
