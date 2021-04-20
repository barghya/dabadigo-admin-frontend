import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { couponManagement, singleCoupon } from 'src/app/models/couponManagementModel';
import { AppState } from 'src/app/models/appStateModel';
import { Store } from '@ngrx/store';
import { DeleteCouponAction, CouponListLoadAction } from 'src/app/store/actions/coupon_management.action';

@Component({
  selector: 'app-coupon-management-main-container',
  templateUrl: './coupon-management-main-container.component.html',
  styleUrls: ['./coupon-management-main-container.component.scss']
})
export class CouponManagementMainContainerComponent implements OnInit {

  couponManagement$: Observable<couponManagement[]>;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new CouponListLoadAction());
    this.couponManagement$ = this.store.select(state => state.coupon_management.CouponManagement);
    console.log(this.couponManagement$);
  }

  OpenAdd() {
    this.router.navigate(['coupon-management', 'add-coupon']);
  }

  editCoupon(coupon_id: number) {
    this.router.navigate(['coupon-management', 'edit-coupon', coupon_id]);
    console.log(coupon_id);
  }

  assignCoupon(coupon_id: number) {
    this.router.navigate(['coupon-management', 'assign-coupon', coupon_id]);
    console.log(coupon_id);
  }

  UsageHistory(coupon_id: number) {
    this.router.navigate(['coupon-management', 'usage-history', coupon_id]);
  }

  deleteCoupon(data: singleCoupon) {
    this.store.dispatch(new DeleteCouponAction(data));
  }

}
