import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceBypassMainComponent } from './device-bypass-main.component';

describe('DeviceBypassMainComponent', () => {
  let component: DeviceBypassMainComponent;
  let fixture: ComponentFixture<DeviceBypassMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceBypassMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceBypassMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
