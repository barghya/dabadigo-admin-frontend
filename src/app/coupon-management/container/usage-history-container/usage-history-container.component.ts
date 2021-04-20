import { Component, OnInit } from '@angular/core';
import { UsageDetails } from 'src/app/models/couponManagementModel';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { SubSink } from 'subsink';
import { take } from 'rxjs/operators';
import { UsageHistoryLoadAction } from 'src/app/store/actions/coupon_management.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usage-history-container',
  templateUrl: './usage-history-container.component.html',
  styleUrls: ['./usage-history-container.component.scss']
})
export class UsageHistoryContainerComponent implements OnInit {
  usageDetail$: Observable<UsageDetails>;
  private subs = new SubSink();
  
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.subs.add(this.route.params.subscribe(params => {
      var coupon_id = +params['id'];
      this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
        admn_user_id => {
          this.store.dispatch(new UsageHistoryLoadAction({
            coupon_id: coupon_id
          }))
        }
      )
    }));
    this.usageDetail$ = this.store.select(state => state.coupon_management.usageDetail);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
