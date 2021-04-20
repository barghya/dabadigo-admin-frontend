import { TestBed } from '@angular/core/testing';

import { MapmyindiaService } from './mapmyindia.service';

describe('MapmyindiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapmyindiaService = TestBed.get(MapmyindiaService);
    expect(service).toBeTruthy();
  });
});
