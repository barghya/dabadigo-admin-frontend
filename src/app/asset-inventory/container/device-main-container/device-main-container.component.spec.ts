import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMainContainerComponent } from './device-main-container.component';

describe('DeviceMainContainerComponent', () => {
  let component: DeviceMainContainerComponent;
  let fixture: ComponentFixture<DeviceMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
