import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDeviceBatteryViewComponent } from './transfer-device-battery-view.component';

describe('TransferDeviceBatteryViewComponent', () => {
  let component: TransferDeviceBatteryViewComponent;
  let fixture: ComponentFixture<TransferDeviceBatteryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDeviceBatteryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDeviceBatteryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
