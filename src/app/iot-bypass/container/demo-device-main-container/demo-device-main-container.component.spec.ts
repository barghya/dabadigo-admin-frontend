import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoDeviceMainContainerComponent } from './demo-device-main-container.component';

describe('DemoDeviceMainContainerComponent', () => {
  let component: DemoDeviceMainContainerComponent;
  let fixture: ComponentFixture<DemoDeviceMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoDeviceMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoDeviceMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
