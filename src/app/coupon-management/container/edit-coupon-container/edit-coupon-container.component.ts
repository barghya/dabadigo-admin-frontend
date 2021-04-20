import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { EditCouponLoadAction, EditCouponAction } from 'src/app/store/actions/coupon_management.action';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { singleCoupon, couponManagement } from 'src/app/models/couponManagementModel';
import { countries } from 'src/app/models/asset-inventoryModel';
import { states, CityItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-edit-coupon-container',
  templateUrl: './edit-coupon-container.component.html',
  styleUrls: ['./edit-coupon-container.component.scss']
})
export class EditCouponContainerComponent implements OnInit, OnDestroy {
  
  subs = new SubSink();

  discountType$: Observable<DomainData[]>;
  couponType$: Observable<DomainData[]>;
  usageRestriction$: Observable<DomainData[]>;
  singleCoupon$: Observable<couponManagement>;
  countries$?: Observable<countries[]>;
  states$?: Observable<states[]>;
  cities$?: Observable<CityItem[]>;

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
        var coupon_id = +params['id'];
        this.store.dispatch(new EditCouponLoadAction({
          coupon_id: coupon_id
        }))
    }));
    this.discountType$ = this.store.select(state => state.coupon_management.CouponDiscountType);
    this.couponType$ = this.store.select(state => state.coupon_management.CouponType);
    this.usageRestriction$ = this.store.select(state => state.coupon_management.CouponUsageRestriction);
    this.singleCoupon$ = this.store.select(state => state.coupon_management.SingleCoupon);
    this.countries$ = this.store.select(state => state.coupon_management.countries);
    this.states$ = this.store.select(state => state.coupon_management.states);
    this.cities$ = this.store.select(state => state.coupon_management.cities);
  }

  editCoupon(data: couponManagement) {
    this.store.dispatch(new EditCouponAction(data));
  }

  cancelCoupon() {
    this.router.navigate(['coupon-management', 'coupon-list']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
