import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { BillSetupsListLoadAction, CorporateBillsListLoadSuccessAction } from 'src/app/store/actions/corporate_billing.action';
import { Observable } from 'rxjs';
import { BillsSetupModel } from 'src/app/models/corporateBillingModel';

@Component({
  selector: 'app-bill-setups-main-container',
  templateUrl: './bill-setups-main-container.component.html',
  styleUrls: ['./bill-setups-main-container.component.scss']
})
export class BillSetupsMainContainerComponent implements OnInit {

  setupBills$: Observable<BillsSetupModel[]>;
  corporate_id: number;

  constructor(public router: Router, public store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new BillSetupsListLoadAction());
    this.setupBills$ = this.store.select(state => state.corporate_billing.billsSetupModel);
    
  }

  addBill() {
    this.router.navigate(['corporate-billing', 'setup-new-bill']);
  }

  viewBills(corporate_id: number) {
    this.router.navigate(['corporate-billing', 'corporate-bills'], { queryParams: { id: corporate_id } });
  }

  viewAllBills() {
    this.router.navigate(['corporate-billing', 'corporate-bills']);
  }

}