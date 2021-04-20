import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCouponComponent } from './assign-coupon.component';

describe('AssignCouponComponent', () => {
  let component: AssignCouponComponent;
  let fixture: ComponentFixture<AssignCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
