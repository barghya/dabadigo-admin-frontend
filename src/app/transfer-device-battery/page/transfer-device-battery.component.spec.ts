import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDeviceBatteryComponent } from './transfer-device-battery.component';

describe('TransferDeviceBatteryComponent', () => {
  let component: TransferDeviceBatteryComponent;
  let fixture: ComponentFixture<TransferDeviceBatteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDeviceBatteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDeviceBatteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
