import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDemoDeviceContainerComponent } from './edit-demo-device-container.component';

describe('EditDemoDeviceContainerComponent', () => {
  let component: EditDemoDeviceContainerComponent;
  let fixture: ComponentFixture<EditDemoDeviceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDemoDeviceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDemoDeviceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
