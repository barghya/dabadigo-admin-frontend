import { TestBed } from '@angular/core/testing';

import { IotControllerService } from './iot-controller.service';

describe('IotControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IotControllerService = TestBed.get(IotControllerService);
    expect(service).toBeTruthy();
  });
});
