import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCouponContainerComponent } from './assign-coupon-container.component';

describe('AssignCouponContainerComponent', () => {
  let component: AssignCouponContainerComponent;
  let fixture: ComponentFixture<AssignCouponContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignCouponContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCouponContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
