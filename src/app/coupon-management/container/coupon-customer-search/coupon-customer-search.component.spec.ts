import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCustomerSearchComponent } from './coupon-customer-search.component';

describe('CouponCustomerSearchComponent', () => {
  let component: CouponCustomerSearchComponent;
  let fixture: ComponentFixture<CouponCustomerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponCustomerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCustomerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
