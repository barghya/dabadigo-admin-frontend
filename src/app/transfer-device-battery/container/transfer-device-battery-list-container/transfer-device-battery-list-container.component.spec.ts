import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDeviceBatteryListContainerComponent } from './transfer-device-battery-list-container.component';

describe('TransferDeviceBatteryListContainerComponent', () => {
  let component: TransferDeviceBatteryListContainerComponent;
  let fixture: ComponentFixture<TransferDeviceBatteryListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDeviceBatteryListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDeviceBatteryListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
