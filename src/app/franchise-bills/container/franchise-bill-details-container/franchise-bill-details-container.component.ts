import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewFranchiseePaymentDetails } from 'src/app/models/franchiseeBillingModel';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { ViewFranchiseePaymentsDetailAction } from 'src/app/store/actions/franchisee_billing.action';

@Component({
  selector: 'app-franchise-bill-details-container',
  templateUrl: './franchise-bill-details-container.component.html',
  styleUrls: ['./franchise-bill-details-container.component.scss']
})
export class FranchiseBillDetailsContainerComponent implements OnInit {

  paymentDetails$: Observable<ViewFranchiseePaymentDetails>;

  private subs = new SubSink();

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(
      params => {
        var franchise_payment_id = +params['id'];
        console.log(franchise_payment_id);
        this.store.dispatch(new ViewFranchiseePaymentsDetailAction({franchise_payment_id: franchise_payment_id}));
      }
    ))
    this.paymentDetails$ = this.store.select( state => state.franchisee_billing.viewFranchiseePaymentDetails );
  }

}
