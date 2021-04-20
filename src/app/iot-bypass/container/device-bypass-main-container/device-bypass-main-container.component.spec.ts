import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceBypassMainContainerComponent } from './device-bypass-main-container.component';

describe('DeviceBypassMainContainerComponent', () => {
  let component: DeviceBypassMainContainerComponent;
  let fixture: ComponentFixture<DeviceBypassMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceBypassMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceBypassMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
