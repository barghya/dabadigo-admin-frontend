import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { customerKycDetails, ActiveInactiveRequest } from 'src/app/models/customerKycVerificationModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { customerKycDetails, ActiveInactiveRequest } from 'src/app/models/customerKycVerificationModel';
import { ActiveKycAction, InactiveKycAction, CustomerKycListLoadAction } from 'src/app/store/actions/customer_kyc_varification.action';
// import { CustomerManagementListLoadAction, ActiveAction, InactiveAction } from 'src/app/store/actions/customer_management.action';


@Component({
  selector: 'app-customer-kyc-verification-main-container',
  templateUrl: './customer-kyc-verification-main-container.component.html',
  styleUrls: ['./customer-kyc-verification-main-container.component.scss']
})
export class CustomerKycVerificationMainContainerComponent implements OnInit {
  customerDetails$: Observable<customerKycDetails[]>
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.select(state => state.user.userdetail.admn_user_id).pipe(take(1)).subscribe(
      admn_user_id => {
        this.store.dispatch(new CustomerKycListLoadAction(admn_user_id));
      }
    );
    this.customerDetails$ = this.store.select(state => state.customer_kyc_verification.CustomerKycDetails);
   
  }

  ViewDetail(customer_id: number) {
    this.router.navigate(["customer-kyc-verification", "customer-kyc-detail", customer_id]);
  }


}
