import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { BillDetailsModel } from 'src/app/models/corporateBillingModel';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { BillDetailsLoadAction } from 'src/app/store/actions/corporate_billing.action';

@Component({
  selector: 'app-corporate-bills-detail-container',
  templateUrl: './corporate-bills-detail-container.component.html',
  styleUrls: ['./corporate-bills-detail-container.component.scss']
})
export class CorporateBillsDetailContainerComponent implements OnInit {

  subs = new SubSink();
  // billDetails: BillDetailsModel;
  billDetails$: Observable<BillDetailsModel>;
  
  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

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

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
