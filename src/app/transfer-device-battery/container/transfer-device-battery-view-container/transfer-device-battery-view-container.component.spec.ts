import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDeviceBatteryViewContainerComponent } from './transfer-device-battery-view-container.component';

describe('TransferDeviceBatteryViewContainerComponent', () => {
  let component: TransferDeviceBatteryViewContainerComponent;
  let fixture: ComponentFixture<TransferDeviceBatteryViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDeviceBatteryViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDeviceBatteryViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
