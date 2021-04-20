import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDevicecontainerComponent } from './add-devicecontainer.component';

describe('AddDevicecontainerComponent', () => {
  let component: AddDevicecontainerComponent;
  let fixture: ComponentFixture<AddDevicecontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDevicecontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDevicecontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
