import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponBasicDetailsComponent } from './coupon-basic-details.component';

describe('CouponBasicDetailsComponent', () => {
  let component: CouponBasicDetailsComponent;
  let fixture: ComponentFixture<CouponBasicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponBasicDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
