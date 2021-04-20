import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { customerDetails } from 'src/app/models/customerManagementModel';
import { Observable } from 'rxjs';
import { singleCoupon, couponManagement } from 'src/app/models/couponManagementModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { AssignCouponLoadAction, AssignCouponAction } from 'src/app/store/actions/coupon_management.action';
import { ActivatedRoute, Router } from '@angular/router';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-assign-coupon-container',
  templateUrl: './assign-coupon-container.component.html',
  styleUrls: ['./assign-coupon-container.component.scss']
})
export class AssignCouponContainerComponent implements OnInit {
  subs = new SubSink();
  singleCoupon$: Observable<singleCoupon>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var coupon_id = +params['id'];
      this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
        admn_user_id => {
          this.store.dispatch(new AssignCouponLoadAction({
            coupon_id: coupon_id
          }))
        }
      )
    }));

    this.singleCoupon$ = this.store.select(state => state.coupon_management.SingleCoupon);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  Assign(data: couponManagement) {
    this.store.dispatch(new AssignCouponAction(data));
  }

  Cancel() {
    this.router.navigate(['coupon-management', 'coupon-list']);
  }
}
