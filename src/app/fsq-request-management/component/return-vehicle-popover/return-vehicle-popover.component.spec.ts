import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnVehiclePopoverComponent } from './return-vehicle-popover.component';

describe('ReturnVehiclePopoverComponent', () => {
  let component: ReturnVehiclePopoverComponent;
  let fixture: ComponentFixture<ReturnVehiclePopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnVehiclePopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnVehiclePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
