import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureDeviceContainerComponent } from './configure-device-container.component';

describe('ConfigureDeviceContainerComponent', () => {
  let component: ConfigureDeviceContainerComponent;
  let fixture: ComponentFixture<ConfigureDeviceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureDeviceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureDeviceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
