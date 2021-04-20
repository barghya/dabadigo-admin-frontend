import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router, ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { SingleCustomerInDetail, customerkycUrl, ApproveRequest } from 'src/app/models/customerKycVerificationModel';
import { take } from 'rxjs/operators';
import { CustomerKycDetailLoadAction, ApproveRequestAction } from 'src/app/store/actions/customer_kyc_varification.action';

@Component({
  selector: 'app-customer-kyc-verification-view-container',
  templateUrl: './customer-kyc-verification-view-container.component.html',
  styleUrls: ['./customer-kyc-verification-view-container.component.scss']
})
export class CustomerKycVerificationViewContainerComponent implements OnInit,OnDestroy{
  private subs = new SubSink();
  docurl$: Observable<customerkycUrl[]>;
  singleCustomer$: Observable<SingleCustomerInDetail>;
  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(params => {
      var customer_id = +params['id'];
      this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
        admn_user_id => {
          this.store.dispatch(new CustomerKycDetailLoadAction({ customer_id: customer_id, admn_user_id: admn_user_id }));

        }
      )
    }));

    this.singleCustomer$ = this.store.select(state => state.customer_kyc_verification.SingleCustomerKyc);
    this.docurl$= this.store.select(state=> state.customer_kyc_verification.CustomerKycUrl);
     }
     Approve(value: ApproveRequest){
      this.store.dispatch(new ApproveRequestAction(value));
      console.log(value);
      
    }

     ngOnDestroy() {
      this.subs.unsubscribe();
    }
}
