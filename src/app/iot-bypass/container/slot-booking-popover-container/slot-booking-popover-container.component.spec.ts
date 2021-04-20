import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotBookingPopoverContainerComponent } from './slot-booking-popover-container.component';

describe('SlotBookingPopoverContainerComponent', () => {
  let component: SlotBookingPopoverContainerComponent;
  let fixture: ComponentFixture<SlotBookingPopoverContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotBookingPopoverContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotBookingPopoverContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
