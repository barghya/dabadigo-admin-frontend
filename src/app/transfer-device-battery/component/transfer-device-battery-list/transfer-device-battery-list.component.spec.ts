import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDeviceBatteryListComponent } from './transfer-device-battery-list.component';

describe('TransferDeviceBatteryListComponent', () => {
  let component: TransferDeviceBatteryListComponent;
  let fixture: ComponentFixture<TransferDeviceBatteryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDeviceBatteryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDeviceBatteryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
