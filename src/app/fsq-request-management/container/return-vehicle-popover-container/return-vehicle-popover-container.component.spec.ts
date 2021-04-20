import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnVehiclePopoverContainerComponent } from './return-vehicle-popover-container.component';

describe('ReturnVehiclePopoverContainerComponent', () => {
  let component: ReturnVehiclePopoverContainerComponent;
  let fixture: ComponentFixture<ReturnVehiclePopoverContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnVehiclePopoverContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnVehiclePopoverContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
