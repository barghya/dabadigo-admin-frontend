import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCouponContainerComponent } from './add-coupon-container.component';

describe('AddCouponContainerComponent', () => {
  let component: AddCouponContainerComponent;
  let fixture: ComponentFixture<AddCouponContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCouponContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCouponContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
