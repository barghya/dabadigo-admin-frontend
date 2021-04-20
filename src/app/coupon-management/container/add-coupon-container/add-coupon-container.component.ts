import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { AddCouponLoadAction, AddCouponAction, AddAnotherCouponAction } from 'src/app/store/actions/coupon_management.action';
import { couponManagement } from 'src/app/models/couponManagementModel';
import { countries } from 'src/app/models/asset-inventoryModel';
import { states, CityItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-add-coupon-container',
  templateUrl: './add-coupon-container.component.html',
  styleUrls: ['./add-coupon-container.component.scss']
})
export class AddCouponContainerComponent implements OnInit {

  data: couponManagement;
  discountType$: Observable<DomainData[]>;
  couponType$: Observable<DomainData[]>;
  usageRestriction$: Observable<DomainData[]>;
  countries$?: Observable<countries[]>;
  states$?: Observable<states[]>;
  cities$?: Observable<CityItem[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new AddCouponLoadAction())
    this.discountType$ = this.store.select(state => state.coupon_management.CouponDiscountType);
    this.couponType$ = this.store.select(state => state.coupon_management.CouponType);
    this.usageRestriction$ = this.store.select(state => state.coupon_management.CouponUsageRestriction);
    this.countries$ = this.store.select(state => state.coupon_management.countries);
    this.states$ = this.store.select(state => state.coupon_management.states);
    this.cities$ = this.store.select(state => state.coupon_management.cities);
  }

  AddCoupon(data: couponManagement) {
    this.data = data;
    console.log(this.data);
    this.store.dispatch(new AddCouponAction(data));
  }

  AddAnotherCoupon(data: couponManagement) {
    this.store.dispatch(new AddAnotherCouponAction(data));
  }

  Cancelcoupon() {
    this.router.navigate(['coupon-management', 'coupon-list']);
  }

}
