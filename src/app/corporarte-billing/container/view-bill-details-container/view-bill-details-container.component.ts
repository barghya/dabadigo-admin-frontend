import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { ActivatedRoute, Router } from '@angular/router';
import { BillDetailsModel, Adjustments, generateAdjustmentService } from 'src/app/models/corporateBillingModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { BillDetailsLoadAction, AddAdjustmentsAction, BillPaymentStatusChangeAction } from 'src/app/store/actions/corporate_billing.action';
import { MatDialog } from '@angular/material';
import { AddAdjustmentFormContainerComponent } from '../add-adjustment-form-container/add-adjustment-form-container.component';
import { EditAdjustmentContainerComponent } from '../edit-adjustment-container/edit-adjustment-container.component';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-view-bill-details-container',
  templateUrl: './view-bill-details-container.component.html',
  styleUrls: ['./view-bill-details-container.component.scss']
})
export class ViewBillDetailsContainerComponent implements OnInit {

  subs = new SubSink();
  // billDetails: BillDetailsModel;
  billDetails$: Observable<BillDetailsModel>;
  adjustments: Adjustments[];
  final_amount: number;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.subs.add(this.route.params.subscribe(
      params => {
        var corporate_billing_id = +params['id'];
        if(!!corporate_billing_id) {
          console.log("from view-bill-det:", corporate_billing_id);
          this.store.dispatch(new BillDetailsLoadAction(corporate_billing_id))
        }
      }));
      this.billDetails$ = this.store.select(state => state.corporate_billing.billDetailsModel);
  }

  saveAdjustments(value: generateAdjustmentService) {
    // TODO: Create Payload
    this.store.select(state => state.corporate_billing.billDetailsModel).pipe(take(1)).subscribe(
      data => {
        if(!!data && !!value) {
          this.store.dispatch(new AddAdjustmentsAction({
            corporate_billing_id: data.corporate_bill.corporate_billing_id,
            adjustments: value.adjustments,
            final_adjusted_amount: value.final_adjusted_amount
          }));
        }
      }
    )
  }

  billPaymentStatus(corporate_billing_id: number) {
    this.store.dispatch(new BillPaymentStatusChangeAction(corporate_billing_id));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}