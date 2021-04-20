import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDeviceBatteryCreateContainerComponent } from './transfer-device-battery-create-container.component';

describe('TransferDeviceBatteryCreateContainerComponent', () => {
  let component: TransferDeviceBatteryCreateContainerComponent;
  let fixture: ComponentFixture<TransferDeviceBatteryCreateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDeviceBatteryCreateContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDeviceBatteryCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
