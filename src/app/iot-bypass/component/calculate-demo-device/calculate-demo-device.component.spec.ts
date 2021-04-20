import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateDemoDeviceComponent } from './calculate-demo-device.component';

describe('CalculateDemoDeviceComponent', () => {
  let component: CalculateDemoDeviceComponent;
  let fixture: ComponentFixture<CalculateDemoDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateDemoDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateDemoDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
