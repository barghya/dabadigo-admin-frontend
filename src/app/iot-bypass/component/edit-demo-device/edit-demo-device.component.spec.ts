import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDemoDeviceComponent } from './edit-demo-device.component';

describe('EditDemoDeviceComponent', () => {
  let component: EditDemoDeviceComponent;
  let fixture: ComponentFixture<EditDemoDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDemoDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDemoDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
