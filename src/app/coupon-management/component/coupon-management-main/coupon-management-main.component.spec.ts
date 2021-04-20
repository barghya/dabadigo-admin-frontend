import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponManagementMainComponent } from './coupon-management-main.component';

describe('CouponManagementMainComponent', () => {
  let component: CouponManagementMainComponent;
  let fixture: ComponentFixture<CouponManagementMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponManagementMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
