import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponManagementMainContainerComponent } from './coupon-management-main-container.component';

describe('CouponManagementMainContainerComponent', () => {
  let component: CouponManagementMainContainerComponent;
  let fixture: ComponentFixture<CouponManagementMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponManagementMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponManagementMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
