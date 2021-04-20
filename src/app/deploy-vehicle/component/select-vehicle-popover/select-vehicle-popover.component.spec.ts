import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVehiclePopoverComponent } from './select-vehicle-popover.component';

describe('SelectVehiclePopoverComponent', () => {
  let component: SelectVehiclePopoverComponent;
  let fixture: ComponentFixture<SelectVehiclePopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectVehiclePopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVehiclePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
