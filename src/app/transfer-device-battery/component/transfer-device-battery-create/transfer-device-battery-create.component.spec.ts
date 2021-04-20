import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDeviceBatteryCreateComponent } from './transfer-device-battery-create.component';

describe('TransferDeviceBatteryCreateComponent', () => {
  let component: TransferDeviceBatteryCreateComponent;
  let fixture: ComponentFixture<TransferDeviceBatteryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDeviceBatteryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDeviceBatteryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
