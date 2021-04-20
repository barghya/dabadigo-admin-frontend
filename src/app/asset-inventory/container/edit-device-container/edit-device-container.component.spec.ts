import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeviceContainerComponent } from './edit-device-container.component';

describe('EditDeviceContainerComponent', () => {
  let component: EditDeviceContainerComponent;
  let fixture: ComponentFixture<EditDeviceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeviceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeviceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
