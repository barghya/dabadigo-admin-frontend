import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { BillSetupsListLoadAction } from 'src/app/store/actions/franchisee_billing.action';
import { Observable } from 'rxjs';
import { FranchiseeSetUps } from 'src/app/models/franchiseeBillingModel';

@Component({
  selector: 'app-setups-main-container',
  templateUrl: './setups-main-container.component.html',
  styleUrls: ['./setups-main-container.component.scss']
})
export class SetupsMainContainerComponent implements OnInit {

  franchisee$: Observable<FranchiseeSetUps[]>;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new BillSetupsListLoadAction());
    this.franchisee$ = this.store.select(state => state.franchisee_billing.franchiseeSetUps);
  }

  addBillSetup() {
    this.router.navigate(['franchisee-billing', 'add-setup']);
  }

  getAllPayments() {
    this.router.navigate(['franchisee-billing', 'view-payments'])
  }

  viewBills(admn_partner_id:number) {
    this.router.navigate(['franchisee-billing', 'view-payments'], { queryParams: { id: admn_partner_id }});
  }

}