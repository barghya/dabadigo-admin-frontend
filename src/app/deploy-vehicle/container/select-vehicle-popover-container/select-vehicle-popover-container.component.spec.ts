import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVehiclePopoverContainerComponent } from './select-vehicle-popover-container.component';

describe('SelectVehiclePopoverContainerComponent', () => {
  let component: SelectVehiclePopoverContainerComponent;
  let fixture: ComponentFixture<SelectVehiclePopoverContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectVehiclePopoverContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVehiclePopoverContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
