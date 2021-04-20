import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoDeviceMainComponent } from './demo-device-main.component';

describe('DemoDeviceMainComponent', () => {
  let component: DemoDeviceMainComponent;
  let fixture: ComponentFixture<DemoDeviceMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoDeviceMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoDeviceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
