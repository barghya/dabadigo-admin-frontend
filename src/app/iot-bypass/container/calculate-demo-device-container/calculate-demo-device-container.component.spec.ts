import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateDemoDeviceContainerComponent } from './calculate-demo-device-container.component';

describe('CalculateDemoDeviceContainerComponent', () => {
  let component: CalculateDemoDeviceContainerComponent;
  let fixture: ComponentFixture<CalculateDemoDeviceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateDemoDeviceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateDemoDeviceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
