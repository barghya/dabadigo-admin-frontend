import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { ViewFranchiseePaymentsDetailAction, AddPenaltyAction, FranchiseePaymentAcknowledgeAction } from 'src/app/store/actions/franchisee_billing.action';
import { Observable } from 'rxjs';
import { ViewFranchiseePaymentDetails, generatePenaltyService } from 'src/app/models/franchiseeBillingModel';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-view-payment-details-container',
  templateUrl: './view-payment-details-container.component.html',
  styleUrls: ['./view-payment-details-container.component.scss']
})
export class ViewPaymentDetailsContainerComponent implements OnInit {

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

  save(value: generatePenaltyService) {
    this.store.select(state => state.franchisee_billing.viewFranchiseePaymentDetails).pipe(take(1)).subscribe(
      data => {
        if(!!data && !!value ) {
          this.store.dispatch(new AddPenaltyAction({
            penalty: value.penalty,
            final_amount_payable: value.final_amount_payable,
            franchise_payment_id: data.franchise_payment_id
          }));
        }
      }
    )
  }

  paymentStatus(franchise_payment_id: number) {
    console.log(franchise_payment_id);
    this.store.dispatch(new FranchiseePaymentAcknowledgeAction(franchise_payment_id));
  }

}