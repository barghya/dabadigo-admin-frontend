import { TestBed } from '@angular/core/testing';

import { TransferDeviceBatteryService } from './transfer-device-battery.service';

describe('TransferDeviceBatteryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransferDeviceBatteryService = TestBed.get(TransferDeviceBatteryService);
    expect(service).toBeTruthy();
  });
});
