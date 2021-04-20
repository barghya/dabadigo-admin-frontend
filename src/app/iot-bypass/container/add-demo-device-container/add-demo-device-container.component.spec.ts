import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDemoDeviceContainerComponent } from './add-demo-device-container.component';

describe('AddDemoDeviceContainerComponent', () => {
  let component: AddDemoDeviceContainerComponent;
  let fixture: ComponentFixture<AddDemoDeviceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDemoDeviceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDemoDeviceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
