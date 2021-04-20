import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotBookingPopoverComponent } from './slot-booking-popover.component';

describe('SlotBookingPopoverComponent', () => {
  let component: SlotBookingPopoverComponent;
  let fixture: ComponentFixture<SlotBookingPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotBookingPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotBookingPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
