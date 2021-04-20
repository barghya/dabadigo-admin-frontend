import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDemoDeviceComponent } from './add-demo-device.component';

describe('AddDemoDeviceComponent', () => {
  let component: AddDemoDeviceComponent;
  let fixture: ComponentFixture<AddDemoDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDemoDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDemoDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
