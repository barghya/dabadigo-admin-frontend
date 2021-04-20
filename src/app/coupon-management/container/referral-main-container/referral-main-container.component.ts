import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { ReferralListLoadAction } from 'src/app/store/actions/coupon_management.action';
import { Observable } from 'rxjs';
import { Referrals } from 'src/app/models/couponManagementModel';

@Component({
  selector: 'app-referral-main-container',
  templateUrl: './referral-main-container.component.html',
  styleUrls: ['./referral-main-container.component.scss']
})
export class ReferralMainContainerComponent implements OnInit {

  referrals$: Observable<Referrals[]>;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new ReferralListLoadAction());
    this.referrals$ = this.store.select(state => state.coupon_management.referrals)
    this.referrals$.subscribe(
      data=> {
        console.log(data);
      }
    )
  }

}
